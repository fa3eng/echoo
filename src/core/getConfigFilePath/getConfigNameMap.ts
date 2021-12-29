/** 工厂函数, 用于返回 configNameMap
 *
 * @param configName 配置文件的名字
 * @returns 关于配置文件的Map
 */
const getConfigNameMap = function (configName: string): Map<string, boolean> {
  return new Map([
    [`${configName}.js`, true],
    [`${configName}.ts`, true],
    [`${configName}.json`, true]
  ])
}

export { getConfigNameMap }
