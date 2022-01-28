import inquirer from 'inquirer'
import { logError } from '../chalk/index.js'

async function createListPrompt (
  questionCollection: inquirer.QuestionCollection<inquirer.Answers>
): Promise<inquirer.Answers> {
  return await new Promise((resolve, reject) => {
    inquirer
      .prompt(questionCollection)
      .then((value: any) => {
        resolve(value)
      })
      .catch(err => {
        logError('inquirer 出现问题, 请检查配置文件')
        logError(err)
        process.exit(1)
      })
  })
}

export { createListPrompt }
