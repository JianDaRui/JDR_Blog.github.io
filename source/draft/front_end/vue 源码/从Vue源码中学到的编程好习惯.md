# 从`Vue`源码中学到28个的编程好习惯

![](D:\Study\JDR_Blog\articles\03-Vue源码\微信图片_20200721094956.jpg)

笔者最近在读Vue2.6.11的源码，在阅读过程中，不仅体会到Vue组件化及数据响应式的设计之美，也感叹于尤大撸码的规范、优雅。所以这里一一将其总结罗列出来，保证新手看了，写代码更老练。老人看了，融汇补充。

> 

- 单行注释



```js
/* 声明变量位于声明之后 */ 
vm._vnode = null // the root of the child tree
vm._staticTrees = null // v-once cached trees

/* 函数中使用注释 注意缩进 */ 
export function initRender (vm){
	// bind the createElement fn to this instance
	// so that we get proper render context inside it.
	// args order: tag, data, children, normalizationType, alwaysNormalize
	// internal version is used by render functions compiled from templates
	vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
}

/* if...else... if 之前说明if作用，if里面表示通过检测 */
// if the returned array contains only a single node, allow it 
if (Array.isArray(vnode) && vnode.length === 1) {
	vnode = vnode[0]
}

if (res.iterator2) {
    // (if之后)
    // (item, key, index) for object iteration
    // is this even supported?
    addRawAttr(el, 'index', res.iterator2)
} else if (res.iterator1) {
    addRawAttr(el, 'index', res.iterator1)
}

/* 变量或者参数后注释 说明其作用 */
isCloned: boolean; // is a cloned node?
isOnce: boolean; // is a v-once node?
asyncFactory: Function | void; // async component factory function
const _target = target // save current target element in closure
```

- 块注释

```js
/* 导出模块之前 */ 
/**
 * Map the following syntax to corresponding attrs:
 *
 * <recycle-list for="(item, i) in longList" switch="cellType">
 *   <cell-slot case="A"> ... </cell-slot>
 *   <cell-slot case="B"> ... </cell-slot>
 * </recycle-list>
 */
export function preTransformRecycleList (
  el: ASTElement,
  options: WeexCompilerOptions
) {
    // 省略的代码
}

/* 函数声明之前 */ 
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
    // 省略的代码
}
```

- 注意换行

```js
/* 每行最多在75个子节左右 */

/* 单行注释换行 */
// There's no need to maintain a stack because all render fns are called
// separately from one another. Nested component's render fns are called
// when parent component is patched.
currentRenderingInstance = vm
vnode = render.call(vm._renderProxy, vm.$createElement)


/* 多行注释换行 */
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  // 省略的代码
}
```

- 字符串拼接换行，注意 `+` 位置

```js
warn(
	`Property or method "${key}" is not defined on the instance but ` +
	'referenced during render. Make sure that this property is reactive, ' +
	'either in the data option, or for class-based components, by ' +
	'initializing the property. ' +
	'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
	target
)
```

- 多个三目运算符使用

```js
/* better */
function mergeHook (...) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

/* bad */
function mergeHook (...) {
  return childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal
}
```

- `|| 、&&` 代替  `...? ... : ...`

```js

function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

/* 相当于 */
function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts ? (opts.Ctor.options.name ? opts.Ctor.options.name : opts.tag) : opts
}
// 哪个更简洁
```

- 使用 `!!` 将值转为`boolean`

```js
this.deep = !!options.deep
this.user = !!options.user
this.lazy = !!options.lazy
this.sync = !!options.sync
```

- 文件命名

