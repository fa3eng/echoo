import template from 'art-template'
import fs from 'fs'
import { configMap } from '..'

const generateTemplate = function (): any {
  const actionList = configMap.get('actionsResult')

  actionList.forEach((item) => {
    const { data, type, templatePath, path } = item

    // 将在这一层, 通过给定的数据渲染模板,因此数据处理工作不在这一层完成
    // 这里将会出现合法性检查 主要针对于路径的合法性问题
    // path 作为生成路径, 进行路径检查, 查看该路径是否合法
    console.log(path, '需要进行合法性检查')
    // templateFile 是模板路径, 检查
    console.log(templatePath, '检查 templateFile 的合法性')
    // 目前不考虑 type , 先实现一个 add type 后面再慢慢添加内容
    // 这里将会存在一个逻辑, 根据不同的 type 调用不同的渲染方法
    console.log(type, '暂时只实现一个 add 逻辑')

    // 如果没有本次 action 没有 data 需要渲染, 那么直接渲染
    if (data == null) {
      const resultString = fs.readFileSync(templatePath).toString()
      console.log(resultString)
      return
    }

    const resultString = template(templatePath, data)
    console.log(resultString)
  })
}

export { generateTemplate }
