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



