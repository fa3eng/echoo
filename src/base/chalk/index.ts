import chalk from 'chalk'

const log = console.log

const prefix = '[echoo]:'

const logInfo = function (...args: string[]): void {
  log(chalk.bgGreen(prefix), chalk.greenBright(...args))
}

const logError = function (...args: string[]): void {
  log(chalk.bgRed(prefix), chalk.redBright(...args))
}

const logWarning = function (...args: string[]): void {
  log(chalk.bgYellow(prefix), chalk.yellowBright(...args))
}

export { logInfo, logError, logWarning }
