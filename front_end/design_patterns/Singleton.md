## JavaScript单例模式给你分配一个`cuteGirl`

马上就双十一了，我知道好多同志还没有对象，所以今天大瑞通过**单例模式**来给大家一人分配一个，只准有一个。

单例模式根本不给渣男机会！！！

![渣男](./images/疑问.jpg)

先说单例模式特点：

- 保证一个类**仅有一个**实例，并提供一个访问它的**全局访问接口**

> 保证一位男同志**仅有一个**`cuteGirl`，并提供一个获取`cuteGirl`的接口

### 开始show！

```js
// 1.创建获取GrilFriend的类
function GetGrilFriend(cuteGirl) {
    this.cuteGirl = cuteGirl
}
//2. 秀GrilFriend的方法
GetGrilFriend.prototype.showGirlFriend = function() {
    alert(this.cuteGirl)
}
// 3.一人只能一个GrilFriend
// 4.hasGirlFriend作为全局访问点
GetGrilFriend.hasGirlFriend = (function() {
    let cuteGrilFriend = null
    return function(cuteGirl) {
		if(!cuteGrilFriend) {
   		     cuteGrilFriend = new GetGrilFriend(cuteGirl)
    	}
   		 return cuteGrilFriend
    }
})()

let youGirlFriend = GetGrilFriend.hasGirlFriend("大瑞")
let yourGirlFriend = GetGrilFriend.hasGirlFriend("小瑞") // 想啥呢？？？
youGirlFriend.showGirlFriend() // "大瑞"
yourGirlFriend.showGirlFriend() // "大瑞"

```

好了上面`code`已经基本实现了只能有一位`cuteGirl`的需求。

>  但是还有也有些问题:
>
> - 目标对象与获取逻辑耦合。上面的代码做了两件事：
>   - 获取目标对象
>   - 保证目标对象唯一
>
> 接下来我们解决这个问题。

但是大瑞考虑到，有的同志现阶段不仅是`单身Dog`，还是`铲shi官`，过节呢，总不能让孩子也单着吧🐶。

![我也要！](./images/渴望的眼神.jpg)

天猫双十一有活动、有优惠、有折扣。

我也有："买一送一"。

### 对象介绍所代理实现

```js
// 你的
// 1.创建获取GirlFriend的类
function YouGirlFriend(cuteGirl) {
  this.cuteGirl = cuteGirl
}
// 2.秀GirlFriend
YouGirlFriend.prototype.showGirlFriend = function () {
  alert(this.cuteGirl)
}
// 孩子的
function ChildGirlFriend(cuteGirl) {
  this.cuteGirl = cuteGirl
}
ChildGirlFriend.prototype.showGirlFriend = function () {
  alert(this.cuteGirl)
}
// 3.代理保证目标对象唯一
function proxyGirlFriendIntroduce(fn, cuteGirl) {
  fn.cuteGirlFriend = null
  return function () {
    return fn.cuteGirlFriend || (fn.cuteGirlFriend = new fn(cuteGirl))
  }
}

let youGirlFriend = proxyGirlFriendIntroduce(YouGirlFriend, "大瑞")
let youGirlFriends = proxyGirlFriendIntroduce(YouGirlFriend, "大乔")
let childGirlFriend = proxyGirlFriendIntroduce(ChildGirlFriend, "小瑞")
let childGirlFriends = proxyGirlFriendIntroduce(ChildGirlFriend, "小乔")
console.dir(youGirlFriend())
console.dir(youGirlFriends())
console.dir(childGirlFriend())
console.dir(childGirlFriends())
```


> 代理模式实现单例的优点：
>
> - 目标实例与逻辑代码解耦
> - 这样一来别管是给孩子，就是给产品找一个都行🙈

单例模式关键点总结：

- 有一个instance用来保存唯一实例
- 有一个全局访问接口
- 关键逻辑代码：

```js
let obj
if(!obj) {
    obj = XXX
}
```



> 温暖的女人的怀抱，对男人来说，永远就象港湾对于远航的船、襁褓对于婴儿一般的重要。这怀抱象大地一样宽阔而深厚，抚慰着男儿们创伤的心灵，给他温暖，快乐和重新投入风暴的力量！——路遥

参考文献：

- 《JavaScript设计模式与开发实践》单例模式