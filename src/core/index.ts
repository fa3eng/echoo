// 核心逻辑
// 1. 找到配置文件的路径
// 1.1 内置 直接写
// 1.2 非内置 找一下
import { getConfigFilePathEffect } from './getConfigFilePath'
import { generatorFuncEffect, setGeneratorEffect } from './initConfig'

const configurationCenter = {
  generatorMap: new Map() as Map<string, Object>,
  setGenerator: setGeneratorEffect,
  echoorcFilePath: ''
}

export {
  configurationCenter,
  getConfigFilePathEffect,
  setGeneratorEffect,
  generatorFuncEffect
}
