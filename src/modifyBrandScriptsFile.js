import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

/**
 * @description Modify Google Tag Manager init file
 * @param {import('inquirer').Answers} options
 */
export async function modifyGAinitFile(options) {
  const { brandName, referenceBrand } = options;
  const initFilePath = path.join(
    `${process.cwd()}/apps`,
    brandName,
    "public",
    "scripts",
    "init.js"
  );
  const initFileSpinner = ora(
    `Modifying Google Tag Manager init file for ${brandName}...`
  ).start();

  try {
    if (fs.existsSync(initFilePath)) {
      const initFile = fs.readFileSync(initFilePath, "utf8");
      const newInitFile = initFile.replace(referenceBrand, brandName);
      fs.writeFileSync(initFilePath, newInitFile);
      initFileSpinner.succeed(
        chalk.green(`Scripts init.js file for ${chalk.blue(brandName)}`)
      );
    } else {
      initFileSpinner.warn(
        chalk.yellow(
          `Scripts init.js file for ${chalk.blue(
            brandName
          )} not found. Skipping.`
        )
      );
    }
  } catch (error) {
    initFileSpinner.fail(
      chalk.red(
        `Error modifying Scripts init.js file for ${chalk.blue(brandName)}: ${
          error.message
        }`
      )
    );
    ga4FileSpinner.stop();
  }
}

/**
 * @description Modify GA4 file with new GA4 ID if GA4 ID is provided
 * @param {import('inquirer').Answers} options
 */
export async function modifyGa4file(options) {
  const { ga4Id, brandName } = options;
  const ga4FilePath = path.join(
    `${process.cwd()}/apps`,
    brandName,
    "public",
    "scripts",
    "ga4.js"
  );
  const ga4FileSpinner = ora(`Modifying GA4 file for ${brandName}...`).start();
  try {
    if (fs.existsSync(ga4FilePath) && ga4Id) {
      const ga4File = fs.readFileSync(ga4FilePath, "utf8");
      const newGa4File = ga4File.replace(/G-[\w-]+/, ga4Id);
      fs.writeFileSync(ga4FilePath, newGa4File);
      ga4FileSpinner.succeed(
        chalk.green(`Modified GA4 file for ${chalk.blue(brandName)}`)
      );
    } else {
      ga4FileSpinner.warn(
        chalk.yellow(
          `GA4 Id is not provided for ${chalk.blue(brandName)}. Skipping.`
        )
      );
    }
  } catch (error) {
    ga4FileSpinner.fail(
      chalk.red(
        `Error modifying GA4 file for ${chalk.blue(brandName)}: ${
          error.message
        }`
      )
    );
    ga4FileSpinner.stop();
  }
}

/**
 * @description Modify Google Tag Manager file with new GTM ID if GTM ID is provided
 * @param {import('inquirer').Answers} options
 */
export async function modifyGTM(options) {
  const { googleTagManagerId, brandName } = options;
  const gtmFilePath = path.join(
    `${process.cwd()}/apps`,
    brandName,
    "public",
    "scripts",
    "googleTagManager.js"
  );
  const gtmFileSpinner = ora(
    `Modifying Google Tag Manager file for ${brandName}...`
  ).start();
  try {
    if (fs.existsSync(gtmFilePath) && googleTagManagerId) {
      const gtmFile = fs.readFileSync(gtmFilePath, "utf8");
      const newGtmFile = gtmFile.replace(/GTM-[\w-]+/, googleTagManagerId);
      fs.writeFileSync(gtmFilePath, newGtmFile);
      gtmFileSpinner.succeed(
        chalk.green(
          `Modify Google Tag Manager file for ${chalk.blue(brandName)}`
        )
      );
    } else {
      gtmFileSpinner.warn(
        chalk.yellow(
          `Google Tag Manager Id is not provided for ${chalk.blue(
            brandName
          )}. Skipping.`
        )
      );
    }
  } catch (error) {
    gtmFileSpinner.fail(
      chalk.red(
        `Error modifying Google Tag Manager file for ${chalk.blue(
          brandName
        )}: ${error.message}`
      )
    );
    gtmFileSpinner.stop();
  }
}
