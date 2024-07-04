import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import path from "path";

/**
 * @description modify and add the new brand type to BrandTitles type
 * @param {import('inquirer').Answers} options
 */
export async function appendBrandTitlesType(options) {
  const { brandName } = options;
  const brandTypesFilePath = path.join(
    `${process.cwd()}/libs`,
    "typings",
    "commons",
    "src",
    "index.ts"
  );
  const typeBrandTitlesDefRegex = /export type BrandTitles =([^;]+);/;

  const brandTitlesSpinner = ora("Updating Brand Title type").start();

  const brandTypeFile = fs.readFileSync(brandTypesFilePath, "utf8");

  const brandTitleMatch = brandTypeFile.match(typeBrandTitlesDefRegex);

  try {
    if (brandTitleMatch) {
      let brandTitles = brandTitleMatch[1]
        .split("\n")
        .map((line) => line.trim());

      if (!brandTitles.includes(`| '${brandName.toUpperCase()}'`)) {
        brandTitles.push(`| '${brandName.toUpperCase()}'`);
        const newBrandTitlesDef = `export type BrandTitles =${brandTitles.join(
          "\n "
        )};`;
        const updatedBrandTitles = brandTypeFile.replace(
          typeBrandTitlesDefRegex,
          newBrandTitlesDef
        );

        fs.writeFileSync(brandTypesFilePath, updatedBrandTitles, "utf8");
        brandTitlesSpinner.succeed(
          chalk.green(
            `Added new brand type ${chalk.blue(brandName)} to BrandTitles type`
          )
        );
      } else {
        brandTitlesSpinner.warn(
          chalk.yellow(
            `Type ${chalk.blue(
              brandName
            )} already exists in BrandTitles. Skipping`
          )
        );
      }
    }
  } catch (error) {
    brandTitlesSpinner.fail(
      `Error Adding ${chalk.blue(
        brandName.toUpperCase()
      )} type to BrandTitles type: ${error.message}`
    );
    brandTitlesSpinner.stop();
  }
}

/**
 * @description modify and add the new brand type to LowercaseBrandTitles type
 * @param {import('inquirer').Answers} options
 */
export async function appendLowerCaseBrandTitlesType(options) {
  const { brandName } = options;
  const brandTypesFilePath = path.join(
    `${process.cwd()}/libs`,
    "typings",
    "commons",
    "src",
    "index.ts"
  );
  const typeBrandTitlesLowerDefRegex =
    /export type LowercaseBrandTitles =([^;]+);/;

  const brandTypeFile = fs.readFileSync(brandTypesFilePath, "utf8");

  const lowerBrandTitlesSpinner = ora(
    "Updating Lowercase Brand Title type"
  ).start();

  const lowerCaseBrandTitleMatch = brandTypeFile.match(
    typeBrandTitlesLowerDefRegex
  );
  try {
    if (lowerCaseBrandTitleMatch) {
      let lowerCaseBrandTitles = lowerCaseBrandTitleMatch[1]
        .split("\n")
        .map((line) => line.trim());

      if (!lowerCaseBrandTitles.includes(`| '${brandName}'`)) {
        lowerCaseBrandTitles.push(`| '${brandName}'`);

        const newLowerBrandTitlesDef = `export type LowercaseBrandTitles =${lowerCaseBrandTitles.join(
          "\n "
        )};`;
        const updatedLowerCaseBrandTitles = brandTypeFile.replace(
          typeBrandTitlesLowerDefRegex,
          newLowerBrandTitlesDef
        );

        fs.writeFileSync(
          brandTypesFilePath,
          updatedLowerCaseBrandTitles,
          "utf8"
        );
        lowerBrandTitlesSpinner.succeed(
          chalk.green(
            `Added new brand type ${chalk.blue(
              brandName
            )} to LowerCaseBrandTitles Type`
          )
        );
      } else {
        lowerBrandTitlesSpinner.warn(
          chalk.yellow(
            `Type ${chalk.blue(
              brandName
            )} already exists in LowerCaseBrandTitles. Skipping`
          )
        );
      }
    }
  } catch (error) {
    lowerBrandTitlesSpinner.fail(
      `Error Adding ${chalk.blue(
        brandName
      )} type to LowercaseBrandTitles type: ${error.message}`
    );
    lowerBrandTitlesSpinner.stop();
  }
}

/**
 * @description modify and add the new brand type to SportsbookURLBrandTitles type
 * @param {import('inquirer').Answers} options
 */
