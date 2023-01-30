function typeOf(type) {
  return Object.prototype.toString.call(type)
}

function P() {

}

function C() {

}
C.prototype = new P()

function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inheritProtoperty(child, parent) {
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child
}

[...new Set(arr)]
function unique(array) {
  return array.filter({item, index, array} => array.indexOf(item) === index )
}

[].flat(Infinity)


function shallowCopy(obj) {
  if(typeof obj !== 'object') return 
  let target = Array.isArray(obj) ? [] : {}
  Object.keys(obj).forEach(key => {
    target[key] = obj[key]
  })
  return target
}

function deepCopy(obj, map = new Map()) {
  if(typeof obj !== 'object') return
  let target = Array.isArray(obj) ? [] : {}
  if(map.has(obj)) return map.get(obj)
  Object.keys(obj).forEach(key => {
    if(typeOf obj[key] === 'object') {
      target[key] = deepCopy(obj[key], map)
    } else {
      arget[key] = obj[key]
    }
  })

  return target
}

class EventEmitter {
  constructor() {
    this.cache = new Map()
  }

  on(name, fn) {
    if(this.cache.has(name)) {
      this.cache.get(name).push(fn)
    } else {
      this.cache.set(name, [fn])
    }
  }

  off(name, fn) {
    let tasks = this.cache.get(name)

    if(tasks.length) {
      tasks.findIndex(f => f === fn || f.callback === fn)
      if(index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }

  emit(name, once = false, ...args) {
    if(this.cache.has(name)) {

    }
  }
}

// URL 解析为对象
function parseParam(url) {
  const paramReg = /.+\?(.+)$/.exec(url)[1]
  const array = paramReg.splice('&')

  let paramObj = {}

  array.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码

      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
        paramsObj[param] = true;
    }
  })
}

function render(template, data) {
  const reg = /\{\{(\w+)\}\}/
  if(ref.test(template)) {
    cosnt name = reg.exec(template)[1]
    template = template.replace(reg, data[name]);
    return render(template, data)
  }
  return template
}

let imgs = document.getElementsByClassName('.img')
const observer = new IntersectionObserver(function(entries) {
  for(let i = 0, len = entries.length; i < len; i++) {
    const entry = entries[i]
    if(entry.intersecting) {
      const imgElement = change.target
      imgElement.src = imgElement.getAttribute("data-src");
      observer.unobserve(imgElement);
    }
  }
},{

})
imgs.forEach(img => observer.observe(img))

function debounce(fn, wait, immediate) {
  let timer, result
  
  function debounced () {
    const args = [...arguments]
    const context = this
    if(timer) clearTimeout(timer)
    
    if(immediate) {
      const callNow = !timer

      let timer = setTimeout(function() {
        timer = null
      }, wait)

      if(callNow) result = func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(contet, args)
      }, wait)
    }
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

function throttle(fn, wait) {
  const timer
  return function() {
    const context = this
    const args = [...arguments]
    if(timer) {
      timer = setTimeout(function() {
        fn.apply(context, args)
        timer=null
      })
    }
  }
}

function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
  };

  var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
  };
  
  throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = null;
  }
  return throttled;
}

// 柯里化
function curry(fn, ...args) {
  let length = fn.length
  return function() {
    const innerArgs = [...args, ...arguments]
    if(innerArgs.length === fn.length) {
      return fn.apply(this, innerArgs)
    } else {
      return curry.call(this, fn, ...args)
    }
  }
}
function currying(fn, length) {
  length = length || fn.length; 	
  return function (...args) {			
    return args.length >= length	
    	? fn.apply(this, args)			
      : currying(fn.bind(this, ...args), length - args.length) 
  }
}
function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      var position = 0, len = args.length;
      for(var i = 0; i < len; i++) {
          args[i] = args[i] === '_' ? arguments[position++] : args[i]
      }
      while(position < arguments.length) args.push(arguments[position++]);
      return fn.apply(this, args);
  };
};

