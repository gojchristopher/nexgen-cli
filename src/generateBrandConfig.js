import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { promisify } from "util";

const copyFile = promisify(fs.copy);

/**
 * @description Generate brand config file
 * @param {import('inquirer').Answers} options
 */
export async function generateBrandConfig(options) {
  const {
    brandName,
    supportEmail,
    ga4Id,
    googleTagManagerId,
    referenceBrand,
    brandUrl,
  } = options;
  const configFilePath = path.join(
    `${process.cwd()}/libs`,
    "constants",
    "src",
    "lib",
    "configs"
  );
  const brandConfigRefFilePath = path.join(
    `${process.cwd()}/libs`,
    "constants",
    "src",
    "lib",
    "configs",
    `${referenceBrand}.ts`
  );
  const newBrandConfigFilePath = path.join(configFilePath, `${brandName}.ts`);

  const brandConfigSpinner = ora(
    `Generating brand config file for ${brandName}...`
  ).start();

  try {
    if (!fs.existsSync(newBrandConfigFilePath)) {
      await copyFile(brandConfigRefFilePath, newBrandConfigFilePath);
      const brandConfigFile = fs.readFileSync(newBrandConfigFilePath, "utf8");
      let newBrandConfigFile = brandConfigFile
        .replace(/title: '.*',/, `title: '${brandName.toUpperCase()}',`)
        .replace(/directoryPath: '.*',/, `directoryPath: '${brandName}',`);

      if (brandUrl)
        newBrandConfigFile = newBrandConfigFile
          .replace(/fullUrl: '.*',/, `fullUrl: '${brandUrl}',`)
          .replace(/urlTitle: '.*',/, `urlTitle: '${brandUrl}',`);
      if (ga4Id)
        newBrandConfigFile = newBrandConfigFile.replace(
          /ga4Id: '.*',/,
          `ga4Id: '${ga4Id}',`
        );
      if (googleTagManagerId)
        newBrandConfigFile = newBrandConfigFile.replace(
          /googleTagManager: '.*',/,
          `googleTagManager: '${googleTagManagerId}',`
        );
      if (supportEmail)
        newBrandConfigFile = newBrandConfigFile.replace(
          /supportEmail: '.*',/,
          `supportEmail: '${supportEmail}',`
        );
      fs.writeFileSync(newBrandConfigFilePath, newBrandConfigFile);
      brandConfigSpinner.succeed(
        chalk.green(`Generated brand config file for ${chalk.blue(brandName)}`)
      );
    } else {
      brandConfigSpinner.warn(
        chalk.yellow(
          `Brand config file for ${chalk.blue(
            brandName
          )} already exists. Skipping.`
        )
      );
    }
  } catch (error) {
    brandConfigSpinner.fail(
      chalk.red(
        `Error generating brand config file for ${chalk.blue(brandName)}: ${
          error.message
        }`
      )
    );
    brandConfigSpinner.stop();
  }
}
