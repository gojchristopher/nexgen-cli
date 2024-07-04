import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

/**
 * @description This will update workspace.json file and add a new config for the new brand
 * @param {import('inquirer').Answers} options
 */
export async function updateWorkspacejsonfile(options) {
  const { referenceBrand, brandName } = options;
  const workspaceJsonPath = path.join(process.cwd(), "workspace.json");

  const workspaceData = fs.readFileSync(workspaceJsonPath, "utf8");

  const workspaceUpdateSpinner = ora("Updating Workspace json file...").start();

  try {
    const workspaceConfig = JSON.parse(workspaceData);

    // This will check if the config with the key of the brandName not exists
    if (!workspaceConfig.projects[brandName]) {
      //Copy the reference config
      const referenceConfig = JSON.stringify(
        workspaceConfig.projects[referenceBrand]
      );

      // Replace all occurences of the referenceBrand with the new brandName
      const newBrandConfig = JSON.parse(
        referenceConfig.replace(new RegExp(referenceBrand, "g"), brandName)
      );

      // Add the new configuration
      workspaceConfig.projects[brandName] = newBrandConfig;

      // Write the updated content workspace config back to the file
      fs.writeFileSync(
        workspaceJsonPath,
        JSON.stringify(workspaceConfig, null, 2),
        "utf8"
      );
      workspaceUpdateSpinner.succeed(
        chalk.green(
          `Added new config ${chalk.blue(brandName)} to workspace.json file`
        )
      );
    } else {
      workspaceUpdateSpinner.warn(
        chalk.yellow(
          `${chalk.blue(
            brandName
          )} config already exists in workspace.json file. Skipping.`
        )
      );
    }
  } catch (error) {
    workspaceUpdateSpinner.fail(
      `Error Adding ${brandName} config to workspace.json file`
    );
    workspaceUpdateSpinner.stop();
  }
}
