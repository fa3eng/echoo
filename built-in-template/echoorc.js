export function generator (gen) {
  gen({
    name: '[luban](project root) 创建新路由',
    description: '创建新路由, 并引入相关页面',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: '请输入页面文件夹名称'
      },
      {
        type: 'confirm',
        name: 'isRematch',
        default: true,
        message: '是否引入rematch'
      }
    ],
    actions: data => {
      const { componentName, isRematch } = data
      const actionsList = []
      const basePath = `src/views/${componentName}`

      if(!componentName) {
        throw Error('componentName的值不能为空')
      }

      const createComponent = {
        type: 'add',
        description: '[add] 新增模块',
        path: `${basePath}/index.tsx`,
        templatePath: './template/component/index.art',
        data: {
          componentName,
          isRematch
        }
      }

      const createStyle = {
        type: 'add',
        description: '[add] 新增模块样式',
        path: `${basePath}/style.less`,
        templatePath: './template/component/style.art'
      }

      const appendImport = {
        type: 'append',
        description: '[append] 添加路由 import 信息',
        pattern: '@echoo-router-import',
        path: 'src/route/config.ts',
        templatePath: './template/router/import.art',
        data: {
          componentName: componentName
        }
      }

      const appendRouter = {
        type: 'append',
        description: '[append] 添加路由 config 信息',
        pattern: /(?<=@echoo-router-config\n)/,
        path: 'src/route/config.ts',
        templatePath: './template/router/config.art',
        data: {
          componentName: componentName
        }
      }

      // 引入 rematch
      // 1. 生成 slice 文件
      const slicePath = 'src/models/'
      const modelPath = 'src/models/index.ts'
      const createSlice = {
        type: 'add',
        description: '[add] 新增模块 rematch slice',
        path: `${slicePath}/${componentName}.ts`,
        templatePath: './template/rematch/slice.art',
        data: {
          componentName
        }
      }

      const appendSliceImport = {
        type: 'append',
        description: '[append] 添加模块 rematch import 信息',
        pattern: /(?<=@echoo-rematch-import\n)/,
        path: modelPath,
        templatePath: './template/rematch/import.art',
        data: {
          componentName: componentName
        }
      }

      const appendSliceType = {
        type: 'append',
        description: '[append] 添加模块 rematch type 信息',
        pattern: /(?<=@echoo-rematch-type\n)/,
        path: modelPath,
        templatePath: './template/rematch/type.art',
        data: {
          componentName: componentName
        }
      }

      const appendSliceExport = {
        type: 'append',
        description: '[append] 添加模块 rematch export 信息',
        pattern: /(?<=@echoo-rematch-export\n)/,
        path: modelPath,
        templatePath: './template/rematch/export.art',
        data: {
          componentName: componentName
        }
      }

      actionsList.push(createComponent)
      actionsList.push(createStyle)
      actionsList.push(appendRouter, appendImport)
      
      if (isRematch) {
        actionsList.push(
          createSlice,
          appendSliceImport,
          appendSliceType,
          appendSliceExport
        )
      }
      return actionsList
    }
  })
  gen({
    name: '[luban](cwd) 创建一个模块',
    description: '在cwd创建一个模块',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: '请输入模块文件夹名称'
      },
      {
        type: 'input',
        name: 'childrenNames',
        message: '请输入子模块名称, 可以通过空格分隔多个子模块'
      }
    ],
    actions: data => {
      const { moduleName, childrenNames } = data

      const actionsList = []
      const basePath = `${process.cwd()}/${moduleName}`

      // 分割 childrenNames
      const childrenNameList = childrenNames.split(' ')

      const createComponent = {
        type: 'add',
        description: `[add] 生成新模块 ${moduleName}.tsx`,
        path: `/${basePath}/index.tsx`,
        templatePath: './template/module/index.art',
        data: {
          childrenNameList,
          moduleName
        }
      }

      const createStyle = {
        type: 'add',
        description: `[add] 生成新模块 ${moduleName}.less`,
        path: `/${basePath}/style.less`,
        templatePath: './template/module/style.art'
      }

      actionsList.push(createComponent, createStyle)

      for (const childrenName of childrenNameList) {
        actionsList.push(
          {
            type: 'add',
            description: `[add] 生成新模块的子模块 ${childrenName}.tsx`,
            path: `/${basePath}/${childrenName}/index.tsx`,
            templatePath: './template/module/children.art',
            data: {
              childrenName
            }
          },
          {
            type: 'add',
            description: `[add] 生成新模块的子模块 ${childrenName}.less`,
            path: `/${basePath}/${childrenName}/style.less`,
            templatePath: './template/module/childrenStyle.art'
          }
        )
      }

      return actionsList
    }
  })
}
