const { execSync } = require('child_process');
const figlet = require('figlet');
const chalk = require('chalk');

const orange = chalk.hex('#fcd735');
const crimson = chalk.hex('#ff7a73');
const green = chalk.hex('#26ff84cc');

const runCommand = command => {
  try {
    execSync(`${command}`);
  } catch (error) {
    console.log(chalk.red.bold("=================================="));
    console.log(chalk.red(`Failed to execute command ${command}`));
    console.log(error.message);
    console.log(chalk.red.bold("=================================="));
    process.exit();
  }
};

const figletOptions = {
  font: 'slant',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 120,
  kerning: "full",
  whitespaceBreak: true
};
const figletText = 'G E N E S I S';


const displayFigletText = function (text, options) {
  console.log(green.bold(
    figlet.textSync(text, options)
  ));
};

const showIntro = function (authorData) {
  console.log(chalk.cyan.bold('================ 👨‍💻 author details ================'));
  displayFigletText(figletText, figletOptions);
  console.log('');
  for (data in authorData) {
    console.log(green.bold(`${data} :: `), crimson(`${authorData[data]}`));
  }
  console.log(chalk.cyan.bold('\n====================== enjoy 🚀 ======================\n'));
};

module.exports = {
  runCommand,
  showIntro
};