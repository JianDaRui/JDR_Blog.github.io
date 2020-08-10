<!-- #  Javascript深入浅出之this -->

在JavaScript中this为开发者提供了函数调用非常简洁的表达方式，但是关于Javascript中的this指向问题，我们经常听到的回答就是**谁调用就指向谁**。但是在实际的面试中的面试题中你试试看能领的清**谁是谁**吗？

或者你用这种方式回答面试官有关this的问题。请自行脑补后期画面。

为了彻底搞懂Javascript中的this问题，这次我们从根源中进行分析，深入浅出。希望达到的效果就是工作中使用不含糊，面试中回答问题够透彻。

开始！

## 谁？

我们通常说的**谁调用就指向谁**中的**谁**通常是指函数执行时的**执行上下文**(`context`)。

既然明确了是**谁**，借来下那就得捋捋**执行上下文**了。

## 执行上下文

Javascript虽然是一门**解释型**的脚本语言，但是Javascript的执行并不是执行一行翻译一行，而是按代码块来进行的。在Javascript中我们通常将其划分为：

- 全局执行上下文：全局唯一，当在浏览器中时，为window对象。
- 函数执行上下文：只要函数被调用，就会创建函数执行上下文。
- eval执行上下文： Javascript原生函数eval函数执行上下文。（功能强大，但是不建议使用）

```js
myName()
console.log(name)
var name = '剑大瑞'
function myName() { 
    var height = 180
    console.log('开始执行函数了')
}
// '开始执行函数了'
// undefined
```
<div style="text-align: center">

![](/images/this/context.png)
</div>


当上面的代码需要执行时，就会创建相应的执行上下文。执行上下文的创建过程分为两个阶段。下面我们来分析这两个阶段。

### 两个阶段

#### 创建阶段

##### **确定this指向**

创建节点首先会将当前执行上下文与this进行绑定(Binding)。

前面说过this是与当前的执行上下文息息相关的。所以这里可将其绑定情况分为三种：

- 全局执行上下文中this。指向window。
- 函数执行上下文中this。指向函数执行上下文环境。
- eval执行上下文中this。指向eval执行上下文。



我们知道在Javascript中使用var声明的变量存在**变量提升**的情况。这会导致很多问题。为此ES6中引入了let和const通过创建**块级作用域**的方式，解决了变量提升导致的诸多问题。

但是var与let、const声明变量的方式有什么本质区别呢。

其实是变量声明后，变量存储环境不同。在执行上下文的创建阶段还会根据变量的声明方式创建词法环境及变量环境。

并且Javascript引擎在执行代码的时候会优先访问变量环境中的变量，在访问词法环境中的变量。

##### 创建词法环境

###### 作用

存储通过let、const声明的变量。

###### 分类

- 全局词法环境。包含用户在全局定义的变量，及Javascript原生对象。
- 函数词法环境。函数内部用户声明的全部变量及环境记录器中存储的变量。

###### 组成

- 环境记录器。记录词法环境中的标识符与变量的映射。
  - 环境记录器分为两种：
    - 声明式环境记录器
      记录存在于函数作用域中，存储变量、函数、参数。
    - 对象式环境记录器
      记录存在于全局作用域和块级作用域中，存储变量、函数。
- 外部环境引用。如果在当前环境内找不到变量，引擎可以通过引用在外部环境继续查找。即访问外部作用域（父级作用域）

##### 创建变量环境

###### 作用

用于存储通过var声明的变量。

在执行上下文的创建阶段，let、const定义的变量没有并关联任何值，但是通过var声明的变量会被设置为undefined，并存储再变量环境中，所以var变量在声明之前访问值为undefined，但不会报错，即**变量声明提升**。let、const变量声明前访问会导致引用错误。



只说不做太抽象。我们下面通过一段代码来演示一下：

```js
myInfo()
console.log(name)
var name = '剑大瑞'
function myInfo() { 
    let height = 180
    console.log(this.name + '身高' + height)
}
// '剑大瑞身高180'
// '剑大瑞'
```

这里我们按执行上下文的创建过程简单制作一张图：
<div style="text-align: center">

