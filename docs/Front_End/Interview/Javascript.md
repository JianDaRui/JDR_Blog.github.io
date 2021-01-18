## 手写

### call

```js

```

### bind


```js
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

```js
myCall = function(context = window, ...args) {
  if(this === Function.prototype) {
    return undefined
  }
  let fn = Symbol()
  context[fn] = this
  let res = context[fn](...arguments)
  delete context[fn]
  return res
}
```

```js
const sleep = function(timer, i) {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      resolve(i)
    },timer)
  })
}

const start = async function() {
  for(let i=0;i<10;i++) {
    let result = await sleep(1000, i)
    console.log(result)
  }
}
```