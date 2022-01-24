import { configMap } from '../index.js'
import { IActionsResult, IEchoorcConfig } from '../../types/index.js'
import { getDataByPrompt } from './getDataByPrompt/index.js'
import { handlePath } from './handlePath/index.js'
import { render } from './renderString/index.js'

const handleData = async function (currentGenerator: IEchoorcConfig): Promise<any> {
  const data = await getDataByPrompt(currentGenerator)

  let actionsArray: typeof currentGenerator.actions

  // action 的值存在两种情况
  // 1. 返回值是一个数组的函数 2. 数组
  // 如果是数组, 那么我们直接使用就可以了, 如果是函数, 那么我们运行函数, 返回数组
  if (Array.isArray(currentGenerator.actions)) {
    actionsArray = currentGenerator.actions
  } else {
    actionsArray = currentGenerator.actions(data)
  }

  const renderString = render(JSON.stringify(actionsArray), data)

  // 处理路径数据
  const actionList = JSON.parse(renderString) as IActionsResult[]

  const actionResult = handlePath(actionList)

  configMap.set('actionsResult', actionResult)
}

export { handleData }
