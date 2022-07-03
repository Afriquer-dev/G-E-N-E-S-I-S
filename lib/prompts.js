const inquirer = require('inquirer');
const path = require('path');
const fse = require('fs-extra');

const TEMPLATES_DIRECTORY_PATH = path.resolve(__dirname, '../TEMPLATES-COLLECTION');
const CHOICES = fse.readdirSync(TEMPLATES_DIRECTORY_PATH);

let questions = [
  {
    type: "list",
    name: "template",
    message: "What template would you like to use",
    choices: CHOICES
  }
];

async function promptForMissingOptions(options) {

  options.targetDirectory = path.resolve(process.cwd(), options.projectName);

  options = {
    ...options,
    targetDirectory: options.targetDirectory,
  };

  if (options.skipPrompts) {
    const answers = await inquirer.prompt(questions);
    const templateDirectory = path.resolve(__dirname, `../TEMPLATES-COLLECTION/${answers.template}`);
    return {
      ...options,
      template: answers.template,
      templateDirectory: templateDirectory
    };
  };

  if (!options.installDeps) {
    questions.push({
      type: "confirm",
      name: "installDeps",
      message: "Would you like to install dependencies for this template? "
    }
    );
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "initGit",
      message: "Would you like to initialize a git repo? "
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    installDeps: options.installDeps || answers.installDeps,
    template: answers.template,
    git: options.git || answers.initGit,
    templateDirectory: path.resolve(__dirname, `../TEMPLATES-COLLECTION/${answers.template}`)
  };
}

module.exports = { promptForMissingOptions };