export async function appendSportsbookURLBrandTitlesType(options) {
  const { brandName } = options;
  const brandTypesFilePath = path.join(
    `${process.cwd()}/libs`,
    "typings",
    "commons",
    "src",
    "index.ts"
  );
  const typeSBBrandTitlesDefRegex =
    /export type SportsbookURLBrandTitles =([^;]+);/;

  const brandTypeFile = fs.readFileSync(brandTypesFilePath, "utf8");

  const sbBrandTitleSpinner = ora(
    "Updating SportsbookURL Brand Titles type"
  ).start();

  const sbBrandTitleMatch = brandTypeFile.match(typeSBBrandTitlesDefRegex);
  try {
    if (sbBrandTitleMatch) {
      let sbBrandTitles = sbBrandTitleMatch[1]
        .split("\n")
        .map((line) => line.trim());

      if (!sbBrandTitles.includes(`| ${brandName}`)) {
        sbBrandTitles.push(`| '${brandName}'`);

        const newSbBrandTitlesDef = `export type SportsbookURLBrandTitles =${sbBrandTitles.join(
          "\n "
        )};`;
        const updateSBBrandTitles = brandTypeFile.replace(
          typeSBBrandTitlesDefRegex,
          newSbBrandTitlesDef
        );

        fs.writeFileSync(brandTypesFilePath, updateSBBrandTitles, "utf8");
        sbBrandTitleSpinner.succeed(
          chalk.green(
            `Added new brand type ${chalk.blue(
              brandName
            )} to SportsbookURLBrandTitles type`
          )
        );
      } else {
        sbBrandTitleSpinner.warn(
          `Type ${brandName} already exists in SportsbookURLBrandTitles type. Skipping.`
        );
      }
    }
  } catch (error) {
    sbBrandTitleSpinner.fail(
      `Error Adding ${chalk.blue(
        brandName
      )} type to SportsbookURLBrandTitles type: ${error.message}`
    );
    sbBrandTitleSpinner.stop();
  }
}

/**
 * @description modify and add the new brand type to SupportedAltenarWidgetBrands type
 * @param {import('inquirer').Answers} options
 */
export async function appendSupportedAltenarWidgetBrands(options) {
  const { brandName } = options;
  const brandTypesFilePath = path.join(
    `${process.cwd()}/libs`,
    "typings",
    "commons",
    "src",
    "index.ts"
  );
  const typeSupportedBrandDefRegex =
    /export type SupportedAltenarWidgetBrands =([^;]+);/;

  const brandTypeFile = fs.readFileSync(brandTypesFilePath, "utf8");

  const sbSupportedBrandTitleSpinner = ora(
    "Updating SportsbookURL Brand Titles type"
  ).start();

  const sbSupportedBrandTitleMatch = brandTypeFile.match(
    typeSupportedBrandDefRegex
  );
  try {
    if (sbSupportedBrandTitleMatch) {
      let sbSupportedBrand = sbSupportedBrandTitleMatch[1]
        .split("\n")
        .map((line) => line.trim());

      if (!sbSupportedBrand.includes(`| ${brandName}`)) {
        sbSupportedBrand.push(`| '${brandName}'`);

        const newSupportedSbBrandTitlesDef = `export type SupportedAltenarWidgetBrands =${sbSupportedBrand.join(
          "\n "
        )};`;
        const updateSupportedSBBrandTitles = brandTypeFile.replace(
          typeSupportedBrandDefRegex,
          newSupportedSbBrandTitlesDef
        );

        fs.writeFileSync(
          brandTypesFilePath,
          updateSupportedSBBrandTitles,
          "utf8"
        );
        sbSupportedBrandTitleSpinner.succeed(
          chalk.green(
            `Added new brand type ${chalk.blue(
              brandName
            )} to SupportedAltenarWidgetBrands type`
          )
        );
      } else {
        sbSupportedBrandTitleSpinner.warn(
          `Type ${brandName} already exists in SupportedAltenarWidgetBrands type. Skipping.`
        );
      }
    }
  } catch (error) {
    sbSupportedBrandTitleSpinner.fail(
      `Error Adding ${chalk.blue(
        brandName
      )} type to SupportedAltenarWidgetBrand type: ${error.message}`
    );
    sbSupportedBrandTitleSpinner.stop();
  }
}

/**
 * @description modify and add the new brand type to BrandDirectory type
 * @param {import('inquirer').Answers} options
 */
export async function appendBrandDirectoryType(options) {
  const { brandName } = options;
  const brandTypesFilePath = path.join(
    `${process.cwd()}/libs`,
    "typings",
    "commons",
    "src",
    "index.ts"
  );
  const typeBrandDirDefRegex = /export type BrandDirectory =([^;]+);/;

  const brandTypeFile = fs.readFileSync(brandTypesFilePath, "utf8");

  const brandDirSpinner = ora("Updating Brand Directory type").start();

  const brandDirMatch = brandTypeFile.match(typeBrandDirDefRegex);

  try {
    if (brandDirMatch) {
      let brandDir = brandDirMatch[1].split("\n").map((line) => line.trim());

      if (!brandDir.includes(`| ${brandName}`)) {
        brandDir.push(`| '${brandName}'`);

        const newBrandDirDef = `export type BrandDirectory =${brandDir.join(
          "\n "
        )};`;
        const updateBrandDir = brandTypeFile.replace(
          typeBrandDirDefRegex,
          newBrandDirDef
        );

        fs.writeFileSync(brandTypesFilePath, updateBrandDir, "utf8");
        brandDirSpinner.succeed(
          chalk.green(
            `Added new brand type ${chalk.blue(
              brandName
            )} to BrandDirectory type`
          )
        );
      } else {
        brandDirSpinner.warn(
          `Type ${brandName} already exists in BrandDirectory type. Skipping.`
        );
      }
    }
  } catch (error) {
    brandDirSpinner.fail(
      `Error Adding ${chalk.blue(brandName)} type to BrandDirectory type: ${
        error.message
      }`
    );
    brandDirSpinner.stop();
  }
}
