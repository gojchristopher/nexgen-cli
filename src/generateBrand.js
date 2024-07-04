import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { promisify } from "util";
import { generateBrandConfig } from "./generateBrandConfig";
import {
  modifyGAinitFile,
  modifyGTM,
  modifyGa4file,
} from "./modifyBrandScriptsFile";
import { updateSiteMapConfig } from "./modifySiteMapConfigFile";
import {
  appendBrandDirectoryType,
  appendBrandTitlesType,
  appendLowerCaseBrandTitlesType,
  appendSportsbookURLBrandTitlesType,
  appendSupportedAltenarWidgetBrands,
} from "./modifyTypes";
import { updateWorkspacejsonfile } from "./modifyWorkspaceFile";

const copyFile = promisify(fs.copy);
const createDir = promisify(fs.mkdir);

/**
 * @description Generate new brand in apps directory
 * @param {import('inquirer').Answers} options
 */
export async function generateBrand(options) {
  const { brandName, referenceBrand, brandLogo } = options;
  const appPath = path.join(`${process.cwd()}/apps`);
  const referenceBrandPath = path.join(`${process.cwd()}/apps`, referenceBrand);
  console.log("this is path", process.cwd());

  const newBrandFile = path.join(appPath, brandName);
  const newBrandFileSpinner = ora(
    `Generating new brand ${brandName}...`
  ).start();

  try {
    if (!fs.existsSync(`${appPath}\\${brandName}`)) {
      await createDir(newBrandFile);
      await copyFile(referenceBrandPath, newBrandFile);

      if (fs.access(`${appPath}/${brandName}`)) {
        newBrandFileSpinner.succeed(
          chalk.green(
            `generated new brand ${chalk.blue(brandName)} in app directory`
          )
        );
        await modifyGAinitFile(options);
        await modifyGa4file(options);
        await modifyGTM(options);
        await updateSiteMapConfig(options);
        await appendBrandTitlesType(options);
        await appendLowerCaseBrandTitlesType(options);
        await appendSportsbookURLBrandTitlesType(options);
        await appendSupportedAltenarWidgetBrands(options);
        await appendBrandDirectoryType(options);
        await generateBrandConfig(options);
        await updateWorkspacejsonfile(options);
      }
    } else {
      newBrandFileSpinner.warn(
        chalk.yellow(
          `Brand directory ${chalk.blue(brandName)} already exists. Skipping.`
        )
      );
    }
  } catch (error) {
    newBrandFileSpinner.fail(
      chalk.red(
        `Error generating brand ${chalk.blue(brandName)}: ${error.message}`
      )
    );
    newBrandFileSpinner.stop();
  }
}
