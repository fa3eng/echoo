import chalk, { ChalkInstance } from 'chalk'
import { ActionsListItem } from '../../../types/index.js'

const makeInfoMessage = function (
  type: 'skip' | 'succeed',
  item: ActionsListItem
): string {
  const map = new Map([
    ['skip', { color: chalk.yellowBright, message: '跳过 Action' }],
    ['succeed', { color: chalk.greenBright, message: '执行 Action' }]
  ])

  const color = map.get(type)?.color as ChalkInstance
  const message = map.get(type)?.message as string

  return `${color(`[${item.count}] ${message}:`)} ${item.description}`
}

const makeErrorMessage = function (type: 'add' | 'append', item: ActionsListItem): string {
  const message = new Map([
    ['add', '所创建的文件已经存在'],
    ['append', '所要修改的目标文件不存在']
  ])

  return `${chalk.red(
    `[ERROR WARNING] Action: ${chalk.underline(item.description)} ${String(
      message.get(type)
    )}`
  )}\n\n\t${chalk.blueBright('Path:')} ${item.path}\n\n`
}

export { makeInfoMessage, makeErrorMessage }
