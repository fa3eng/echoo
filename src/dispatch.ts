const gen = function (optionsConfig: IOptionsConfig): void {
  const {
    force = false,
    builtInTemplates = false,
    configurationPath = ''
  } = optionsConfig

  console.log(force, builtInTemplates, configurationPath)
}

export { gen }
