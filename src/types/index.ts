import { QuestionCollection, Answers } from 'inquirer'

/**
 * CLI 获取到的 options
 */
declare interface IOptionsConfig {
  externalTemplates?: boolean
  configurationPath?: string
}

/**
 * @count 计数
 * @description action 描述
 * @path 生成路径
 * @templatePath 模板路径
 * @data 收集到的数据
 * @isUse action 是否被调用
 */
interface BaseAction {
  count: number
  description: string
  path: string
  templatePath: string
  data?: Record<string, string>
  isUse: boolean
}

/**
 * @type 类型
 * @isForce 是否执行了强制生成的操作
 * @isFileAlreadyExists 在执行 action 之前文件是否存在
 * @createdPath 新创建文件时新创建的目录路径
 */
export interface IActionAdd extends BaseAction {
  type: 'add'
  isForce: boolean
  isFileAlreadyExists: boolean
  createdPath?: string
}

export interface IActionAppend extends BaseAction {
  type: 'append'
  pattern: string
}

export type ActionsListItem = IActionAdd | IActionAppend

interface IEchoorcConfig {
  name: string
  description: string
  prompts: QuestionCollection
  actions:
  | Array<IActionAdd | IActionAppend>
  | ((data: Answers) => Array<IActionAdd | IActionAppend>)
}

export { IEchoorcConfig, IOptionsConfig }
