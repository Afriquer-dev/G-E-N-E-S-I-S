const { execSync } = require('child_process');
const figlet = require('figlet');
const chalk = require('chalk');

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.log(chalk.red.bold("=================================="));
    console.log(`Failed to execute command ${command}`);
    console.log(error.message);
    console.log(chalk.red.bold("=================================="));
    process.exit();
  }
};

const figletOptions = {
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 120,
  kerning: "fitted",
  whitespaceBreak: true
};
const figletText = 'GENESIS';


const displayFigletText = function (text, options) {
  console.log(chalk.yellow.bold(
    figlet.textSync(text, options)
  ));
};

const showIntro = function (authorData) {
  console.log(chalk.cyan.bold('================ 👨‍💻 author details ================'));
  console.log('');
  console.log(chalk.greenBright.bold('name :: '), chalk.grey(authorData.name));
  console.log(chalk.greenBright.bold('email :: '), chalk.grey(authorData.email));
  displayFigletText(figletText, figletOptions);
  console.log(chalk.cyan.bold('====================== enjoy 🚀 ======================\n'));
};

module.exports = {
  runCommand,
  showIntro
};