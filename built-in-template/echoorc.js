const COMPONENT_PATH = 'page'

module.exports = function generator (echoo) {
  echoo.setGenerator(
    {
      name: 'init',
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
      actions: [
        {
          type: 'add',
          path: 'example/src/page/{{componentName}}/{{componentName}}.tsx',
          templatePath: './template/component/index.art',
          force: false,
          isCreate: '{{componentName}}',
          data: {
            componentName: '{{ componentName }}'
          }
        },
        {
          type: 'add',
          path: 'example/src/page/{{componentName}}/{{componentName}}.less',
          templatePath: './template/component/style.art',
          isCreate: '{{isCss}}'
        },
        {
          type: 'append',
          pattern: '/(?<=@echoo-router-import\n)/',
          path: 'example/src/router/config.ts',
          templatePath: './template/router/import.art',
          data: {
            componentName: '{{ componentName }}'
          }
        },
        {
          type: 'append',
          pattern: '/(?<=@echoo-router-config\n)/',
          path: 'example/src/router/config.ts',
          templatePath: './template/router/config.art',
          data: {
            componentName: '{{ componentName }}'
          }
        }
      ]
    })
  echoo.setGenerator(
    {
      name: 'test',
      description: '测试组件',
      prompts: [
        {
          type: 'input',
          name: 'componentName',
          message: '请输入组件文件夹名称 test'
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
        const path = `src/${COMPONENT_PATH}/{{componentName}}`

        if (componentName) {
          actions.push({
            type: 'add',
            path: `${path}/{{componentName}}.tsx`,
            templatePath: './template/component/index.art',
            data: {
              componentName: '{{ componentName }}'
            }
          })
        }

        if (isCss) {
          actions.push({
            type: 'add',
            path: `${path}/${componentName}.less`,
            templatePath: './template/component/style.art'
          })
        }

        return actions
      }
    })
}
