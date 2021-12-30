import { configurationCenter } from '../index'

type TypeGenerator = (configuration: typeof configurationCenter) => void

function generatorFuncEffect (echoorcFilePath: string): void {
  if (echoorcFilePath === '') {
    console.error('路径不合法或者配置文件不存在')
    process.exit(1)
  }

  // 获取到配置文件中的 generator 函数
  const Generator: TypeGenerator = require(echoorcFilePath) // eslint-disable-line

  Generator(configurationCenter)
}

const setGeneratorEffect = function (generatorName: string, config: any): void {
  configurationCenter.generatorMap.set(generatorName, config)
}

// module.exports = func
export { generatorFuncEffect, setGeneratorEffect }