function JSONP(url, params, callback) {
  const generateUrl = () => {
    let dataSrc = ''
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}&`
      }
    }
    dataSrc += `callback=${callbackName}`
    return `${url}?${dataSrc}`
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = generateUrl()
    document.appendChild.(script)
    window[callback] = function(data) {
      resolve(data)
      document.removeChild(script)
    }
  })
}

function getJSON(url) {
  return new Promise((resolve, rejcet) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.onreadystatechange = function() {
      if(xhr.readyState !== 4) return
      if(xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.responseText))
      }
    }
    xhr.send()
  })
}

Array.prototype.forEach2 = function(callback, thisArg) {
  if (this == null) {
      throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)  // this 就是当前的数组
  const len = O.length >>> 0  // 后面有解释
  let k = 0
  while (k < len) {
      if (k in O) {
          callback.call(thisArg, O[k], k, O);
      }
      k++;
  }
}

Array.prototype.map2 = function(callback, thisArg) {
  if (this == null) {
      throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)
  const len = O.length >>> 0
  let k = 0, res = []
  while (k < len) {
    if (k in O) {
      res[k] = callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
  return res
}

Function.prototype.call2 = function (context) {
  var context = context || window;
  const fn = Symbol('')
  context[fn] = this;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
      args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args +')');

  delete context.fn
  return result;
}

Function.prototype.apply2 = function (context, arr) {
  var context = context || window;
  const fn = Symbol('')
  context[fn] = this;

  var result;
  if (!arr) {
      result = context.fn();
  } else {
      var args = [];
      for (var i = 0, len = arr.length; i < len; i++) {
          args.push('arr[' + i + ']');
      }
      result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}

Function.prototype.bind2 = function (context) {
  if(type of this !== 'function') return new Error('')
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

function objectFactory() {
  var obj = new Object()
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments);
  
  // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
  return typeof ret === 'object' ? ret || obj : obj;
};

Object.create2 = function(proto, propertyObject = undefined) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object or null.')
  if (propertyObject == null) {
      new TypeError('Cannot convert undefined or null to object')
  }
  function F() {}
  F.prototype = proto
  const obj = new F()
  if (propertyObject != undefined) {
      Object.defineProperties(obj, propertyObject)
  }
  if (proto === null) {
      // 创建一个没有原型对象的对象，Object.create(null)
      obj.__proto__ = null
  }
  return obj
}

Object.assign2 = function(target, ...source) {
  if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
  }
  let ret = Object(target) 
  source.forEach(function(obj) {
      if (obj != null) {
          for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                  ret[key] = obj[key]
              }
          }
      }
  })
  return ret
}

function jsonStringify(data) {
  let dataType = typeof data;
  
  if (dataType !== 'object') {
      let result = data;
      //data 可能是 string/number/null/undefined/boolean
      if (Number.isNaN(data) || data === Infinity) {
          //NaN 和 Infinity 序列化返回 "null"
          result = "null";
      } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
          //function 、undefined 、symbol 序列化返回 undefined
          return undefined;
      } else if (dataType === 'string') {
          result = '"' + data + '"';
      }
      //boolean 返回 String()
      return String(result);
  } else if (dataType === 'object') {
      if (data === null) {
          return "null"
      } else if (data.toJSON && typeof data.toJSON === 'function') {
          return jsonStringify(data.toJSON());
      } else if (data instanceof Array) {
          let result = [];
          //如果是数组
          //toJSON 方法可以存在于原型链中
          data.forEach((item, index) => {
              if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                  result[index] = "null";
              } else {
                  result[index] = jsonStringify(item);
              }
          });
          result = "[" + result + "]";
          return result.replace(/'/g, '"');
          
      } else {
          //普通对象
          /**
           * 循环引用抛错(暂未检测，循环引
           * symbol key 忽略
           * undefined、函数、symbol 为属性值，被忽略
          */
          let result = [];
          Object.keys(data).forEach((item, index) => {
              if (typeof item !== 'symbol') {
                  //key 如果是symbol对象，忽略
                  if (data[item] !== undefined && typeof data[item] !== 'function'
                      && typeof data[item] !== 'symbol') {
                      //键值如果是 undefined、函数、symbol 为属性值，忽略
                      result.push('"' + item + '"' + ":" + jsonStringify(data[item]));
                  }
              }
          });
          return ("{" + result + "}").replace(/'/g, '"');
      }
    }
}

const RESOLVED = 'resolved'
const PENDING = 'pending'
const REJECT = 'reject'

function MyPromise(fn) {
  this.currentStatus = PENDING

  this.value = undefined
  this.reason = undefined

  this.resoveldCallbacks = []
  this.rejectdCallbacks = []

  this.resolve = function(value) {
    if(value instanceof MyPromise) {
      return value.then(this.resolve, this.reject)
    }
    setTimeout(() => {
      if(this.currentStatus === PENDING) {
        this.currentStatus = RESOLVED
        this.value = value
        this.resoveldCallbacks.forEach(cb => cb())
      }
    })
  }

  this.reject = function(reason) {
    setTimeout(() => {
      if(this.currentStatus === PENDING) {
        this.currentStatus = REJECT
        this.reason = reason
        this.rejectdCallbacks.forEach(cb => cb())
      }
    })
  }

  try {
    fn(this.resolve, this.reject)
  } catch (error) {
    this.reject(e)
  }
}

MyPromise.prototype.then = function(onResolved, onRejectd) {

  const self = this
  let promise2 = undefined

  onResolved = typeof onResolved === 'function' ? onResolved : v => v
  onRejectd =  typeof onRejectd === 'function' ? onRejectd : r => throw r

  if(self.currentStatus === RESOLVED) {
    return (
      promise2 = new MyPromise(function(resove, reject) {
        setTimeout(function() {
          try {
            const x = onResolved(self.value)
            resolutionProcedure(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      })
    )
  }
  if(self.currentStatus === REJECT) {
    return (
      promise2 = new MyPromise(function(resove, reject) {
        setTimeout(function() {
          try {
            const x = onRejectd(self.value)
            resolutionProcedure(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      })
    )
  }
  if(self.currentStatus === PENDING) {
    return (
      promise2 = new MyPromise(function(resove, reject) {
        self.resoveldCallbacks.push(function() {
          try {
            const x = onResolved(self.value)
            resolutionProcedure(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })

        self.rejectdCallbacks.push(function() {
          try {
            const x = onRejectd(self.value)
            resolutionProcedure(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      })
    )
  }
}

function resolutionProcedure(promise, x, resolve, reject) {
  // 判断是否循环引用
  if(promise === x) {
    return reject(new TypeError('Error'))
  }
  // 是否是 promise 实例
  if(x instanceof MyPromise) {
    if(x.currentStatus === PENDING) {
      x.then(function(value) {
        resolutionProcedure(promise, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }

  let called = false
  // 鸭子辩型
  if( x !== null && (typeof x === 'object' || typeof x === 'function')) {

    try {
      const then = x.then

      if(typeof then === 'function') {
        then.call(x, y => {
          if(called) return 
          called = true
          resolutionProcedure(promise, y, resolve, reject)
        }, e => {
          if(called) return 
          called = true
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if(called) return;
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.resolve2 = function(value) {
  if(value instanceof Promise) return value
  return new Promise((resolve, reject) => {
    if(param && param.then && typeof param.then === 'function') {
      param.then(resolve, reject)
    } else {
      resolve(param)
    }
  })
}

Promise.prototype.reject2 = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.prototype.finally = function(callback) {
  return this.then(value => {
    return new Promise.then(callback).then(() => {
      return value
    })
  }, error => {
    return new Promise.then(callback).then(() => {
      throw error
    })
  })
}

promise.prototype.all = function (promises) {
  return new Promise((resolve, reject) => {
    let result = []
    let index = 0
    let length = promises.length
    if(length === 0) {
      return result
    }
    for(let i = 0; i < length; i++) {
      Promise.resolve(promise[i]).then(value => {
        result[index] = value
        index++
        if(index === length) resolve(result)
      }).catch(error => {
        reject(error)
      })
    }
  })
}

promise.prototype.allSettle = function(iterable) {
  return new Promise(function(resolve, reject) {

    function addElementToResult (i, ele) {
      result[i] = ele
      elementCount++
      if(elementCount === result.length) {
        resolve(result)
      }
    }

    let index = 0
    let elementCount = 0
    const result = new Array(iterable.length)

    for(const promise of iterable) {
      const currentIndex = index

      promise.then(
        (value) => addElementToResult(
          currentIndex, {
            status: 'fulfilled',
            value
          }),
        (reason) => addElementToResult(
          currentIndex, {
            status: 'rejected',
            reason
          }));
      index++;
    }

    if(index === 0) {
      resolve([])
      return
    }
    
  })
}

Promise.prototype.race2 = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;

    if(len === 0) return;

    for(let i = 0; i < len; i++) {
      Promise.resolve(promise[i]).then(data => {
        resolve(data);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}

Promise.prototype.any = function(promises) {
  let index = 0
  return new Promise((resolve, reject) => {

      if (promises.length === 0) return 

      for(let i = 0; i < promises.length; i++) {

        Promise.resolve(promise[i]).then(value => {
          resolve(value)
        }, error => {
          index++
          if (index === promises.length) {
            reject(new AggregateError('All promises were rejected'))
          }
        })

      }
  })
}

// 中间件
function compose(ctx, middlewares) {
  if(!Array.isArray(middlewares)) {
    throw new TypeError('middlewares stack must be an array')
  }
  // {2}
  for (const fn of middlewares) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }
  
  return function() {
    const len = middlewares.length; // {3} 获取数组长度
    const dispatch = function(i) { // {4} 这里是我们实现的关键
      if (len === i) { // {5} 中间件执行完毕
        return Promise.resolve();
      } else {
        const fn = middlewares[i]; // {6}
        
        try {
          // {7} 这里一定要 bind 下，不要立即执行
          return Promise.resolve(fn(ctx, dispatch.bind(null, (i + 1))));
        } catch (err) {
          // {8} 返回错误
          return Promise.reject(err);
        }
      }
    }
    return dispatch(0);
  }
}

// call 实现

Function.prototype.myCall = function(context = window, ...args) {
  let fn = Symbol('')
  context[fn] = this
  const res = context[fn](...args)
  delete context[fn]
  return res
}

// apply 实现
Function.prototype.myApply = function(context = window, ...args) {
  let fn = Symbol('')
  context[fn] = this
  let res 
  if(args.length === 0) {
    res = context[fn]()
  } else {
    res = context[fn](args)
  }
  delete context[fn]
  return res
}

// bind 实现

Function.prototype.myBind = function(context = window, ...args) {
  if(typeOf this !== function) {
    return new Error()
  }
  let self = this
  
  const FNOP = function () {}

  const fBound = function(...innerArgs) {
    args = [...args, ...innerArgs]
    return self.apply(this instanceof FNOP ? this, context, args)
  }

  FNOP.prototype = this.prototype
  fBound.prototype = new FNOP()
  return fBound
}

// Object.assign 模拟实现 浅拷贝
if(typeof Object.assign2 !== 'function') {
  Object.defineProperty(Object, "assign2", {
    value: function(target) {
      'use strict'
      if(target === null) {
        throw new Error()
      }

      const to = Object(target)

      for(let index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {  // Attention 2
          // Attention 4
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  })
}

// 最长递增子序列
const lengthOfLIS = function(nums) {
  let n = nums.length;
  if (n == 0) {
      return 0;
  }
  let dp = new Array(n).fill(1);
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
          if (nums[j] < nums[i]) {
              dp[i] = Math.max(dp[i], dp[j] + 1);
          }
      }
  }
  return Math.max(...dp) 
}

// 
const lengthOfLIS = function(nums) {
  let len = nums.length;
  if (len <= 1) {
      return len;
  }
  let tails = [nums[0]];
  for (let i = 0; i < len; i++) {
      // 当前遍历元素 nums[i] 大于 前一个递增子序列的 尾元素时，追加到后面即可
      if (nums[i] > tails[tails.length - 1]) {
          tails.push(nums[i]);
      } else {
          // 否则，查找递增子序列中第一个大于当前值的元素，用当前遍历元素 nums[i] 替换它
          // 递增序列，可以使用二分查找
          let left = 0;
          let right = tails.length - 1;
          while (left < right) {
              let mid = (left + right) >> 1;
              if (tails[mid] < nums[i]) {
                  left = mid + 1;
              } else {
                  right = mid;
              }
          }
          tails[left] = nums[i];
      }
  }
  return tails.length;
};

const lengthDemo = function(nums) {
  let length = nums.length
  if(len <= 1) return len
  let tails = [nums[0]]
  for(let i = 0; i < len; i++) {
    if(nums[i] > tails[tails.length - 1]) {
      tails.push(nums[i])
    } else {
      let left = 0
      let right = tails.length - 1
      while(left < right) {
        let mid = (left + right) >> 1
        if(tails[mid] < nums[i]) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      tails[left] = nums[i]
    }
  }
  return tails.length
}

// 异步串行 promise
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const subFlow = createFlow ([() => delay(1000).then(() => console.log('c'))])

createFlow([
  () => log('a'),
  () => log('b')
  subFlow,
  [() => delay(1000).then(() => console.log('d'), () => log('e'))]
]).run(() => {
  console.log('done')
})

function createFlow(effects) {
  const sources = effects.slice().flat()

  function run (callback) {
    
    while(sources.length) {
      const task = sources.shift()
      const next = () => createFlow(sources).run(callback)

      if(typeof task === 'function') {
        const res = task()
        if(res?.then) {
          res.then(next)
          return
        }
      } else if(task.isFlow) {
        task.run(next)
        return
      }
    }
    callback?.()
  }
  return {
    run,
    isFlow: true
  }
}

// function createFlow(effects = []) {
//   // 浅拷贝参数 & 扁平化
//   let sources = effects.slice().flat()
//   function run(callback) {
//     while(sources.length) {
//       const task = sources.shift()
//       const next = () => createFlow(sources).run(callback)
//       if(typeof task === 'function') {
//         const res = task()
//         if(res?.then) {
//           res.then(next)
//           return
//         } 
//       } else if(task?.isFlow) {
//         task.run(next)
//         return 
//       }
//     }
//     // sources 中的所有任务执行结束 执行callback
//     callback?.()
//   }
//   return {
//     run,
//     isFlow: true
//   }
// }

// 手写 promise

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECT = 'REJECT'

function MyPromise(fn) {
  this.value = undefined
  this.error = undefined
  this.status = PENDING
  this.onFulFilledCallbacks = []
  this.onRejectedCallbacks = []

  function resolve(value) {
    if(value instanceof MyPromise) {
      return value.then(resolve, reject)
    }
    if(this.status === PENDING) {
      setTimeout(() => {
        this.status = FULFILLED
        this.value = value
        this.onFulFilledCallbacks.forEach(callback => callback(this.value))
      },0)
    }
  }

  function reject(error) {
    if(this.status === PENDING) {
      setTimeout(() => {
        this.status = REJECT
        this.error = error
        this.onRejectedCallbacks.forEach(callback => callback(this.value))
      },0)
    }
  }

  try {
    fn(resolve, reject)
  } catch (err){
    reject(err)
  }
}

MyPromise.prototype.then = function(onFulFilled, onRejectd) {
  const self = this
  onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : (value) => value
  onRejectd = typeof onRejectd === 'function' ? onRejectd : error => throw error
  let bridgePromise
  if(self.status === PENDING) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push((error) => {
          try {
            let x = onRejected(error);
            resolvePromise(bridgePromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
      });
    })
  }
  if(self.status === FULFILLED) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
          try {
              let x = onFulfilled(self.value);
              resolvePromise(bridgePromise, x, resolve, reject);
          } catch (e) {
              reject(e);
          }
      }, 0);
    })
  }
  if(self.status === REJECT) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
          try {
              let x = onRejected(self.error);
              resolvePromise(bridgePromise, x, resolve, reject);
          } catch (e) {
              reject(e);
          }
      }, 0);
    });
  }
}

function resolvePromise(bridgePromise, x, resolve, reject) {
  //2.3.1规范，避免循环引用
  if (bridgepromise === x) {
    return reject(new TypeError('Circular reference'));
  }
  let called = false;
  if(x instanceof MyPromise) {
    if(x.status === PENDING) {
      x.then(y => {
          resolvePromise(bridgepromise, y, resolve, reject);
      }, error => {
          reject(error);
      })
    } else {
      x.then(resolve, reject)
    }
  } else if(x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {

    try {
      // 是否是thenable对象（具有then方法的对象/函数）
      //2.3.3.1 将 then 赋为 x.then
      let then = x.then;
      if (typeof then === 'function') {
        //2.3.3.3 如果 then 是一个函数，以x为this调用then函数，且第一个参数是resolvePromise，第二个参数是rejectPromise
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(bridgepromise, y, resolve, reject);
        }, error => {
          if (called) return;
          called = true;
          reject(error);
        })
      } else {
        //2.3.3.4 如果 then不是一个函数，则 以x为值fulfill promise。
          resolve(x);
      }
    } catch (e) {
      //2.3.3.2 如果在取x.then值时抛出了异常，则以这个异常做为原因将promise拒绝。
      if (called) return;
      called = true;
      reject(e);
    }
    
  } else {
    resolve(x)
  }
}

// 迭代器
function createIterator(items) {
  let i = 0
  return {
    next: function() {
      let done = (i >= items.length)
      let value = done ? undefined : items[i++]
      return {
        done,
        value
      }
    }
    [Symbol.iterable]: function* () {
      for (const key in this) {
          if (this.hasOwnProperty(key)) {
              yield [key, this[key]]
          }
      }
    }
  }
}

// async 实现
function spawn(genFn) {
  return new Promise((resolve, reject) => {
    
    const gen = genFn()

    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch(e) {
        reject(e)
      }

      if(next.done) {
        return resolve(next.value)
      } 

      Promise.resolve(next.value).then(function(v) {
        step(function () { return gen.next(v) })
      }, function(e) {
        step(function () {return gen.throw(e) })
      })
    }

    step(function() { return gen.next(undefined) })
  })
}


function red () {
  log('red')
}
function green() {
  log('green')
}

function yellow() {
  log('yellow')
}

const light = (timer, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}
function step() {
  return  Promise.resolve().then(() => {
    return step(1000, red)
  }).then(() => {
    return step(2000, green)
  }).then(() => {
    return step(3000, yellow)
  }).then(() => {
    return step()
  })
}

step()

function debounce(fn, wait, immediate) {
  let timer
  const result
  function debounced() {
    const context = this
    const args = [...arguments]
    if(timer) clearTimeout(timer)
    if(immediate) {
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      },wait)
      if(callNow) result = fn.apply(context, args)
    } else {
      
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timer)
  }
  return debounced
}

function throttle(fn, wait) {
  let timer
  return function() {
    const context = this
    const args = [...arguments]

    if(!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, wait)
    }
  }
}

function throttleRAF(fn) {
  let requesetId
  const later = (args) => () => {
    fn(...args)
    cancelAnimationFrame(requesetId)
  }
  const throtted = (...args) => {
    if(!requesetId) {
      requesetId = requestAnimationFrame(later(args))
    }
  }
  throtted.cancel = () => cancelAnimationFrame(requesetId)
  return throtted
}

Function.prototype.call2 = function(context = window) {
  const fn = Symbol('fn')
  context[fn] = this
  const args = [...arguments].slice(1)
  const result = context[fn](...args)
  delete context[fn]
  return result
}
Function.prototype.apply2 = function(context = window) {
  const fn = Symbol('fn')
  context[fn] = this
  const args = [...arguments].slice(1)
  let result
  if(!args.length) {
    result = context[fn]()
  } else {
    context[fn](...args)
  }
  delete context[fn]
  return result
}

Function.prototype.bind2 = function(context) {
  if(typeof this !== 'function') {
    return new Error('error')
  }
  const args = [...arguments].slice(1)
  const self = this
  function fNop () {}
  function fBound() {
    const innerArgs =  [...arguments].slice(1)

    return self.apply(this instanceof fNop ? this : context, args.concat(innerArgs))
  }
  fNop.prototype = this.prototype
  fBound.prototype = new fNop()
  return fBound
}

function new() {
  const args = [...arguments]
  const Con = args.shift()
  const obj = Object.create(Con.prototype)

  const res = Con.apply(obj, args)
  return res instanceof Object ? res : obj
}

function instance(left, right) {
  right = right.prototype

  while(true) {
    if(left === null) {
      return false
    } else (left === right) {
      return true
    } else {
      left = Object.getPrototypeOf(left)
    }
  }
}

function deepClone(target, map = new Map()) {
  if(typeof target !== 'object' || obj === null) {
    return obj
  }

  if(map.has(target)) return map.get(target)
  let copy = Array.isArray(target) ? [] : {}
  Object.keys(target).forEach(key => {
    copy[key] = deepClone(target[key])
  })
  map.set(target, copy)
  return copy
}

function deeepCopyBFS (origin) {
  const queue = []
  const map = new Map()
  
  let target = Array.isArray(origin) ? [] : {}

  if(target !== origin) {
    queue.push([origin, target])
    map.set(origin, target)
  }

  while(queue.length) {
    let [ori, tar] = queue.shift()
    for(let key in ori) {
      if(map.get(ori[key])) {
        tar[key] = map.get(ori[key])
        continue
      }
      tar[key] =  Array.isArray(ori[key]) ? [] : {}
      if(tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]])
        map.set(ori[key], tar[key])
      }
    }
  }

  return target
}

function deepCopyDFS(origin){
	let stack = [];
	let map = new Map(); // 记录出现过的对象，用于处理环

	let target = getEmpty(origin);
	if(target !== origin){
		stack.push([origin, target]);
		map.set(origin, target);
	}

	while(stack.length){
		let [ori, tar] = stack.pop();
		for(let key in ori){
			// 处理环状
			if(map.get(ori[key])){
				tar[key] = map.get(ori[key]);
				continue;
			}

			tar[key] = getEmpty(ori[key]);
			if(tar[key] !== ori[key]){
				stack.push([ori[key], tar[key]]);
				map.set(ori[key], tar[key]);
			}
		}
	}

	return target;
}

function curry(fn, ...args) {
  let length = fn.length
  return function() {
    const innerargs = [...args, ...arguments]
    if (innerargs.length < length) {
      return curry.call(this, fn, ...innerargs)
    } else {
      return fn.apply(this, innerargs)
    }
  }
}

Promise.all = function(promiseArr) {
  let index = 0, result = []
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        index++
        result[i] = val
        if(index === promiseArr.length) {
          resolve(result)
        }
      }, err => {
        reject(err)
      })
    })
  })
}

class Scheduler {
  constructor(limit) {
    this.queue = []
    this.maxCount = limit
    this.runCounts = 0
  }

  add(time, order) {
    const promiseCreator = () => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          console.log(order)
          resolve()
        }, time)
      })
    }

    this.queue.push(promiseCreator)
  }

  taskStart() {
    for(let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }
  request() {
    if(!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return
    }

    this.runCounts++

    this.queue.shift()().then(() => {
      this.runCounts--
      this.request()
    })
  }
}

function asyncAdd(a, b, callback) {
  setTimeout(function() {
    callback(null, a + b)
  }, 500)
}

const promiseAdd = (a, b) => new Promise((resolve, reject) => {
  asyncAdd(a, b, (err, res) => {
    if(err) {
      reject(err)
    } else {
      resolve(res)
    }
  })
})

// 异步串行
async function serialSum(...args) {
  return args.reduce((task, now) => task.then(res => promiseAdd(res, now), Promise.resolve(0)))
}

// 异步并行
async function parallelSum(...args) {
  if(args.length === 1) return args[0]
  const tasks = []
  for(let i = 0; i < args.length; i += 2) {
    tasks.push(promiseAdd(args[i], args[i + 1] || 0))
  }
  const result = await Promise.all(tasks)
  return parallelSum(...results)
}
(async () => {
  console.log('Runing...')
  const res1 = await serialSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
  console.log(res1)
  const res2 = await parallelSum(1, 2, 3, 4, 5, 8, 9, 10, 11, 12)
  console.log(res2)
  console.log('Done');
})

function limitRunTasks(tasks, n) {
  return new Promise((resolve, reject) => {
    let index = 0
    let finish = 0
    let start = 0
    let res = []

    function run() {
      if(finish === tasks.length) {
        resolve(res)
        return
      }

      while(start < n && index < tasks.length) {
        start++
        let cur = index
        tasks[index++]().then(value => {
          res[cur] = value
          start--
          finish++
          fun()
        })
      }
    }
  })
}



function Asyncfn(genfn) {
  return new Promise((resolve, reject) => {

    const gen = genfn
    function step(nextF) {
      let next
      try {
        next = nextF
      } catch(e) {
        return reject(e)
      }

      if(next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(val => {
        step(function() {return gen.next(val)})
      }, err => {
        step(function() {return gen.throw(err)})
      })
    }

    step(function() { return gen.next(undefined) })
  })
}

class Scheduler {
  constructor(limit, count = 0) {
    this.queue = []
    this.limit = limit
    this.runcount = count
  }
  addTask(timer, order) {
    const promiseCreator = new Promise((resolve, reject) => {
      setTimeout(function() {
        console(order)
        resolve()
      }, timer)
    })
    this.queue.push(promiseCreator)
  }
  taskStart() {
    for(let i = 0; i < this.limit; i++) {
      this.request()
    }
  }
  request() {
    if(!this.queue || this.queue.length || this.runcount >= this.limit) {
      return
    }
    this.runcount++
    this.queue.shift()().then(() => {
      this.runcount--
      this.request()
    })
  }
}


function asyncToGenerator(generatorFn) {
  return function() {
    const gen = generatorFn.apply(this, arguments)

    return new Promise((resolve, reject) => {
      step('next')

      function step(key, args) {
        let next
        try {
          next = gen[key](args)
        } catch(err) {
          return reject(err)
        }

        const { value, done } = next

        if(done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
        }
      }
    })
  }
}

function limit(count, array, iterateFunc) {
  const tasks = []
  const doingTasks = []

  let i = 0

  const enqueue = () => {
    if(i === array.length) {
      return Promise.resolve
    }
    const task = Promise.resolve().then(() => {iterateFunc(array[i++])})

    tasks.push(task)
    const doingTask = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))
    doingTasks.push(doingTask)

    const res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve
    return res.then(enqueue)
  }

  return enqueue().then(() => Promise.all(tasks))
}

function limitRunTask(tasks, limit) {
  return new Promise((resolve, reject) => {
    let index = 0
    let start = 0
    let finish = 0
    let res = []
    
    run()

    function run() {
      if(finish === tasks.length) {
        return resolve(res)
      }

      while(start < limit && index < tasks.length) {
        start++

        let cur = index

        tasks[index++]().then(v => {
          start--
          finish++
          res[cur] = v
          run()
        })
      }
    }
  })
}


function compose(middlewares) {
  return function (context, next) {
    let index = -1;

    function dispatch(i) {

      if(i <= index) {
        return Promise.reject(new Error())
      }
      index = i
      let fn = middlewares[i]
      if(i === middlewares.length) fn = next
      if(!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

function compose(middlewares) {
  return function(context, next) {

    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if(i <= index) {
        return new Error()
      }

      index = i
      let fn = middlewares[i]
      if(i === middlewares.length) fn = next
      if(!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch(err) {
        return Promise.reject(err)
      }
    }
  }
}