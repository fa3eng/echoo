// 通过 generator 生成对应的 prompt

import inquirer from 'inquirer'
import { createListPrompt } from '../../../base'
import { IEchoorcConfig } from '../../../types'

/**
 * 收集 prompt 收集到的数据
 * @param currentGenerator 当前的生成器
 * @returns promise 存储这 prompt 中收集到的数据
 */
const getDataByPrompt = async function (currentGenerator: IEchoorcConfig): Promise<inquirer.Answers> {
  return await createListPrompt(currentGenerator.prompts)
}

export { getDataByPrompt }
