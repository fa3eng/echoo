import { configMap } from '../index.js'
import { IEchoorcConfig } from '../../types/index.js'
import { handlePath } from './handlePath/index.js'
import { checkData } from './checkData/index.js'
import { createListPrompt } from '../../base/index.js'

const handleData = async function (
  currentGenerator: IEchoorcConfig
): Promise<any> {
  const data = await createListPrompt(currentGenerator.prompts)

  const { name, actions } = currentGenerator

  // action 的值存在两种情况 1. 返回值是一个数组的函数 2. 数组
  const actionsArray = Array.isArray(actions) ? actions : actions(data)

  checkData(actionsArray, name)

  const actionResult = handlePath(actionsArray)

  configMap.set('actionList', actionResult)
}

export { handleData }
