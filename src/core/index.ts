import { IEchoorcConfig } from '../types/actionType'
import { createDispatchPrompt } from './dispatch'
import { getConfigFilePathEffect } from './getConfigFilePath'
import { handleData } from './handleData'
import { generatorFuncEffect, setGeneratorEffect } from './initConfig'

// #region core 中存储着 plop 的各项配置
let echoorcFilePath = ''
let force = false
const generatorMap = new Map() as Map<string, IEchoorcConfig>

let currentGenerator: IEchoorcConfig = {
  name: '',
  description: '',
  prompts: [],
  actions: []
}

let actionsResult: any[] = []

// #endregion

// #region 各项配置的存取函数
const getForce = function (): boolean {
  return force
}

const setForce = function (f: boolean): boolean {
  force = f
  return force
}

const getEchoorcFilePath = function (): string {
  return echoorcFilePath
}

const setEchoorcFilePath = function (path: string): string {
  echoorcFilePath = path
  return echoorcFilePath
}

const getGeneratorMap = function (): Map<string, IEchoorcConfig> {
  return generatorMap
}

const setGeneratorMap = function (key: string, value: IEchoorcConfig): Map<string, IEchoorcConfig> {
  const genMap = generatorMap.set(key, value)
  return genMap
}

const getCurrentGenerator = function (): IEchoorcConfig {
  return currentGenerator
}

const setCurrentGenerator = function (generatorName: string): IEchoorcConfig {
  if (generatorMap.get(generatorName) == null) {
    console.error('没有找到对应 generator')
    process.exit(1)
  }

  currentGenerator = generatorMap.get(generatorName) as IEchoorcConfig
  return currentGenerator
}

const getActionsResult = function (): any[] {
  return actionsResult
}

const setActionsResult = function (arr: any): any {
  actionsResult = arr
  return actionsResult
}

// #endregion

const echooAPI = {
  getForce,
  setForce,
  setEchoorcFilePath,
  getEchoorcFilePath,
  getGeneratorMap,
  setGeneratorMap,
  getCurrentGenerator,
  setCurrentGenerator,
  getActionsResult,
  setActionsResult
}

const externalEchooAPI = {
  setGenerator: setGeneratorEffect
}

const effectEchooAPI = {
  getConfigFilePathEffect,
  setGeneratorEffect,
  generatorFuncEffect,
  createDispatchPrompt,
  handleData
}

export {
  echooAPI,
  externalEchooAPI,
  effectEchooAPI
}
