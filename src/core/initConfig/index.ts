import { logError } from '../../base/chalk/index.js'
import { IEchoorcConfig } from '../../types/index.js'
import { externalEchooAPI, configMap } from '../index.js'

// type TypeGenerator = (configuration: typeof externalEchooAPI) => void

/**
 * 引入配置文件, 并且使用引入的函数 运行 externalEchooAPI 获取生成器
 * @param echoorcFilePath
 */
const generatorFuncEffect = async function (
  echoorcFilePath: string
): Promise<void> {
  if (echoorcFilePath === '') {
    console.error('路径不合法或者配置文件不存在')
    process.exit(1)
  }

  // 获取到配置文件中的 generator 函数
  const { generator } = await import(echoorcFilePath)

  generator(externalEchooAPI)
}

/**
 * 设置 generatorMap
 * @param config 从配置文件中获取的配置
 */
const setGeneratorEffect = function (config: IEchoorcConfig): void {
  const generatorMap = configMap.get('generatorMap')
  checkConfig(config)
  generatorMap.set(config.name, config)
}

/**
 * 检查配置文件中的字段是否有缺失
 * @param config 配置信息
 */
const checkConfig = function (config: any): any {
  const errorMap = new Map([
    ['name', config.name],
    ['description', config.description],
    ['prompts', config.prompts],
    ['actions', config.actions]
  ])

  let flag = false

  errorMap.forEach((value, key) => {
    if (value == null && errorMap.get('name') != null) {
      const name = errorMap.get('name') as 'string'

      logError(
        `配置文件出现错误: \n错误的 Generator 名为: ${name} \n缺少的字段名为 ${key} , 请在配置文件中编写该字段`
      )
      flag = true
    }

    if (value == null) {
      logError(
        `配置文件中的某一个 Generator 缺少 ${key} 字段, 请在配置文件中编写该字段`
      )
      flag = true
    }

    if (key === 'prompts' && !Array.isArray(value)) {
      const name = errorMap.get('name') as 'string'

      logError(
        `配置文件出现错误: \n错误的 Generator 名为: ${name} \n字段 prompts 必须是一个数组 , 请正确编写配置`
      )

      flag = true
    }

    if (key === 'actions' && !(Array.isArray(value) || typeof value === 'function')) {
      const name = errorMap.get('name') as 'string'

      logError(
        `配置文件出现错误: \n错误的 Generator 名为: ${name} \n字段 actions 必须是一个数组或者一个返回数组的函数 , 请正确编写配置`
      )

      flag = true
    }
  })

  if (flag) process.exit(1)
}

export { generatorFuncEffect, setGeneratorEffect }
