const program = require('commander');
const chalk = require('chalk');
const { forgeProject } = require('../commands/project');

program
  .command('forge')
  .description('forge a project template using a name')
  .requiredOption('-n, --name <name>', 'name for your project')
  // .option('-t, --template <template>', 'Template to use when initiating project')
  .option('-s, --skip-prompts', 'skip prompts and use defaults', false)
  .option('-g, --git', 'Initialize a git repository', false)
  .option('-i, --install-deps', 'Install dependencies required by the templates', false)
  .action(options => {
    forgeProject(options);
  }
  );

program
  .command('snitch')
  .description("Show information about a project");

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}