```js
/* 命名时，文件内的代码应与其功能或者业务模块相关 */

├── scripts ------------------------------- 构建相关的文件
│   ├── git-hooks ------------------------- 存放git钩子的目录
│   ├── alias.js -------------------------- 别名配置
│   ├── config.js ------------------------- 生成rollup配置的文件
│   ├── build.js -------------------------- 对 config.js 中所有的rollup配置进行构建
│   ├── ci.sh ----------------------------- 持续集成运行的脚本
│   ├── release.sh ------------------------ 用于自动发布新版本的脚本
├── src ----------------------------------- 重要部分
│   ├── compiler -------------------------- 编译模板
│   ├── core ------------------------------ 存放通用的，与平台无关的代码
│   │   ├── observer ---------------------- 观测数据
│   │   ├── vdom -------------------------- 虚拟DOM
│   │   ├── instance ---------------------- 构造函数
│   │   ├── global-api -------------------- Vue全局API
│   │   ├── components -------------------- 通用组件
│   ├── server ---------------------------- 服务端渲染(server-side rendering)
│   ├── platforms ------------------------- 包含平台特有的相关代码，
│   │   ├── web --------------------------- web平台
│   │   │   ├── entry-runtime.js ---------- 运行时构建的入口
│   │   │   ├── entry-runtime-with-compiler.js -- 独立构建版本的入口，带编译
│   │   │   ├── entry-compiler.js --------- vue-template-compiler 包的入口文件
│   │   │   ├── entry-server-renderer.js -- vue-server-renderer 包的入口文件
│   │   │   ├── entry-server-basic-renderer.js -- 输出 packages/vue-server-renderer/basic.js 文件
│   │   ├── weex -------------------------- 混合应用
│   ├── sfc ------------------------------- 包含单文件组件(.vue文件)的解析逻辑，用于vue-template-compiler包
│   ├── shared ---------------------------- 项目通用代码
```

- 合理使用index文件,将当前业务文件夹中模块导入导出

```js
/* util/index.js */
export * from './attrs'
export * from './class'
export * from './element'

/* src/core/util/index.js */
export * from 'shared/util'
export * from './lang'
export * from './env'
export * from './options'
export * from './debug'
export * from './props'
export * from './error'
export * from './next-tick'
export { defineReactive } from '../observer/index'
```

- 变量及函数命名

| 判断词前缀 | 含义     | 栗子                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| `is`       | 是否     | `isDef`、`isTrue`、`isFalse`                                 |
| `has`      | 有没有   | `hasOwnProperty`、`hasProxy`                                 |
| `static`   | 是否静态 | `staticRoot`、`staticInFor`、`staticProcessed`               |
| `should`   | 应不应该 | `shouldDecodeTags`、`shouldDecodeNewlines`、`shouldDecodeNewlinesForHref` |
| `dynamic`  | 是否动态 | `dynamicAttrs`                                               |

| 动词前缀   | 含义   | 栗子                 |
| :--------- | :----- | :------------------- |
| `init`     | 初始化 | `initMixin`          |
| `merge`    | 合并   | `mergeOptions`       |
| `compile`  | 编译   | `compileToFunctions` |
| `validate` | 校验   | `validateProp`       |
| `handle`   | 处理   | `handleError`        |
| `update`   | 更新   | `updateListeners`    |
| `create`   | 创建   | `createOnceHandler`  |

- 变量声明

```js
/* const 代替 let */
/* better */
const opts 
const parentVnode 
const vnodeComponentOptions 
const superOptions
const cachedSuperOptions 

/* bad*/
let opts 
let parentVnode 
let vnodeComponentOptions 
let superOptions
let cachedSuperOptions 
```

- 合理使用变量前缀 `_ `和 `$`

```js
// Vue中一般以:
// _ 开头表私有属性或方法
// 以 $ 开头表私有属性或方法
declare interface Component {
    
  // public properties (表全局属性)
  $el: any; // so that we can attach __vue__ to it
  $data: Object;
  $props: Object;
  $options: ComponentOptions;
  $parent: Component | void;
  $root: Component;
  // ...省略一部分

  // public methods (表全局方法)
  $mount: (el?: Element | string, hydrating?: boolean) => Component;
  $forceUpdate: () => void;
  $destroy: () => void;
  $set: <T>(target: Object | Array<T>, key: string | number, val: T) => T;
  $delete: <T>(target: Object | Array<T>, key: string | number) => void;
  // ...省略一部分

  // private properties (表私有属性)
  _uid: number | string;
  _name: string; // this only exists in dev mode
  _isVue: true;
  _self: Component;
  _renderProxy: Component;
  // ...省略一部分
};

```

- if...else... 

```js
/* 闭合{} */
if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    )
    return
}
```

- for循环

