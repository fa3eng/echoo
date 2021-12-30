import { getConfigFilePathEffect } from './getConfigFilePath'
import { generatorFuncEffect, setGeneratorEffect } from './initConfig'

// #region core 中存储着 plop 的各项配置
let echoorcFilePath = ''
const generatorMap = new Map() as Map<string, Object>
// #endregion

// #region 各项配置的存取函数
const getEchoorcFilePath = function (): string {
  return echoorcFilePath
}

const setEchoorcFilePath = function (path: string): string {
  echoorcFilePath = path
  return echoorcFilePath
}

const getGeneratorMap = function (): Map<String, Object> {
  return generatorMap
}

const setGeneratorMap = function (key: string, value: Object): Map<string, Object> {
  const genMap = generatorMap.set(key, value)
  return genMap
}

// #endregion

const echooAPI = {
  setEchoorcFilePath,
  getEchoorcFilePath,
  getGeneratorMap,
  setGeneratorMap
}

const externalEchooAPI = {
  setGenerator: setGeneratorEffect
}

export {
  echooAPI,
  externalEchooAPI,
  getConfigFilePathEffect,
  setGeneratorEffect,
  generatorFuncEffect
}