![](/images/this/执行上下文的创建.png)
</div>




#### 执行阶段

进入执行阶段后会将上下文中的变量赋值，然后执行代码，执行完毕后会将当前函数从栈顶弹出，接着执行下一个函数，直至栈空。

有关执行上下文的概念比较多，也比较抽象，这里我们代码+图演示一把。



执行山下文是分析结束了，这里面的概念比较多，放张思维导图，结构化下。
<div style="text-align: center">

![](/images/this/执行上下文.png)
</div>




在执行上下文的执行阶段我们有提到出栈的过程，这里就涉及到执行上下文的上一层，也是Javascript引擎的重要组成部分调用堆栈。关于调用堆栈我们还是有必要提一下的，因为大家在debug中，少不了分析调用堆栈中的情况。

## 调用堆栈
<div style="text-align: center">

![](/images/this/JS引擎.jpg)
</div>


> JS 引擎主要由emory Heap(内存堆)，Call Stack(调用堆栈)组成。前者负责内存分配地址，后者负责执行代码。

当一段Javascript需要执行的时候，Javascript引擎会将本次所需执行的所有代码块逐一推入栈中，我们称之为入栈。

> 栈：一种限定仅在表尾进行插入和删除操作的线性表，遵循先进后出规则。
<div style="text-align: center">
    ![](/images/this/callStack.png)
</div>


当我们在Vue组件的created中进行debug时，可以清楚的看到调用栈中的情况，即Vue都做了什么：

created—》invokeWithErrorHandling—》callHook—》_init—》VueComponent—》createComponentInstanceForVnode—》init......

在代码块入栈的过程中，就会进行我们前面分析的执行文的创建工作。



看下面代码：

```js 
function info() {
    // info  
    let name = "剑大瑞"
	console.log(name)
    body() 
}
function body() {
    // info -> body
    let bodyInfo = "身高一米八"
    console.log(bodyInfo)
    age()
}
function age() {
    // info -> body -> age
    var ageInfo = "今年18岁"
	console.log(ageInfo)
}
info()
```

让我们用图片演示一下上面这段代码的**入栈出栈**情况：



经过上面两部分的分析，我们已经知道了Javascript中的调用堆栈的情况及执行上下文的创建过程，并且明确了this的绑定就是在执行上下文创建的第一阶段确定的。

在实际工作中我们的this绑定有多种方式，这里大瑞主要参考了《你不知道的Javascript》中对this绑定的几种情况的分析，在这里我们已经有了前置知识，正好让我们用起来。将这几种情况一一分析。


## 绑定

### 默认绑定

>  函数作为独立函数调用时，this默认指向全局对象。

```js
myName() {
    console.log(this.name)
}
var name = "剑大瑞"
myName() // "剑大瑞"

console.log(this) // Window Object
```

如果使用严格模式（"use strict"），则全局对象无法使用默认绑定，this会绑定到undefined。

### 隐式绑定

> 函数作为对象的方法被调用，this会指向当前上下文对象。

```js
function myInfo() {
    console.log(`${this.name}身高${this.height}今年${this.age}岁`)
}

var Obj = {
	name: "剑大瑞",
    height: 180,
    age: 18,
    myInfo: myInfo
}
Obj.myInfo() // "剑大瑞身高180今年18岁"

```

隐式绑定的问题：

隐式绑定会发生this丢失的现象。下面通过一段代码分析下。

```js
function foo() {
    console.log(this.a)
}
var Obj = {
    a: 2,
    foo: foo
}
var bar = Obj.foo
var a = "Global A"

bar() // "Global A"
```

让我们通过前面说到的调用栈及执行上下文来分析一下中间发生了什么。

- 当我们在Obj中指定foo方法时，foo中的this这是指向Obj对象。这时别忘了，指针foo这时是函数function () {...} 的指针。
- 当我们使用Obj.foo赋值给bar变量时，这时bar也是原函数function foo() 的指针。这时bar为全局对象Window的属性。
- 当调用bar()时。函数bar的执行上下文已经指向了全局对象，会去访问Window的属性a 。所以打印出来的就是"Global A"

