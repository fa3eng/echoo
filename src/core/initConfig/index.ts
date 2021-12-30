import { externalEchooAPI, echooAPI } from '../index'

type TypeGenerator = (configuration: typeof externalEchooAPI) => void

const generatorFuncEffect = function (echoorcFilePath: string): void {
  if (echoorcFilePath === '') {
    console.error('路径不合法或者配置文件不存在')
    process.exit(1)
  }

  // 获取到配置文件中的 generator 函数
  const Generator: TypeGenerator = require(echoorcFilePath) // eslint-disable-line

  Generator(externalEchooAPI)
}

const setGeneratorEffect = function (generatorName: string, config: any): void {
  echooAPI.setGeneratorMap(generatorName, config)
}

export { generatorFuncEffect, setGeneratorEffect }
