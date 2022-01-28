import { configMap } from '../index.js'
import { IActionsResult, IEchoorcConfig } from '../../types/index.js'
import { getDataByPrompt } from './getDataByPrompt/index.js'
import { handlePath } from './handlePath/index.js'
import { render } from './renderString/index.js'
import { publicCheck } from './checkData/index.js'
import { logError } from '../../base/chalk/index.js'

const handleData = async function (
  currentGenerator: IEchoorcConfig
): Promise<any> {
  const data = await getDataByPrompt(currentGenerator)

  const { name, actions } = currentGenerator

  // action 的值存在两种情况
  // 1. 返回值是一个数组的函数 2. 数组
  // 如果是数组, 那么我们直接使用就可以了, 如果是函数, 那么我们运行函数, 返回数组
  const actionsArray = Array.isArray(actions)
    ? actions
    : actions(data)

  if (!Array.isArray(actionsArray)) {
    logError(`出错的 Generator 名为 ${name}\n
    请确保 actions 是一个数组或者是一个返回值为数组的函数`)
  }
  // 对每一个actions 进行检查
  for (const item of actionsArray) {
    const isError = publicCheck(name, item)
    if (isError) process.exit(1)
  }

  const renderString = render(JSON.stringify(actionsArray), data)

  // 处理路径数据
  const actionList = JSON.parse(renderString) as IActionsResult[]

  const actionResult = handlePath(actionList)

  configMap.set('actionsResult', actionResult)
}

export { handleData }
