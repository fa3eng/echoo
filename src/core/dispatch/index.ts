// 分发工具, 通过 generator 显示出对应的值
import { configMap } from '../index.js'
import { createListPrompt } from '../../base/index.js'
import { IEchoorcConfig } from '../../types/index.js'
import { logError } from '../../base/chalk/index.js'

/**
 * 创建 generator 分发页面, 并且将获得的数据存储到数据中
 * @param generatorsMap 生成器映射表
 */
const selectGenerator = async function (
  generatorsMap: Map<string, IEchoorcConfig>
): Promise<any> {
  const selectGeneratorName = await createListPrompt({
    type: 'list',
    name: 'generatorName',
    message: '选择你想要使用的生成器',
    choices: [...generatorsMap.keys()]
  })

  const currentGenerator = generatorsMap.get(selectGeneratorName.generatorName)

  if (currentGenerator == null) {
    logError('没有找到对应 generator')
    process.exit(1)
  }

  configMap.set('currentGenerator', currentGenerator)
}

export { selectGenerator }