> 应该注意的是，当执行 bar = Obj.foo  时，相当与 声明了一个匿名函数bar = function() {......}。
>
> 这里涉及到Javascript中值与指针的存储方式。不在本文讨论范围类。

从上面的分析中可以看出发生隐式丢失的原因就是在我们**赋值、调用**的过程中，**无意**改变了函数的执行上下文所导致的。

### 显示绑定

在JavaScript中所有函数都可以通过调用call、apply、bind方法显示绑定this（这三个方法位于Function.prototype），从而改变函数的执行上下文。

#### call

#####  使用call

```js
function callMe(prefix) {
	console.log(prefix + this.name)
}
var obj = {
	name: "剑大瑞"
}
callMe.call(obj, "Hello， ") // “Hello 剑大瑞”
```

调用call时可以传递两个参数，第一个参数是需要绑定的对象，第二个参数是函数执行时所需要的参数。

> 可以为call传若干个参数，但是第一个参数一定是需要绑定的对象



这里我们通过手写call，来分析call内部做了什么？

##### 手写call

- 通过解构获取需要绑定的对象（第一个参数 thisArg ）及其余参数
- 将第一个参数转换为对象，如果为假则为window
- 创建一个具有唯一性的表示（ Symbol ）
- **将当前函数设置为需要绑定对象的方法**，这里是函数能访问到绑定对象上下文的关键，因为他已经是对象的一部分。
- 传参并获取结果
- 删除绑定在对象上的方法
- 返回结果

```js
Function.prototype.myCall = function () {
    let [thisArg, ...args] = [...arguments]
    thisArg = Object(thisArg) || window
    let fn = Symbol()
    thisArg[fn] = this
    let result = thisArg[fn](...args)
    delete thisArg[fn]
    return result
}
```

#### apply

##### 使用apply

```js
function callMe(prefix) {
	console.log(prefix + this.name)
}
var obj = {
	name: "剑大瑞"
}
callMe.apply(obj, [ "Hello， " ]) // “Hello 剑大瑞”
```

apply与call在使用上的区别仅在于传入的第二个参数是否是数组，在性能上apply要低于call。



接下来分析apply内部做了什么？

##### 手写apply

- 通过解构获取需要绑定的对象（第一个参数 thisArg ）及传入的数组
- 将第一个参数转换为对象
- 创建一个具有唯一性的表示（ Symbol ）
- **将当前函数设置为需要绑定对象的方法**，这里是函数能访问到绑定对象上下文的关键，因为他已经是对象的一部分。
- 传参并获取结果
- 删除绑定在对象上的方法
- 返回结果

```js
Function.prototype.myApply = function () {
    // 需要注意 args 与 ...args 的区别
    let [thisArg, args] = [...arguments];
    thisArg = Object(thisArg)
    let fn = Symbol()
    thisArg[fn] = this;
    // 将数组解构
    let result = thisArg[fn](...args);
    delete thisArg.fn;
    return result;
}
```



#### bind

##### 使用bind

```js
function callMe(prefix) {
	console.log(prefix + this.name)
}
var obj = {
	name: "剑大瑞"
}
var foo = callMe.bind(obj, "Hello， ")
foo() // “Hello 剑大瑞”
```



bind与call、apply的区别在于内部利用Javascrip**闭包**的特点实现**函数柯里化**，最后返回一个函数，返回的函数可以访问缓存的变量，基本原理我们已经了解，那就实现下吧。

##### 手写bind

- 首先缓存当前函数 this。比如上面示例代码中的callMe。
- 判断是否传参
- 返回新的函数
- 在新的函数内部调用原函数的apply方法，并将新旧参数一起传入

```js
Function.prototype.myBind = function (context, ...args) {
    const fn = this
    args = args ? args : []
    return function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs)
        }
        return fn.apply(context, [...args,...newFnArgs])
    }
}

```

这里给各位铁汁们放段bind的polyfill代码欣赏下：

```js
//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          baseArgs.push.apply(baseArgs, arguments);
          return fToBind.apply(
                 fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
```





#### new

#### 箭头函数



#### 闭包中的this





