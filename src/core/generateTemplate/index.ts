import template from 'art-template'
import fs from 'fs'
import { configMap } from '..'
import { addType } from './addType'
import { appendType } from './appendType'

const generateTemplate = function (): any {
  const actionList = configMap.get('actionsResult')

  actionList.forEach(item => {
    const { data, type, templatePath, path, isCreate, pattern } = item

    // TODO 检查操作合法性
    if (type === 'add') {
      if (data == null) {
        const resultString = fs.readFileSync(templatePath).toString()
        addType(path, resultString, isCreate)
        return
      }

      const resultString = template(templatePath, data)
      addType(path, resultString, isCreate)
      return
    }

    if (type === 'append') {
      if (data == null) {
        const resultString = fs.readFileSync(templatePath).toString()
        appendType(path, resultString, pattern, isCreate)
      }

      const resultString = template(templatePath, data)
      appendType(path, resultString, pattern, isCreate)
    }
  })
}

export { generateTemplate }
