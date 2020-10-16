# Webpack 学习笔记

![这张图太经典](D:\Study\JDR_Blog\docs\Front_End\Webpack\images\webpack.jpg)

​		**webpack** 是一个用于现代 JavaScript 应用程序的***静态模块打包工具***。当 webpack 处理应用程序时，它会在内部构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 *bundle*。在Webpack内部一切皆模块，专注于构建模块化项目。

## 为什么选择Webpack

前端项目构建及工程化的工具不值Webpack，但是我们为什么要选择Webpack，而且人人必会？

这里从两个角度分析

### 面向项目

​		我们开发的项目中包含内容：框架、ES6、Javascript、CSS、HTML、图片等等内容，但是项目的源代码无法直接运行，必须通过转换才可以正常运行。打包转换需要做的工作：

- 代码转换。将ES6转换为Javascript、将LESS转换为CSS。
- 文件优化。压缩Javascript、CSS、HTML，图片压缩转化。
- 代码分割。提取公共代码，将首屏不需要的代码进行异步加载。
- 模块合并。模块化项目中有时需要将模块进行分类合并在一个文件。
- 自动刷新。监听本地源代码变化，自动重新构建、刷新浏览器。
- 代码校验。在代码提交前校验代码是否符合开发规范。能否通过测试、跑通。
- 自动发布。更新代码后，自动构建出线上代码并传输给发布系统。

### 面向工具

​		构建工具多种多样，但是各有特点、优劣。
- Gulp
  - 最大特点是引入流的概念，提供一系列插件处理流，流可以在插件间流转
  - 有点是好用又灵活
  - 问题是需要进行很多配置，无法做到开箱即用
- Fis3
  - 国产货，功能强大，开箱即用。
  - 不再维护，不支持新版的Node.js
- Webpack
  - 专注处理模块化项目，开箱即用，一步到位
  - 强大的Plugin、Loader，使其可以应对各种复杂情况
  - 可扩展性强，社区庞大活跃
  - 满足多样使用场景
  - 缺点是只适用于模块化开发的项目
- Rollup
  - 专注于ES6模块打包，可以针对ES6源码进行Tree Shaking，去除无用代码。
  - 配置和使用简单
  - 生态链不完善，体验不如Webpack
  - 不支持Code Spliting，好处是打包出的代码没有Webpack那段模块的加载、执行和缓存的代码
  - 适用于打包Javascript库，如Vue，因为它打包出的代码更小更快。

## 安装Webpack

- 首先创建一个文件目录，初始化 npm init，然后 [在本地安装 webpack](https://webpack.docschina.org/guides/installation#local-installation)，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：

```js
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

- 根目录下新建一个webpack.config.js文件，Webpack在执行构建时默认会从这个文件中读取配置

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

接下来我们就能继续搞事情了。

## 使用Webpack

### Webpack核心概念

- **Entry：入口**。Webpack执行构建的第一步将从Entry开始。
- Module：模块。在Webpack里一切皆是模块，一个模块对应一个文件。Webpack会从配置的Entry开始递归找出所有依赖的模块。本文的第一张图象形的展示了这个过程（官网的更形象🙊）
- **Chunk：代码块**。一个Chunk由多个模块组合而成，用于代码合并和分割。
- **Loader：模块转换器**。用于将模块的原内容按照需求转换成新内容。
- **Plugin：扩展插件**。在Webpack构建流程中的特定时机（生命周期钩子）注入扩展逻辑，来改变构建结果或做我们想做的事情。
- **Output：输出结果**。在Webpack经过一系列处理并得出最终想要的代码后输出的结果。





参考文献：

- ⭐[Webpack官方文档](https://webpack.docschina.org/concepts/)
- 《深入浅出Webpack》

