# echoo

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) ![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)

> 刚毕业的时候整的花活儿，纯玩具

echoo，一个灵活的，可配置的模板生成 CLI 工具。

不同于集成在脚手架中的 CLI，echoo 是一个独立的 CLI 工具，通过简单的配置，你就可以拥有一套自己的模板 CLI 。



1. **内置模板**

echoo 内置了两款基于 [luban](https://1x.luban.fun/document/) 的 React 模板。你可以直接在一个基于 luban 的项目中使用 echoo。

[![HNe0xS.gif](https://s4.ax1x.com/2022/02/10/HNe0xS.gif)](https://imgtu.com/i/HNe0xS)

[![HNn2cT.gif](https://s4.ax1x.com/2022/02/10/HNn2cT.gif)](https://imgtu.com/i/HNn2cT)

2. **灵活配置**

不同的项目对于模板有着不同的要求，echoo 最核心的功能实际上是提供一个工具，让开发者可以通过自己编写配置文件，开发出符合自己的模板。

```shell
# setup echoo
ech init
```

echoo 将会在 `process.cwd()` 目录中生成以下文件

```shell
+ cwd/echoorc.js
+ cwd/echoo
+ cwd/echoo/component.art
```

通过 `init` 命令，你可以快速搭建 echoo 的配置环境

[![HtRk3n.gif](https://s4.ax1x.com/2022/02/10/HtRk3n.gif)](https://imgtu.com/i/HtRk3n)



## 使用

> 目前不在 npm 中，需要在本地通过 npm link 使用。
> 请在 macOS 环境下使用。

1. clone 仓库

```shell
git clone https://github.com/meakle/echoo.git
```

2. 打开仓库
3. 运行 npm 脚本

```shell
npm start
```

4. 开始使用 echoo

```
Usage: ech [options] [command]

Options:
  -e, --external-templates         Using external templates
  -p, --configuration-path <path>  Specifies the absolute path to the configuration file
  -V, --version                    output the version number
  -h, --help                       display help for command

Commands:
  gen                              Generating a template file
  init                             quick setup echoo
  help [command]                   display help for command
```

## 自定义模板

echoo 分为两部分

* 配置文件
* 模板代码

开发者通过编写配置文件，抽象出生成代码的逻辑，最后再根据模板代码生成最终的代码

### 配置文件的编写

1. 导出一个名为 `generator` 的函数

2. 函数中参数有一个名为 `gen` ，通过该该参数，注册生成器

```javascript
export function generator (gen) {
	gen({
    // .....
  })
  // 你也可以注册多个生成器
  gen({})
}
```

`gen` 函数中传入一个对象作为参数，该对象必须满足如下类型：

```
{
	name: string
	description： string
	prompts: Array
	actions: Array | () => Array
}
```

* name：生成器的名字
* description：生成器的描述
* prompts：交互式的提问，将收集的答案结合模板代码渲染
* actions：具体的动作，后文会详细说明

> 其中关于 prompts 如何编写你可以查阅 [inquirer](https://www.npmjs.com/package/inquirer) 文档。

此时，我们可以编写这样的配置文件

```js
export function generator (gen) {
  gen({
    name: 'first',
    description: 'first generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],
    actions: data => {
      // ...
      return []
    }
  })
    gen({
    name: 'second',
    description: 'second generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],
    actions: data => {
      // ...
      return []
    }
  })
}
```

此时，运行 echoo，如下图

[![HtbStP.gif](https://s4.ax1x.com/2022/02/10/HtbStP.gif)](https://imgtu.com/i/HtbStP)



### Actions 字段的编写

在编写 actions 之前，我们思考一个问题，通过一个模板文件生成文件的本质是什么？

实际上就是读取**指定位置**的模板文件，然后再将模板文件写入**指定位置**。因此，我们需要以下几个信息：

* 模板文件路径：templatePath
* 指定写入的路径：path

我们的模板文件并不是死的，因此我们还需要有一个 data 作为信息提供给模板文件，再结合模板渲染引擎，渲染出我们需要的模板。因此我们还需要：

* 数据：data

到这里已经具备了大部分必要的条件，但是 echoo 除了提供生成新的模板，还提供在原有的文件上面添加新代码的功能，因此我们还需要：

* 指定其生成类型：type
* 对本次操作的描述：description



**一次操作所必要的属性如下：**

```
action = {
	type: 'add' | 'append'
	description: string
	path: string
	templatePath: string
	data: Object
}
```

现在我们已经将一次对文件的操作抽象成了代码，是不是很简单？



actions 字段接受数组或者一个返回数组的函数。如果选择函数，那么 echoo 将把 prompts 中获取到的数据作为参数传入函数中，提供给用户使用。

```javascript
export function generator (gen) {
  gen({
    name: 'first',
    description: 'first generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      }
    ],
    actions: data => {
      // data 是一个对象，其值是 prompts 收集的回答
      const { name } = data
      const resultList = []
			// 定义一个 action
      const component = {
        type: 'add',
        description: `[add] ${name} component`,
        path: `${name}/index.tsx`,
        templatePath: './echoo/component.art',
        data: {
          componentName: name
        }
      }

      resultList.push(component)

      return resultList
    }
  })
}
```

最后，我们再关注一下 echoo 中是如何处理路径的：

1. `/` 开头 -> 直接判断为绝对路径

2. `./` 开头 -> 相对于配置文件的路径

3. 字符开头 -> 相对于 `cwd` 的路径



### 模板代码

echoo 采用 [art-template](https://aui.github.io/art-template/zh-cn/) 作为模板渲染引擎，对于模板也沿用了 art-template 的模板语法。比如使用上面的例子：

在渲染的时候，data 中的属性将作为值，结合模板传递给 art-template 渲染出最终的代码。

```handlebars
import React, { FC } from "react";

const {{componentName}}: FC = () => {

  return (
    <div>
      <h1>Hello echoo</h1>
    </div>
  );
};

export { {{componentName}} };
```



## 异常处理

* 需要创建的文件已经存在，如何处理？
* 需要新增代码的文件不存在，如何处理？



在出现异常的时候 echoo 将会中断文件的生成，并且抛出问题

**对于文件已经存在的文件**

1. 覆盖
2. 跳过该 action
3. 取消本次命令

**新增代码的文件不存在**

1. 跳过本次 action
2. 取消命令



## 为什么不

1. **为什么不在脚手架中内置模板**

因为不够灵活，随着项目的发展，一个脚手架级别的模板代码大概率不适合项目，而 echoo 本身是独立的，可以在项目中编写配置文件，根据不同的需求变换配置。



2. **为什么不用代码片段（自动补全）**

不在一个层面，echoo 能直接生成文件夹/文件，并且可以在已有的文件中追加内容。而代码片段终究只能一个文件一个文件的操作。并且有很多内部封装的工具并没有现成代码片段。



3. **为什么不用 [Yeoman](https://yeoman.io/)**

它太重了，我只想要模板生成功能



4. **为什么不用 [plop](https://plopjs.com/)**

真诚的说，echoo 的创意和思路来自于 plop。echoo 在一段时间里只是对 plop 的一层 CLI 包装，但是我发现仅仅是封装 plop 其体验并不算好。因此我阅读了 plop 的源码，独立完成了 echoo。



plop 是非常好的，其更加灵活，功能也更加强大。echoo 对比 plop 多了两点功能，一是内置了代码，二是处理了一些异常情况。



## 碎碎念

echoo 是一个试验品，起源于我想学习 node.js，顺带着就了解到了更多新东西。



