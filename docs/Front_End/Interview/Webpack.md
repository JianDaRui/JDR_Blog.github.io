# Webpack



为什么需要构建工具？

- 转换ES6语法
- 转换JSX
- CSS前缀补全/预处理
- 压缩混淆
- 图片压缩

前端构建演变之路

ant+YUI Tool =》 Grunt =》fis3/Glup =》Rollup/ Webpack/ Parcel

为什么选择Webpack?

- 社区生态丰富活跃
- 配置灵活和插件化扩展
- 官方更新迭代速度快

Webpack配置文件名称

- 核心概念
  - enry
  - output
  - loaders
  - plugins
  - mode
- 解析CSS、Less和Sass

- [热更新的原理分析](https://juejin.cn/post/6844904008432222215)
- 什么是文件指纹=》缓存
- 文件监听
- 解析图片和字体
- 解析ES6和JSX
- 文件指纹策略，chunkhash、contenthash
- HTML、CSS、和Javascript代码压缩
- 自动清理构建目标产物
- postCss插件antoprefixer自动补足前缀
- 移动端CSS px转rem =》px2rem-loader
- 静态资源内联 =》raw-loader

  - 代码层面

    - 页面框架的初始化脚本
    - 上报相关打点
    - css内联避免页面闪动

  - 请求层面：减少HTTP网络请求数

    - 小图片或者字体内联 =》url-loader
- 多页面应用打包通用方案 =》 npm glob =》glob.sync()
- 使用source map
  - 定位到源码
  - 开发环境开启，线上环境关闭
- SplitChunksPlugin进行公共脚本分离
- Tree-Sharking的使用和原理分析
- Scope Hoisting使用和原理分析
- 代码分割和动态import
- 指定团队的ESLint规范



```js
const fs = require('fs')
const path = require('path')
const { default: traverse } = require('@babel/traverse')
const { transformFromAstSync } = require('@babel/core')
const { parse } = require('@babel/parser')

// 解析文件
function resolveFile (filePath) {
  // 获取内容
  let content = fs.readFileSync(filePath, 'utf-8')
  // 生成 AST
  let ast = parse(content, { sourceType: 'module' })
  // 寻找依赖
  let dep = []
  traverse(ast, {
    // 获取 import 依赖
    // 如 `import foo from './foo.js'`
    // 则 `node.source.value === './foo.js'`
    ImportDeclaration({ node }) {
      dep.push(node.source.value)
    }
  })
  // ES6 编译成 ES5
  let { code } = transformFromAstSync(ast, null, { presets: ['@babel/preset-env'] })
  // 返回文件对象
  return {
    filePath,
    dep,
    code
  }
}

// 解析依赖
function resolveDep (filePath) {
  // 获取文件对象
  let fileObj = resolveFile(filePath)
  // 创建依赖队列
  // 起始值为当前文件对象
  let depQueue = [fileObj]
  for (let file of depQueue) {
    // 获取目录名
    let dirname = path.dirname(file.filePath)
    file.dep.forEach(relativePath => {
      // 获取绝对路径
      let absolutePath = path.join(dirname, relativePath)
      // 解析依赖文件
      let depFile = resolveFile(absolutePath)
      depFile.relativePath = relativePath
      depQueue.push(depFile)
    })
  }
  // 返回依赖队列
  return depQueue
}

// 打包
function bundle (entryPath) {
  // 获取依赖队列
  let depQueue = resolveDep(entryPath)
  // 依据 Babel 编译结果及 CommonJS 规范
  // 构建文件路径和模块代码的键值对
  // 将模块代码存入 `function (require, module, exports) {}` 作用域中
  let modules = ''
  depQueue.forEach(file => {
    let filePath = file.relativePath || entryPath
    modules += `'${filePath}': (
      function (require, module, exports) { ${file.code} }
    ),`
  })
  // 模拟 CommonJS 规范
  // 使得浏览器能够加载 CommonJS 模块
  let result = `
    (function (modules) {
      // 模拟 require
      function require (filePath) {
        // 模拟 module
        let module = { exports: {} }
        // 执行模块代码
        modules[filePath](require, module, module.exports)
        // 暴露 module.exports
        return module.exports
      }
      // 加载入口模块
      require('${entryPath}')
    })({ ${modules} })
  `
  // 写入打包结果
  fs.writeFileSync('./dist/bundle.js', result)
}

bundle('./src/entry.js')
```
