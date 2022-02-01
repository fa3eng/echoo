import { ActionsListItem, IEchoorcConfig } from '../types/index.js'
import { selectGenerator } from './dispatch/index.js'
import { generateTemplate } from './generateTemplate/index.js'
import { handleData } from './handleData/index.js'
import { getConfigInfo, setGenerator } from './initConfig/index.js'
import { TypedMap } from '../base/index.js'
import { getConfigFilePath } from './getConfigFilePath/index.js'

interface IConfigMap {
  echoorcFilePath: string
  generatorsMap: Map<string, IEchoorcConfig>
  currentGenerator: IEchoorcConfig
  actionList: ActionsListItem[]
}

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
  actionList: [] as ActionsListItem[]
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

export { externalEchooAPI, effectEchooAPI, configMap }
