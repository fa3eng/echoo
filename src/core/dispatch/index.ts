// 分发工具, 通过 generator 显示出对应的值
import { configMap } from '..'
import { createListPrompt } from '../../base'
import { IEchoorcConfig } from '../../types'

/**
 * 创建 generator 分发页面, 并且将获得的数据存储到数据中
 * @param generatorMap 生成器映射表
 */
const createDispatchPrompt = async function (
  generatorMap: Map<string, IEchoorcConfig>
): Promise<any> {
  const selectGeneratorName = await createListPrompt({
    type: 'list',
    name: 'generatorName',
    message: '选择你想要使用的生成器',
    choices: [...generatorMap.keys()]
  })

  const generatorMaps = configMap.get('generatorMap')
  const currentGenerator = generatorMaps.get(selectGeneratorName.generatorName)

  if (currentGenerator == null) {
    console.error('没有找到对应 generator')
    process.exit(1)
  }

  configMap.set('currentGenerator', currentGenerator)
}

export { createDispatchPrompt }
