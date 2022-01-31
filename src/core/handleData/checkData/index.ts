import { logError } from '../../../base/chalk/index.js'
import { IActionAdd, IActionAppend } from '../../../types/index.js'

const checkData = function (actionsArray: any, name: string): void {
  if (!Array.isArray(actionsArray)) {
    logError(`出错的 Generator 名为 ${name}\n
    请确保 actions 是一个数组或者是一个返回值为数组的函数`)
  }

  // 对每一个actions 进行检查
  for (const item of actionsArray) {
    const isError = publicCheck(name, item)
    if (isError) process.exit(1)
  }
}

const publicCheck = function (
  name: string,
  target: IActionAdd | IActionAppend
): boolean {
  let flag = false
  const errorMap = new Map([
    [
      'type',
      {
        isEmpty: (
          // eslint-disable-next-line no-prototype-builtins
          !target.hasOwnProperty('type') &&
          target.type !== 'add' &&
          target.type !== 'append'
        ),
        msg: `出错的 Generator 名为 ${name}, actions type 必须设置为 add 或者 append`
      }
    ],
    [
      'path',
      {
        // eslint-disable-next-line no-prototype-builtins
        isEmpty: !target.hasOwnProperty('path'),
        msg: `出错的 Generator 名为 ${name}, path 字段必须存在`
      }
    ],
    [
      'templatePath',
      {
        // eslint-disable-next-line no-prototype-builtins
        isEmpty: !target.hasOwnProperty('templatePath'),
        msg: `出错的 Generator 名为 ${name}, templatePath 字段必须存在`
      }
    ]
  ])

  errorMap.forEach((item, key) => {
    if (item.isEmpty) {
      flag = true
      logError(item.msg)
    }
  })

  if (
    // eslint-disable-next-line no-prototype-builtins
    target.hasOwnProperty('type') &&
    target.type === 'append' &&
    // eslint-disable-next-line no-prototype-builtins
    !target.hasOwnProperty('pattern')
  ) {
    logError(
      `出错的 Generator 名为 ${name}, 当 type 为 append 时, 必须存在 pattern 字段`
    )
    flag = true
  }

  return flag
}

export { publicCheck, checkData }
