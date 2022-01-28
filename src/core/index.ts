import { IActionsResult, IConfigMap, IEchoorcConfig } from '../types/index.js'
import { selectGenerator } from './dispatch/index.js'
import { generateTemplate } from './generateTemplate/index.js'
import { handleData } from './handleData/index.js'
import { getConfigInfo, setGenerator } from './initConfig/index.js'
import { TypedMap } from '../base/index.js'
import { getConfigFilePath } from './getConfigFilePath/index.js'

const currentGenerator: IEchoorcConfig = {
  name: '',
  description: '',
  prompts: [],
  actions: []
}

const configMap: TypedMap<IConfigMap> = new TypedMap({
  echoorcFilePath: '',
  generatorsMap: new Map() as Map<string, IEchoorcConfig>,
  currentGenerator: currentGenerator,
  actionsResult: [] as IActionsResult[]
})

const externalEchooAPI = {
  setGenerator
}

const effectEchooAPI = {
  getConfigFilePath,
  setGenerator,
  getConfigInfo,
  selectGenerator,
  handleData,
  generateTemplate
}

export {
  externalEchooAPI,
  effectEchooAPI,
  configMap
}
