import chalk from "chalk";
import { program } from "commander";
import figlet from "figlet";
import inquirer from "inquirer";
import { generateBrand } from "./generateBrand.js";
import { questions } from "./utils/questions.js";

export function cli() {
  program.version("1.0.0").description("Generate new brand");

  console.log(
    chalk.yellow(
      figlet.textSync("Generate New Brand", { horizontalLayout: "full" })
    )
  );

  program.action(() => {
    inquirer.prompt(questions).then(async (result) => {
      await generateBrand(result);
    });
  });

  program.parse(process.argv);
}
