// 通过 generator 生成对应的 prompt

import inquirer from 'inquirer'
import { createListPrompt } from '../../../base'
import { IEchoorcConfig } from '../../../types/actionType'

const getDataByPrompt = async function (currentGenerator: IEchoorcConfig): Promise<inquirer.Answers> {
  return await createListPrompt(currentGenerator.prompts)
}

export { getDataByPrompt }
