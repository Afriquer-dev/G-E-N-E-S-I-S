const program = require('commander');
const chalk = require('chalk');
const { forgeProject } = require('../commands/project');

program
  .argument('<project_name>')
  .description('forge a project template using a name')
  .option('-s, --skip-prompts', 'skip prompts and use defaults', false)
  .option('-g, --init-git', 'Initialize a git repository', false)
  .option('-i, --install-deps', 'Install dependencies required by the templates', false)
  .action((project_name, options) => {
    options.name = project_name;
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