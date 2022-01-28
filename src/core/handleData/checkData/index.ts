import { logError } from '../../../base/chalk/index.js'
import { IActionAdd, IActionAppend } from '../../../types/index.js'

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
        isEmpty: !target.hasOwnProperty('path'),
        msg: `出错的 Generator 名为 ${name}, path 字段必须存在`
      }
    ],
    [
      'templatePath',
      {
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
    target.hasOwnProperty('type') &&
    target.type === 'append' &&
    !target.hasOwnProperty('pattern')
  ) {
    logError(
      `出错的 Generator 名为 ${name}, 当 type 为 append 时, 必须存在 pattern 字段`
    )
    flag = true
  }

  return flag
}

export { publicCheck }
