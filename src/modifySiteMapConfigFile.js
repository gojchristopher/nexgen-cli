import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

/**
 * @description Update sitemap.config.js file with new siteUrl and brandName
 * @param {import('inquirer').Answers} options
 */
export async function updateSiteMapConfig(options) {
  const { brandName, referenceBrand, brandUrl } = options;
  const siteMapConfigPath = path.join(
    `${process.cwd()}/apps`,
    brandName,
    "sitemap.config.js"
  );
  const siteMapConfigSpinner = ora(
    `Updating sitemap.config.js file for ${brandName}...`
  ).start();

  const siteMapConfigFile = fs.readFileSync(siteMapConfigPath, "utf8");

  try {
    let newSiteMapConfigFile = siteMapConfigFile
      .replace(/sourceDir: '.*',/, `sourceDir: 'dist/apps/${brandName}/.next',`)
      .replace(/outDir: '.*',/, `outDir: 'apps/${brandName}/public',`);
    if (brandUrl)
      newSiteMapConfigFile = newSiteMapConfigFile.replace(
        /const siteUrl = '.*';/,
        `const siteUrl = 'https://${brandUrl}';`
      );

    fs.writeFileSync(siteMapConfigPath, newSiteMapConfigFile, "utf8");
    siteMapConfigSpinner.succeed(
      chalk.green(`Updated sitemap.config.js file for ${chalk.blue(brandName)}`)
    );
  } catch (error) {
    siteMapConfigSpinner.fail(
      `Error updating sitemap.config.js file for ${brandName}: ${error.message}`
    );
    siteMapConfigSpinner.stop();
  }
}
