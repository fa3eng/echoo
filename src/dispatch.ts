const gen = function (optionsConfig: IOptionsConfig): void {
  const {
    force = false,
    externalTemplates = false,
    configurationPath = ''
  } = optionsConfig

  console.log(force, externalTemplates, configurationPath)
}

export { gen }
