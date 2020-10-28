## 单例模式

特点：保证一个类仅有一个实例，并提供一个访问它的**全局访问点**

用例：线程池、全局缓存、浏览器中的Window对象、DOM中的document对象

​		

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

透明的单例模式

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



用代理实现代理模式

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



```js
function GetGrilFriend(cuteGirl) {
    this.girlFriend = cuteGirl
}
GetGrilFriend.cuteGrilFriend = null
GetGrilFriend.prototype.showGirlFriend = function() {
    alert(this.girlFriend)
}
// hasGirlFriend作为全局访问点
GetGrilFriend.hasGirlFriend = function(cuteGirl) {
    if(!this.cuteGrilFriend) {
        this.cuteGrilFriend = new GetGrilFriend(cuteGirl)
    }
    return this.cuteGrilFriend
}

let youGirlFriend = GetGrilFriend.hasGirlFriend("大乔")
let yourGirlFriend = GetGrilFriend.hasGirlFriend("小乔")
console.log( youGirlFriend , yourGirlFriend) // 大乔,大乔
```

