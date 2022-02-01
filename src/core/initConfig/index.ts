import { IEchoorcConfig } from '../../types/index.js'
import { externalEchooAPI, configMap } from '../index.js'
import { checkConfig } from './checkError/index.js'

const getConfigInfo = async function (echoorcFilePath: string): Promise<void> {
  if (echoorcFilePath === '') {
    console.error('路径不合法或者配置文件不存在')
    process.exit(1)
  }

  const { generator } = await import(echoorcFilePath)

  /**
   * 这里是关键逻辑
   * echoo 约定配置文件中必须要导出一个名为 generator 的函数
   * 该函数有两个参数 setGenerator 和 externalEchooAPI
   * echoo 会通过调用 setGenerator 函数获取用户传达的配置
   */
  generator(externalEchooAPI.setGenerator, externalEchooAPI)
}

const setGenerator = function (config: IEchoorcConfig): void {
  const generatorsMap = configMap.get('generatorsMap')
  checkConfig(config)
  generatorsMap.set(config.name, config)
}

export { getConfigInfo, setGenerator }
