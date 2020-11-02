## 单例模式

特点：保证一个类仅有一个实例，并提供一个访问它的**全局访问点**

用例：线程池、全局缓存、浏览器中的Window对象、DOM中的document对象

实现：

```js
function Singleton(name) {
    this.name = name
}
Singleton.instance = null
Singleton.prototype.getName = function() {
    console.log(this.name)
}
// getInstance 作为全局访问点
Singleton.prototype.getInstance = function() {
    if(!this.instance) {
        this.instance = new Singleton(name)
    }
    return this.instance
}

var a = Singleton.getInstance('大瑞')
var b = Singleton.getInstance('小瑞')
a.getName()
b.getName()
```

- 透明的单例模式

```js
var CreateDiv = (function() {
    var instance
    var CreateDiv = function(html) {
        if(instance) return instance
        this.html = html
        this.init()
        return instance = this
    }；
    CreateDiv.prototype.init = function() {
        var div = document.createElement('div')
        div.innerHTML = this.html
        document.body.appendChild(div)
    };
    return CreateDiv;
})（）

var a = new CreateDiv("大瑞")
var b = new CreateDiv("小瑞")
```

- 使用自执行函数，创建闭包，作用域
- 利用闭包中的变量来记录实例

用代理实现单例模式

```js
function CreateDiv(html) {
	this.html = html
    this.init()
}
 CreateDiv.prototype.init = function() {
	var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
};

var ProxySingletonCreateDiv = (function() {
	var instance
    return function(html) {
        if(!instance) {
            instance = new CreateDiv(html)
        }
        return instance
    }
})()
```

通过代理实现单例模式，任何普通的类如果需要，都可以通过代理来实现。对目标实例与类进行的拆分。

惰性单例模式

## 策略模式

特点:定义一系列的算法,把他们一个一个封装起来,并且使他们可以相互替换

实例:表单校验

优缺点:策略模式利用组合 委托 和多态等技术和思想, 可以有效地避免多重条件选择语句



## 代理模式

## 迭代器模式

- 特点:
  - 提供一种方法顺序访问一个聚合对象中的各个元素,而又不需要暴露该对象的内部表示

```js
function myEach(ary, callback) {
	for(let i=0,l=ary.length;i<l;i++) {
        callback.call(ary[i], i, ary[i])
	}
}
myEach([1,2,3], function(i,n){
    console.log(i, n)
})
```

### 内部迭代器

- 外界不需要关心迭代器内部的实现,给迭代器交互也仅是一次初始调用.这个是内部迭代器的缺点  

### 外部迭代器

- 必须显示地请求迭代下一个元素