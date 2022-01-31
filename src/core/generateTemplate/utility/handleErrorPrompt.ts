import { createListPrompt } from '../../../base/index.js'
import { IActionsResult } from '../../../types/index.js'
import { makeErrorMessage } from './makeMessage.js'

/**
 * 开启提问器, 解决异常
 * @param type
 * @param item
 * @returns
 */
async function handleErrorPrompt (type: 'add' | 'append', item: IActionsResult): Promise<any> {
  const choices = [
    {
      name: '取消命令 (此前的操作将会全部复原)',
      value: 'abort'
    },
    {
      name: '跳过本次 action (后续的 actions 将会执行)',
      value: 'skip'
    }
  ]

  if (type === 'add') {
    choices.push(
      {
        name: '强制生成 (会覆盖原来的原本文件的内容, 请考虑清楚)',
        value: 'force'
      })
  }

  const { choicesResult } = await createListPrompt({
    type: 'list',
    name: 'choicesResult',
    message: makeErrorMessage(type, item),
    choices
  })

  return choicesResult
}

export { handleErrorPrompt }
