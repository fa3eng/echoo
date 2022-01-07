import { IActionsResult, IConfigMap, IEchoorcConfig } from '../types'
import { createDispatchPrompt } from './dispatch'
import { getConfigFilePathEffect } from './getConfigFilePath'
import { handleData } from './handleData'
import { generatorFuncEffect, setGeneratorEffect } from './initConfig'
import { TypedMap } from '../base'

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
  handleData
}

export {
  externalEchooAPI,
  effectEchooAPI,
  configMap
}
