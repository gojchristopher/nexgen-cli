import { existingBrands } from "./get-all-brand-dirnames.js";

/**
 * @description Check if the input is numeric
 * @param {string} input
 * @returns
 */

function isNumeric(input) {
  const regex = /^[0-9]+$/;
  return regex.test(input);
}

/**
 * @description Check if the brand name starts with a number
 * @param {string} input
 * @returns
 */
function startsWithNumber(input) {
  const regex = /^[0-9]/; // Regular expression to check if the string starts with a number
  return regex.test(input);
}

/**
 * @type {import('inquirer').QuestionCollection}
 */
export const questions = [
  {
    type: "list",
    name: "referenceBrand",
    message: "Choose reference brand:",
    loop: false,
    choices: existingBrands(),
  },
  {
    name: "brandName",
    message: "Enter new brand name:",
    validate: (input) => {
      if (input === "") {
        return "Please enter a brand name";
      }
      if (isNumeric(input) || startsWithNumber(input))
        return "Please enter a valid brand name";
      return true;
    },
  },
  // {
  //   name: 'adminCode',
  //   message: 'Enter admin code:',
  //   validate: (input) => (input === '' ? 'Please enter an admin code' : true),
  // },
  // {
  //   type: 'checkbox',
  //   name: 'siteEnvironment',
  //   message: 'choose site environment',
  //   choices: ['row', 'ukgc'],
  // },
  {
    name: "supportEmail",
    message: "Enter Support Email:",
  },
  {
    name: "brandUrl",
    message: "Enter Brand URL:",
  },
  {
    name: "ga4Id",
    message: "Enter GA4 ID:",
  },
  {
    name: "googleTagManagerId",
    message: "Enter Google Tag Manager ID:",
  },
  {
    name: "recaptchaKey",
    message: "Enter recaptcha Key staging:",
  },
  {
    name: "prodRecaptchaKey",
    message: "Enter Prod Recaptcha Key:",
  },
  {
    name: "primaryColor",
    message: "Enter primary color:",
  },
  {
    name: "primaryColor",
    message: "Enter primary color:",
  },
  {
    name: "primaryColor",
    message: "Enter primary color:",
  },
  {
    name: "primaryColor",
    message: "Enter primary color:",
  },
];
