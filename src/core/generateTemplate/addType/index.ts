import fs from 'fs'
import ps from 'path'

const addType = function (
  path: string,
  resultString: string,
  isCreate: string | boolean | undefined
): void {
  // 当 isCreate => 'false' | false | 空字符时, 不进行渲染
  if (
    (typeof isCreate === 'boolean' && !isCreate) ||
    isCreate === '' ||
    isCreate === 'false'
  ) {
    return
  }

  fs.mkdirSync(ps.dirname(path), { recursive: true })
  fs.writeFileSync(path, resultString)
}

export { addType }
