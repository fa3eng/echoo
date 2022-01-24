import { IActionsResult, IConfigMap, IEchoorcConfig } from '../types/index.js'
import { createDispatchPrompt } from './dispatch/index.js'
import { generateTemplate } from './generateTemplate/index.js'
import { getConfigFilePathEffect } from './getConfigFilePath/index.js'
import { handleData } from './handleData/index.js'
import { generatorFuncEffect, setGeneratorEffect } from './initConfig/index.js'
import { TypedMap } from '../base/index.js'

const currentGenerator: IEchoorcConfig = {
  name: '',
  description: '',
  prompts: [],
  actions: []
}

const configMap: TypedMap<IConfigMap> = new TypedMap({
  echoorcFilePath: '',
  force: false,
  generatorMap: new Map() as Map<string, IEchoorcConfig>,
  currentGenerator: currentGenerator,
  actionsResult: [] as IActionsResult[]
})

const externalEchooAPI = {
  setGenerator: setGeneratorEffect
}

const effectEchooAPI = {
  getConfigFilePathEffect,
  setGeneratorEffect,
  generatorFuncEffect,
  createDispatchPrompt,
  handleData,
  generateTemplate
}

export {
  externalEchooAPI,
  effectEchooAPI,
  configMap
}