```js
/* 优先声明key */
/* 原因就一点：高效 */
var key;
for (key in parent) {
   // 省略
}
for (key in child) {
  // 省略
}


/* 同时声明 i,length */
function processAttrs (el) {
  var i, l, 
  for (i = 0, l = list.length; i < l; i++) {
       // 省略
	}
}
export function getAndRemoveAttr (): {
    const list = el.attrsList
    for (let i = 0, l = list.length; i < l; i++) {
        // 省略
    }
}
```

- `for...in...`循环中使用`hasOwnProperty`

```js
/* for...in...会遍历对象原型链中的属性或者方法 */
oldClassList.forEach(name => {
    const style = stylesheet[name]
    for (const key in style) {
      if (!result.hasOwnProperty(key)) {
        result[key] = ''
      }
    }
})
```

- 检测`undefined`或者`null`

```js
export function isUndef (v: any): boolean %checks {
  return v === undefined || v === null
}
```

- 检测原始类型

```js
export function isPrimitive (value: any): boolean %checks {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
```

- 检测对象

```js
export function isObject (obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}
```

- 检测纯对象

```js
export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}
```

- `===`代替`==`

```js
/* 注意换行处逻辑运算符的位置 */
while (
	(lastNode = el.children[el.children.length - 1]) &&
	lastNode.type === 3 &&
	lastNode.text === ' '
 ) {
    // 省略
}

function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
```

- 公共常量进行抽离

```js
/* shared/contants */
export const SSR_ATTR = 'data-server-rendered'
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]

```

- 利用开关

```js
/* 开关called保证代码只会执行一次 */
export function once (fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```

- 检测是不是对象的原有属性

```js
/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
```

- 使用`userAgent`进行浏览器嗅探，可以判断当前设备环境，而进行合理的优化，兼容

```js
/* src/core/util/env.js */
UA = inBrowser && window.navigator.userAgent.toLowerCase()
```

- 保持`Javascript`对象原有属性、方法（不是你的对象不要动）

```js
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    // 注意这里并没有改变数组原有方法，只不过改变的是this指向
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
        // ...省略的代码
    }
    return result
  })
})
```

- 利用类型转换

```js
/* 下面的filter会过滤掉转为false*/
export function pluckModuleFunction (
  modules
  key
){
  return modules
    ? modules.map(m => m[key]).filter(_ => _)
    : []
}
```

- 利用`Javascript`闭包及柯里化

```js
/**
* Vue的compiler利用了函数柯里化及闭包的原理，实现将公共配置缓存，
* 根据不同平台需要而进行compiler的功能，
* 感兴趣的可以阅读源码，体验Vue设计之美
*/

/* src/compile/index.js */
/* 源码注释说明可以根据不同环境进行编译 */
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
) {
  // 省略的代码
})

/* src/compile/create-compiler.js */

import { createCompileToFunctionFn } from './to-function'
export function createCompilerCreator (baseCompile: Function): Function {
  return function createCompiler (baseOptions: CompilerOptions) {
    function compile (
      template: string,
      options?: CompilerOptions
    ): CompiledResult {
     //... 省略的代码
    const compiled = baseCompile(template.trim(), finalOptions)
    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
    
/* src/compile/to-function.js */
export function createCompileToFunctionFn (compile: Function): Function {
  const cache = Object.create(null)

  return function compileToFunctions (
    template: string,
    options?: CompilerOptions,
    vm?: Component
  ): CompiledFunctionResult {
    // ... 省略的代码
  }
}

```

- 函数保持单一职责，解耦

> 在`Javascript`中函数为一等公民，可以说一个中初级前端程序员在仅使用函数的情况下就可完成日常开发任务。可见函数在`Javascript`中有多么强大。但是函数使用也需要规范。在阅读`Vue`源码的过程中，笔者就体会到尤大对函数解耦，单一职责，封装使用的美妙之处。就拿`Vue`初始化举例:

```js
// 一目了然, 保证你自己都看的明白
/* src/core/instance/init.js */
initLifecycle(vm) 
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```



PS: 源码中的精髓之处不止笔者罗列的这些，笔者后期还会慢慢补充，罗列。



> 人的一生中关键的就那么几步，特别是在年轻的时候。——路遥



参考资料:
- vue2.6.11
- 《编写可维护的Javascript》
- 《重构:改善既有代码的设计》

![](D:\Study\JDR_Blog\articles\02-类型转换\images\kanxini.png)

![](D:\Study\JDR_Blog\images\gongzonghao.png)

