# 原型与原型链
- 原型：每一个构造函数都会有prototype属性，obj.prototype指向构造函数的原型，构造函数的原型其实也是对象，原型可以是另一个函数或者实例，当一个实例在调用属性或者方法的时候

```js
function girlFriend() {
  let girl = new Object()
  girl.height = 180
  girl.braSize = "G"
  girl.callMe = function() {
    console.log("剑大瑞")
  }
  girl.giveServe = () => {
    console.log("老公坐，我给你煲了牛鞭汤🙈")
  }
  return girl
} 
let myGirl = new girlFriend()
console.dir(myGirl)
console.dir(myGirl.callMe)
console.dir(myGirl.major)
```