import { IEchoorcConfig } from '../types/actionType'
import { createDispatchPrompt } from './dispatch'
import { getConfigFilePathEffect } from './getConfigFilePath'
import { handleData } from './handleData'
import { generatorFuncEffect, setGeneratorEffect } from './initConfig'

const currentGenerator: IEchoorcConfig = {
  name: '',
  description: '',
  prompts: [],
  actions: []
}

const configMap = new Map<string, any>([
  ['echoorcFilePath', ''],
  ['force', false],
  ['generatorMap', new Map() as Map<string, IEchoorcConfig>],
  ['currentGenerator', currentGenerator],
  ['actionsResult', []]
])

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
