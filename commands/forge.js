const fse = require('fs-extra');
const chalk = require('chalk');
const { promptForMissingOptions } = require('../lib/prompts');
const { exec } = require('child_process');
const path = require('path');

async function copyTemplateFiles(options) {
  try {
    await fse.copy(options.templateDirectory, options.targetDirectory);
  } catch (err) {
    console.log(chalk.red("=========================================="));
    console.log(chalk.red.bold("An unexpected error occurred while trying to copy template files 👇"));
    console.error(err);
    console.log(chalk.red("=========================================="));
  }
}

async function initializeGitRepo(options) {

  fse.unlink(path.join(options.targetDirectory, '/.git'));

  exec(`cd ${options.projectName} && git init`, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }
    if (stdout) {
      console.log(chalk.green.bold('Success: '), stdout);
      return;
    }
    if (stderr) {
      console.log(`Error: ${stderr}`);
      return;
    }
  });
}

async function checkAccess(options) {
  try {
    await fse.access(options.templateDirectory, fse.constants.R_OK);
    console.log(chalk.green.bold('Read Access to the template Directory OK!'));
  } catch (err) {
    console.log(chalk.red("=========================================="));
    console.log(chalk.red.bold("An unexpected error occurred while accessing the template directory 👇"));
    console.error(err);
    console.log(chalk.red("=========================================="));
    process.exit(1);
  }
}

async function forgeProject(options) {
  options = await promptForMissingOptions(options);
  console.log('from forge..\n', options);
  await checkAccess(options);
}

module.exports = {
  forgeProject
};