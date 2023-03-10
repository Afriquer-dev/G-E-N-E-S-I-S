const fse = require('fs-extra');
const chalk = require('chalk');
const { promptForMissingOptions } = require('../lib/prompts');
const { exec } = require('child_process');
const { runCommand } = require('../lib/custom-utils');
const path = require('path');
const { projectInstall } = require('pkg-install');
const Listr = require('listr');
const ora = require('ora');
const fs = require('fs');


const spinner = ora();

async function copyTemplateFiles(options) {
  try {
    await fse.copy(options.templateDirectory, options.targetDirectory);
  } catch (err) {
    console.log(chalk.red("=========================================="));
    console.log(chalk.red.bold("An unexpected error occurred while trying to copy template files 👇"));
    console.error(err);
    process.exit();
    console.log(chalk.red("=========================================="));
  }
}

async function initializeGitRepo(options) {

  // fse.unlink(path.join(options.targetDirectory, '/.git'));
  fs.rmSync(path.join(options.targetDirectory, "/.git"), { recursive: true, force: true });

  runCommand(`cd ${options.projectName} && git init`);
}

async function cleanRepository(options) {
  runCommand(`cd ${options.projectName} && git branch -M main && git add . && git commit -m "Initial commit"`);
}

async function checkAccess(options) {
  try {
    await fse.access(options.templateDirectory, fse.constants.R_OK);
  } catch (err) {
    console.log(chalk.red("=========================================="));
    console.log(chalk.red.bold("An unexpected error occurred while accessing the template directory 👇"));
    console.error(err.message);
    console.log(chalk.red("=========================================="));
    process.exit(1);
  }
}

function openVSCode(options) {
  exec(`cd ${options.targetDirectory} && code .`);
}

async function forgeProject(options) {
  options = await promptForMissingOptions(options);
  await checkAccess(options);

  const taskList = [
    {
      title: chalk.cyanBright.bold('Copy project files 📂'),
      task: () => copyTemplateFiles(options),
    },
    {
      title: chalk.cyanBright.bold('✨ Installing dependencies'),
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        }),
      skip: () =>
        !options.installDeps
          ? "[INFO] USE `--install` to automatically install dependencies."
          : undefined,
    },
    {
      title: chalk.cyanBright.bold('Git Repository 📙'),
      task: () => {
        spinner.color = 'yellow';
        spinner.start();
        return new Listr(
          [
            {
              title: chalk.cyanBright.bold('⚡ Initialize git repository'),
              task: () => {
                console.log(chalk.green('\n⚡ Initialize git repository'));
                initializeGitRepo(options);
              }
            }
          ]
        );

      },
      enabled: () => options.git,
    }
  ];

  const tasks = new Listr(taskList);

  await tasks.run();
  console.log(chalk.green(`✨ DONE, Successfully created `), chalk.yellow.bold(`${options.projectName}`));
  spinner.stop();
}

module.exports = {
  forgeProject
};