const { promptForMissingOptions } = require('../lib/prompts');

async function forgeProject(options) {
  options = await promptForMissingOptions(options);
  console.log('from forge..\n', options);
}

module.exports = {
  forgeProject
};