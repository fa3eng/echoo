import { logError } from '../../base/chalk/index.js'
import { IEchoorcConfig } from '../../types/index.js'
import { externalEchooAPI, configMap } from '../index.js'

// type TypeGenerator = (configuration: typeof externalEchooAPI) => void

/**
 * 引入配置文件, 并且使用引入的函数 运行 externalEchooAPI 获取生成器
 * @param echoorcFilePath
 */
const generatorFuncEffect = async function (echoorcFilePath: string): Promise<void> {
  if (echoorcFilePath === '') {
    console.error('路径不合法或者配置文件不存在')
    process.exit(1)
  }

  // 获取到配置文件中的 generator 函数
  const { generator } = await import(echoorcFilePath)

  generator(externalEchooAPI)
}

const checkConfig = function (config: any): any {
  const errorMap = new Map([
    ['name', config.name],
    ['description', config.description],
    ['prompts', config.prompts],
    ['actions', config.actions]
  ])

  errorMap.forEach((value, key) => {
    if (value == null && errorMap.get('name') != null) {
      const name = errorMap.get('name') as 'string'

      logError(`配置文件中名为 ${name} 的 Generator 缺少 ${key} 字段, 请在配置文件中编写该字段`)
      process.exit(1)
    }

    if (value == null) {
      logError(`配置文件中的某一个 Generator 缺少 ${key} 字段, 请在配置文件中编写该字段`)
      process.exit(1)
    }
  })
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

export { generatorFuncEffect, setGeneratorEffect }
