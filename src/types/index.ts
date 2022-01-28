import { QuestionCollection, Answers } from 'inquirer'

/**
 * CLI 获取到的 options
 */
declare interface IOptionsConfig {
  force?: boolean
  externalTemplates?: boolean
  configurationPath?: string
}

// TODO: 类型还需要进行更多的优化

/**
 * echoorc 中 config 的类型
 */
export interface IActionAdd {
  type: 'add'
  path: string
  templatePath: string
  data: Record<string, string>
}
export interface IActionAppend {
  type: 'append'
  path: string
  pattern: string
  templatePath: string
  data: Record<string, string>
}

interface IEchoorcConfig {
  name: string
  description: string
  prompts: QuestionCollection
  actions: Array<IActionAdd | IActionAppend> | ((data: Answers) => Array<IActionAdd | IActionAppend>)
}

/**
 * action 中的类型
 */
interface IActionsResult {
  type: 'add' | 'append' | 'modify'
  path: string
  templatePath: string
  data?: Record<string, string>
  isCreate?: string | boolean
  pattern?: string
}

/**
 * ConfigMap 的类型
 */
interface IConfigMap {
  echoorcFilePath: string
  generatorsMap: Map<string, IEchoorcConfig>
  currentGenerator: IEchoorcConfig
  actionsResult: IActionsResult[]
}

export { IEchoorcConfig, IOptionsConfig, IConfigMap, IActionsResult }
