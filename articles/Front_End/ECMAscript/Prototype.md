<!--
 * @Author: your name
 * @Date: 2020-08-03 18:48:15
 * @LastEditTime: 2020-09-02 07:59:12
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
- 特点:
 - 解决多次创建相似对象问题
 - 但是没有解决对象识别问题，因为获取的实例是通过new Object产生的而不是我们自己创建的类。

> 当需要 `instanceOf` 时, 就会出现问题。因为`myGirl`实际是通过`Object`创建的。
既然工厂模式因为使用new Object，带来无法识别对象的问题，那我们为什么不直接使用函数直接创建对象呢？别忘了在JS中函数可以一等公民啊。

哎，这就是接下来要说的构造函数模式。

- 构造函数模式
```js 
function GirlFriend(height, braSize, job) {
  this.height = height
  this.braSize = braSize
  this.job = job
  this.callMe = function() {
    console.log("剑大瑞")
  }
  this.giveServe = function {
    console.log("老公坐，我给你煲了牛鞭汤🙈")
  }
} 
let myGirl = new GirlFriend(180, "G", "Model")
let youGirl = new GirlFriend(150, "A", "FE engineer")

console.dir(myGirl.giveServe())
console.dir(youGirl.braSize)
```
特点：
- 没有显示的创建对象
- 直接将属性和方法赋值给了this对象
- 没有return语句
- 函数名称以大写字母开头（约定）

通过构造函数方式创建对象过程中，我们并没有显示的创建对象，但是确获得了一个对象。这是因为在调用new的时候，他为我们做了一下几件事情：
- 创建一个新的对象
- 将构造函数的作用域赋给新对象（将this于这个新对象进行隐式绑定）
- 执行构造函数的代码（为这个对象添加属性）
- 返回新的对象

都写到这里了，那我们再手写个new?
```js
const myNew = function () {
  // 获取构造函数
  let Constructor = Array.prototype.shift.call(arguments);
  // 创建一个新的对象
  let obj = {};
  // 确定原型对象
  obj.__proto__ = Constructor.prototype;
  // 为新的对象添加属性
  let res = Constructor.apply(obj, arguments);
  // 返回新对象
  return res instanceof Object ? res : obj;
}
```

- 前面说过工厂模式创建的对象会带来对象识别问题
- 原型对象默认属性constructor属性，指向原型的构造函数
- 下面进行对象检测

```js
console.log(myGirl.constructor === GirlFriend) // true
console.log(youGirl.constructor === GirlFriend) // true
console.log(myGirl.constructor === Object) // true
console.log(youGirl.constructor === Object) // true
```
特点： 
- 解决对象的识别问题
- 如果不使用new调用，与普通方法别无二致
- 在使用构造函数时，如果属性值为方法（引用类型），那每次都会创建一个新的方法，这回带来大量的内存浪费。因为方法的功能是一样的，我们为什么要创造那么多重复的呢？

```js
console.log(myGirl.callMe === youGirl.callMe) // false
```
为解决方法不一致问题，我们可以将方法移至构造函数外部，来解决这个问题。
```js 
function GirlFriend(height, braSize, job) {
  this.height = height
  this.braSize = braSize
  this.job = job
  this.callMe = callMe
  this.giveServe = giveServe
} 
function callMe() {
  console.log("剑大瑞")
}
function giveServe() {
  console.log("老公坐，我给你煲了牛鞭汤🙈")
}
let myGirl = new GirlFriend(180, "G", "Model")
let youGirl = new GirlFriend(150, "A", "FE engineer")

console.log(myGirl.callMe === youGirl.callMe) // true

```
但这种方式带来了新的问题，因为将方法设置在构造函数外部，导致方法成为全局方法，会造成变量污染。而且这样的方式对于我们自定义的类就没有封装性可言。那怎么办？

还记得前面说过的原型与原型链吗？我们创建的每一个函数都有一个prototype属性，这个属性是一个指针，指向一个对象（原型），而这个对象的用途就是包含可以由特定类型的所有实例共享的属性和方法。如果调用一个对象的属性，JS引擎没有在对象自身找到，就回去他的原型对象上去找，直到最顶层null。

那可不可以将对象的共有属性或者方法定义在原型对象上？
当然可以，这就是接下来要说的原型模式。

- 原型模式

```js 
function GirlFriend(height, braSize, job) {
  this.height = height
  this.braSize = braSize
  this.job = job
} 
GirlFriend.prototype.callMe = function () {
  console.log("剑大瑞")
}
GirlFriend.prototype.giveServe = function () {
  console.log("老公坐，我给你煲了牛鞭汤🙈")
}
let myGirl = new GirlFriend(180, "G", "Model")
let youGirl = new GirlFriend(150, "A", "FE engineer")

console.log(myGirl.callMe === youGirl.callMe) // true

```
特点：
- 原型对象上的所有属性，所有实例共享
- 存在的问题也是因为原型共享属性导致的，如果一个实例修改了原型上的属性，则会影响到其他实例

- 构造函数模式+原型模式
- 动态原型模式
- 寄生构造函数模式
- 稳妥构造韩式模式