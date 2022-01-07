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
interface IActionAdd {
  type: string
  path: string
  templateFile: string
  data: Record<string, string>
}
interface IActionAppend {
  type: string
  path: string
  pattern: string
  templateFile: string
  data: Record<string, string>
}

interface IEchoorcConfig {
  name: string
  description: string
  prompts: QuestionCollection
  actions: Array<IActionAdd | IActionAppend> | ((data: Answers) => Array<IActionAdd | IActionAppend>)
}
/**
 * ConfigMap 的类型
 */
interface IConfigMap {
  echoorcFilePath: string
  force: boolean
  generatorMap: Map<string, IEchoorcConfig>
  currentGenerator: IEchoorcConfig
  actionsResult: any[]
}

/**
 * action 中的类型
 */
interface IActionsResult {
  type: 'add' | 'append' | 'modify'
  path: string
  templateFile: string
  data?: Record<string, string>
}

export { IEchoorcConfig, IOptionsConfig, IConfigMap, IActionsResult }
