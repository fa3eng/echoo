import { QuestionCollection, Answers } from 'inquirer'

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

export { IEchoorcConfig }
