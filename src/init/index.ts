import fs from 'fs'
import ps, { dirname } from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname_ = dirname(filename)

const exportFile = (): void => {
  // 1. 确认导出路径
  const exportPath = process.cwd()
  const rcPath = ps.resolve(exportPath, 'echoorc.js')
  const templatePath = ps.resolve(exportPath, 'echoo', 'component.art')

  const { rcContent, tmpContent } = readContent()

  // 2. 创建文件
  fs.writeFileSync(rcPath, rcContent)

  fs.mkdirSync(ps.dirname(templatePath), { recursive: true })
  fs.writeFileSync(templatePath, tmpContent)
}

const readContent = (): Record<string, Buffer> => {
  const rcPath = ps.resolve(dirname_, '../../', 'built-in-template/cli/echoorc')
  const templatePath = ps.resolve(dirname_, '../../', 'built-in-template/cli/component.art')

  return {
    rcContent: fs.readFileSync(rcPath),
    tmpContent: fs.readFileSync(templatePath)
  }
}

export { exportFile, readContent }
