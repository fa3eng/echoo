import { Command } from 'commander'
import { gen, init } from './logic.js'
import { IOptionsConfig } from './types/index.js'

const program = new Command()

program
  .option('-e, --external-templates', 'Using external templates')
  .option(
    '-p, --configuration-path <path>',
    'Specifies the absolute path to the configuration file'
  )

program.parse()

const optionsConfig = program.opts<IOptionsConfig>()

program
  .command('gen')
  .description('Generating a template file')
  .action(async () => {
    await gen(optionsConfig)
  })

program
  .command('init')
  .description('quick setup echoo')
  .action(() => {
    init()
  })

export { program }
