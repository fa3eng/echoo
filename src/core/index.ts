// 核心逻辑
// 1. 找到配置文件的路径
// 1.1 内置 直接写
// 1.2 非内置 找一下
import { getConfigFilePathEffect } from './getConfigFilePath'

const configurationCenter = {
  echoorcFilePath: ''
}

export {
  configurationCenter,
  getConfigFilePathEffect
}
