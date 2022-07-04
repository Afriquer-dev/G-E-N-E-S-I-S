const { execSync } = require('child_process');
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


module.exports = {
  runCommand
};