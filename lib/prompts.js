const inquirer = require('inquirer');

let questions = [
  {
    type: "list",
    name: "template",
    message: "What template would you like to use",
    choices: ['gulp-sass', 'static-website']
  }
];

async function promptForMissingOptions(options) {

  if (options.skipPrompts) {
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      template: answers.template
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
    git: options.git || answers.initGit
  };
}

module.exports = { promptForMissingOptions };