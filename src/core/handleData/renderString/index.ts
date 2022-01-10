import { Answers } from 'inquirer'

/** 一个简单的模板引擎
 *
 * @param template 需要渲染的模板
 * @param data 需要渲染的数据
 * @returns 字符串, 渲染好的模板字符串
 */
const render = function render (template: string, data: Answers): string {
  const reg = /[{]{2}(\s?\w+\s?)[}]{2}/

  if (reg.test(template)) { // 判断模板里是否有模板字符串
    // @ts-expect-error
    const name = reg.exec(template)[1].trim()

    template = template.replace(reg, data[name])

    return render(template, data)
  }

  return template // 如果模板没有模板字符串直接返回
}

export { render }
