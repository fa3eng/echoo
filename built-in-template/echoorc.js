const COMPONENT_PATH = 'page'

module.exports = function generator (plop) {
  plop.setGenerator('init',
    {
      description: '创建 component',
      prompts: [
        {
          type: 'input',
          name: 'componentName',
          message: '请输入组件文件夹名称'
        },
        {
          type: 'confirm',
          name: 'isCss',
          default: true,
          message: '是否需要创建样式文件'
        }
      ],
      actions: (data) => {
        const { componentName, isCss } = data

        const actions = ['hello world']
        const path = `src/${COMPONENT_PATH}/${componentName}`

        if (componentName) {
          actions.push({
            type: 'add',
            path: `${path}/${componentName}.tsx`,
            templateFile: './template/component/index.hbs',
            data: {
              name: componentName
            }
          })
        }

        if (isCss) {
          actions.push({
            type: 'add',
            path: `${path}/${componentName}.less`,
            templateFile: './template/component/style.hbs'
          })
        }

        return actions
      }
    })
}
