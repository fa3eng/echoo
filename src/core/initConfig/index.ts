import { IEchoorcConfig } from '../../types/actionType'
import { externalEchooAPI, echooAPI } from '../index'

type TypeGenerator = (configuration: typeof externalEchooAPI) => void

/**
 * 引入配置文件, 并且使用引入的函数 运行 externalEchooAPI 获取生成器
 * @param echoorcFilePath
 */
const generatorFuncEffect = function (echoorcFilePath: string): void {
  if (echoorcFilePath === '') {
    console.error('路径不合法或者配置文件不存在')
    process.exit(1)
  }

  // 获取到配置文件中的 generator 函数
  const Generator: TypeGenerator = require(echoorcFilePath) // eslint-disable-line

  Generator(externalEchooAPI)
}

/**
 * 设置 generatorMap
 * @param config 从配置文件中获取的配置
 */
const setGeneratorEffect = function (config: IEchoorcConfig): void {
  echooAPI.setGeneratorMap(config.name, config)
}

export { generatorFuncEffect, setGeneratorEffect }
