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
  description: string
  path: string
  templatePath: string
  data: Record<string, string>
}
export interface IActionAppend {
  type: 'append'
  description: string
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
 * type: action 类型
 * path: 被作用文件的路径
 * template: 模板文件路径
 * data: 数据
 * pattern: 匹配模式
 * isUse: 该 action 是否在被 echoo 调用
 * isFileAlreadyExists: 用于 add action, 用于判断该文件是新创建的还是已经存在的, 作用于 abort 阶段
 * createdPath: 一个新建的文件, 可能其路径也是新创建的, 因此需要记录该路径, 作用于 abort 阶段
 * isForce: 是否在错误处理阶段强制生成了, 作用与 abort 阶段
 */
interface IActionsResult {
  type: 'add' | 'append'
  description: string
  path: string
  templatePath: string
  data?: Record<string, string>
  pattern?: string
  isUse?: boolean
  isFileAlreadyExists?: boolean
  createdPath?: string
  isForce?: boolean
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
