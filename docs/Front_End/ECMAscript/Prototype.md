<!--
 * @Author: your name
 * @Date: 2020-08-03 18:48:15
 * @LastEditTime: 2020-08-29 18:39:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JDR_Blog\docs\Front_End\ECMAscript\Prototype.md
-->
# JavaScript中的原型、原型链与面向对象
- 对象：以键值对这种形式呈现的属性的集合。
- 构造函数：这个函数可不可以通过`new`来创建对象，如果可以则为构造函数。注意在`Javascript`中构造函数与普通的函数并没有区别，函数名称的大小写只是一种约定。在面向对象过程中构造函数可以确保实例有不同的特征。
- 原型：每一个构造函数都会有`prototype`属性，`function.prototype`指向构造函数的原型，原型其实也是对象，既然是对象那原型可以是另一个函数或者类实例。实例对象又会有一个`__proto__`属性，该属性与`function.prototype`指向相同的位置———原型。并且原型有一个不可枚举的属性`constructor`，该属性指向原型的构造函数。在面向对象过程中，原型负责保存实例共有的属性。
- 原型链：在`Javascript`，每一个对象都有一个`__proto__`属性，`__proto__`指向该对象的原型对象，当访问一个对象自身不存在的属性时，JavaScript引擎就会通过`__proto__`去对象原型上查找，如果该原型还没有，那么会到该原型的原型上查找，最顶层可查找到 `Object.prototype` 的原型 **null**。

总结：在JS中构造函数是用来创建对象的，确保对象有不同的特征。而原型一方面可以确保对象有共同的属性以方便又可以节省代码执行过程中的性能损耗。而原型链就是确保实例与原型之间的连接，确保实现继承的效果。

## 对象

**属性类型**

1. 数据属性
- [[Configurable]]: 能否配置对象属性。比如删除属性，更改属性的特性。
- [[Enumerable]]: 能否枚举对象属性。
- [[Writable]]: 能否修改属性的值。
- [[Value]]: 包含这个属性的值。
2. 访问器属性
- [[Configurable]]
- [[Enumerable]]
- [[Get]]: 读取属性值使调用的函数。
- [[Set]]: 在写入属性值时调用的函数。

```js
let daRui = {}

Object.defineProperty(daRui, "hasGirlFriend", {
  configurable: false,
  Enumerable: true,
  Writable: true,
  value: false
})

Object.defineProperty(daRui, "weight", {
  Enumerable: false,
  Writable: false,
  value: 75
})

daRui.weight = 80 
console.log(daRui.weight) // 75
```

**getOwnPropertyDescriptor**
用于获取给定对象属性的描述符


## 创建对象

JS中创建对象有两种方式**构造函数创建**和**字面量形式创建**

在JS面向对象中主要通过调用构造函数创建。下面介绍几种创建模式：

- 工厂模式

```js
function girlFriend(height, braSize, job) {
  let girl = new Object()
  girl.height = height
  girl.braSize = braSize
  girl.job = job
  girl.callMe = function() {
    console.log("剑大瑞")
  }
  girl.giveServe = () => {
    console.log("老公坐，我给你煲了牛鞭汤🙈")
  }
  return girl
} 
let myGirl = girlFriend(180, "G", "Model")
let youGirl = girlFriend(150, "A", "FE engineer")

console.dir(myGirl.callMe())
console.dir(youGirl.giveServe())

```
- 优点:
 - 解决创建相似对象问题，但是没有解决对象识别问题。

> 当需要 `instanceOf` 时, 就会出现问题。因为`girl`实际是通过`Object`创建的。

- 构造函数模式

```js 

```

