import { Command } from 'commander'
import { gen } from './logic'

const program = new Command()

program
  .option('-f, --force', 'Force a file to be generated, even though the file may already exist in the current path')
  .option('-e, --external-templates', 'Using external templates')
  .option('-p, --configuration-path <path>', 'Specifies the absolute path to the configuration file')

program.parse()

const optionsConfig = program.opts<IOptionsConfig>()

program
  .command('gen')
  .description('Generating a template file')
  .action(async () => {
    await gen(optionsConfig)
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
