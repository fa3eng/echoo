import { Command } from 'commander'

const program = new Command()

program
  .option('-f, --force', 'Force a file to be generated, even though the file may already exist in the current path')
  .option('-b, --built-in-templates', 'Using built-in templates')
  .option('-p, --configuration-path <path>', 'Specifies the absolute path to the configuration file')

program.parse()

program
  .command('gen')
  .description('Generating a template file')
  .action(() => {
    console.log('gen')
  })

program
  .command('version')
  .description('View current version')
  .action(() => {
    console.log('version')
  })

program
  .command('help')
  .description('View current version')
  .action(() => {
    console.log('help')
  })

export { program }
