import fs from 'fs'
import ps from 'path'

const appendType = function (
  path: string,
  resultString: string,
  pattern?: string,
  isCreate?: string | boolean
): void {
  // 当 isCreate => 'false' | false | 空字符时, 不进行渲染
  if (
    (typeof isCreate === 'boolean' && !isCreate) ||
    isCreate === '' ||
    isCreate === 'false'
  ) { return }

  if (pattern === undefined) {
    throw Error('pattern 不能为空')
  }

  // 将首位存在'/'那么去掉
  if (pattern[0] === '/') pattern = pattern.slice(1)
  if (pattern[pattern.length - 1] === '/') { pattern = pattern.slice(0, pattern.length - 1) }

  const pattern_ = new RegExp(pattern)

  const fileContent = fs.readFileSync(path).toString()

  // 在添加之前换行, 防止在一个点多次添加的时候, 内容不换行
  const temp = fileContent.replace(pattern_, '\n')
  const resultContent = temp.replace(pattern_, resultString)

  try {
    fs.writeFileSync(path, resultContent)
  } catch {
    fs.mkdirSync(ps.dirname(path), { recursive: true })
    fs.writeFileSync(path, resultContent)
  }
}

export { appendType }
