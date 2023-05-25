/* 手写练习 */
//  防抖 & 节流
function debounce(fn, wait, immediate) {
  let timer, result, callNow
  function debounced () {
    const context = this
    const args = [...arguments]
    if(timer) clearTimeout(timer)
    if(immediate) {
      callNow = !timer
      timer = setTimeout(function() {
        clearTimeout(timer)
        timer = null
      }, wait)
      if(callNow) result = fn.apply(context, args)
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, wait)
    }
    
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

function throttle(fn, wait) {
  let timer
  return function() {
    const context = this
    const args = [...arguments]
    if (!timer) {
      timer = setTimeout(function() {
        fn.apply(context, args)
        clearTimeout(timer)
      }, wait)
    }
  }
}

function throttleByAnimation(fn) {
  let requestId
  const later = (arg) => () => {
    requestId = null
    fn(...args)
  }

  const throttled = (...args) => {
    if(requestId === null) {
      requestId = requestAnimationFrame(later(args))
    }
  }

  throttled.cancel = () => cancelAnimationFrame(requestId)
  return throttled
}

// call apply bind
Function.prototype.call2 = function(context = window) {
  let key = Symbol('key')
  const fn = this
  context[key] = fn
  const args = [...arguments].slice(1)
  let res = context[key](...args)
  delete context[key]
  return res
}

Function.prototype.apply = function(context = window) {
  let key = Symbol('key')
  const fn = this
  context[key] = fn
  const args = [...arguments].slice(1)
  let res
  if(args.length) {
    res = context[key](args)
  } else {
    res = context[key]()
  }
  delete context[key]
  return res
}

Function.prototype.bind2 = function(context = window) {
  if(typeof this !== 'function') {
    return new TypeError('必须是函数')
  }
  const fn = this
  const args = [...arguments].slice(1)
  function FNOP() {}
  function fBound() {
    const innerArgs = [...arguments]
    return fn.apply(this instanceof FNOP ? this : context, [...args, ...innerArgs])
  }
  FNOP.prototype = this.prototype
  fBound.prototype = new FNOP()
  return fBound
}

function myNew () {
  const args = [...arguments]
  const Const = args.shift()
  const obj = Object.create(Const.prototype)
  let res = Const.apply(obj, args)
  return typeof res === 'object' ? res : obj
}

function instanceOf2 (left, right) {
  right = right.prototype
  while(true) {
    if(left === null) {
      return false
    } else if(right === Object.getPrototypeOf(left)) {
      return true
    } else {
      left = Object.getPrototypeOf(left)
    }
  }
}

function deepClone(source, map = new Map) {
  if(source !== null && typeof source !== 'object') return source
  if(map.has(source)) return map.get(source)

  const target = Array.isArray(source) ? [] : {}
  Object.keys(source).forEach(key => {
    target[key] = deepClone(source[key], map)
  })
  map.set(source, target)
  return target
}

function getEmpty(o) {
  if(Object.prototype.toString.call(o) === '[object Array]') {
    return []
  }
  if(Object.prototype.toString.call(o) === '[object Object]') {
    return {}
  }
  return o
}

function deepCloneBFS(origin) {
  const queue = []
  const map = new Map()

  let target = getEmpty(origin)

  if(target !== origin) {
    queue.push([origin, target])
    map.set(origin, target)
  }

  while(queue.length) {
    let [ori, tar] = queue.shift()
    Object.keys(ori).forEach(key => {
      if(map.has(ori[key])) {
        tar[key] = map.get(ori[key])
        continue;
      }
      tar[key] =  getEmpty(ori[key])
      if(tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]])
        map.set(ori[key], tar[key])
      }
    })
  }
  return target
}


// 柯里化
function curry(fn) {
  const args = [...arguments].slice(1)
  let length = fn.length
  return function() {
    let innerArgs = [...args, ...arguments]
    if(innerArgs.length === length) {
      return fn.apply(this, innerArgs)
    } else {
      return fn.call(this, fn, ...args)
    }
  }
}

// 实现 EventBus
class EventBus {
  constructor() {
    this.cache = {}
  }
  on(name, fn) {
    if(this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = fn
    }
  }

  off(name, fn ) {
    const tasks = this.cache[name]
    if(tasks) {
      const index = tasks.findIndex(f => f === fn || f.callback === fn)
      if(index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }

  emit(name, ...args) {
    if(this.cache[name]) {
      const tasks = this.cache[name]
      for(let fn of tasks) {
        fn(...args)
      }
    }
  }
}

// 手写 promise
const PNEDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Mypromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallback = []
    this.onRejectCallback = []

    const resolve = function(value) {
      if(this.status === PENDINT) {
        setTimeout(function() {
          this.status = FULFILLED
          this.value = value
          this.onResolvedCallback.forEach(fn => fn(this.value))
        })
      }
    }

    const reject = function(reason) {
      if(this.status === PENDING) {
        setTimeout(function() {
          this.status = REJECTED
          this.reason = reason
          this.onRejectCallback.forEach(fn => fn(this.reason))
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => throw err
    const self = this
    let promise2 
    if(this.status === PENDING) {
      promise2 = new Mypromise(function(resolve, reject) {
        this.onResolvedCallback.push(function() {
          setTimeout(function() {
            try {
              let x = onFulFilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch(err) {
              reject(err)
            }
          })
        })
  
        this.onRejectCallback.push(function() {
          setTimeout(function() {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch(err) {
              reject(err)
            }
          })
        })
      })
    }
    if(this.status === FULFILLED) {
      promise2 = new MyPromsie(function(resolve, reject) {
        setTimeout(function() {
          try {
            let x = onFulFilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      })
    }
    if(this.status === REJECTED) {
      promise2 = new MyPromsie(function(resolve, reject) {
        promise2 = new MyPromsie(function(resolve, reject) {
          setTimeout(function() {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
      })
    }

    return promise2
  }

}

function resolvePromise(promise, x, resolve, reject) {
  if(promise === x) {
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"))
  }

  let called 
  if(typeof x === 'object' && x !== null || typeof x === 'function') {
    try {
      let then = x.then
      if(typeof then === 'function') {
        then.call(x, y => {
          if(called) return
          called = true
          resolvePromise(promise, y, resolve, reject)
        }, r => {
          if(called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (err) {
      if(called) return
      called = true
      reject(err)
    }
  } else {
    // 如果 x 是个普通的函数值就直接返回 resolve 作为结果
    resolve(x)
  }
}

MyPromise.resolve = function(fn) {
  if(fn instanceof myPromise) {
    return fn
  }
  return new Promsie(function(resolve, reject) {
    resolve(fn)
  })
}

Promise.reject = function(fn) {
  return new Promsie(function(resolve, reject) {
    reject(fn)
  })
}

Promise.all = function(promises) {

  return new Promise(function(resolve, reject) {
    let result = []
    let index = 0
    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promisesp[i]).then(res => {
        result[i] = res
        index++
        if(index === promises.length) {
          resolve(result)
        }
      }).then(err => {
        reject(err)
      })
    }
  })
}

Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    }
  })
}

Promise.allSettled = function(promises) {
  let result = []

  return new Promsie(function(resolve, reject) {
    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promsies[i]).then(val => {
        result.push({
          status: 'fulfilled',
          value: val
        })
        if(result.length === promises.length) {
          resolve(result)
        }
      }, err => {
        result.push({
          status: 'rejected',
          reason: err
        })
        if(result.length === promises.length) {
          resolve(result)
        }
      })
    }
  })
}

Promise.any = function(promises) {
  let index = 0
  return new Promsie(function(resolve, reject) {
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        resolve(val)
      }, err=> {
        index++
        if(index === promises.length) {
          reject(new AggregateError('All promises were rejected'))
        }
      })
    })
  })
}

// sleep
function sleep (wait) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve
    }, wait)
  })
}

// generatorFn

function generator(cb) {
  return (function() {
    let object = {
      next: 0,
      stop: function() {}
    }

    return {
      next: function() {
        const next = cn(obj)
        if(next === undefined) return {value: undefined, done: true}
        return {
          value: next.value,
          done: false
        }
      },
      [Symbol.iterator]: function*() { 
        for (const key in this) {
          if (this.hasOwnProperty(key)) {
              yield [key, this[key]]
          }
        } 
      }
    }
  })()
}

// async
function asyncFn(genFn) {
  return new Promise(function(resolve, reject) {
    let gen = genFn()
    step(function() {return gen.next(undefined)})
    function step(callback) {
      const next

      try {
        next = callback()
      } catch(err) {
        reject(err)
      }

      if(next.done) {
        resolve(next.value)
      }

      Promise.resolve(next.value).then(function(v) {
        return step(function() { return gen.next(v)})
      }, function(e) {
        return step(function() {gen.throw(e)})
      })
    }
  })
}

// 并行异步
/* 
  addTask(1000,"1");
  addTask(500,"2");
  addTask(300,"3");
  addTask(400,"4");
  的输出顺序是：2 3 1 4

  整个的完整执行流程：

  一开始1、2两个任务开始执行
  500ms时，2任务执行完毕，输出2，任务3开始执行
  800ms时，3任务执行完毕，输出3，任务4开始执行
  1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
  1200ms时，4任务执行完毕，输出4
 */

class Scheduler {
  constructor(limit) {
    this.tasks = []
    this.limit = limit
    this.runTask = 0
  }

  addTask(wait, log) {
    const task = new Promise((resolve, reject) => {
      setTimeout(function() {
        console.log(log)
      }, wait)
    })

    this.tasks.push(task)
  }

  startTask() {
    for(let i = 0; i < this.limit; i++) {
      this.request()
    }
  }

  request() {
    if(!this.tasks.length ||this.runTask > this.limit) {
      return
    }
    this.runTask++
    this.tasks.shift()()
      .then(() => {
        this.runTask--
        this.request()
      })
  }
}

// 数组转树

function convert(source, parentId) {
  const target = []
  for(let i = 0; i < source.length; i++) {
    const children = convert(source, source[i].id)
    if(source[i].parentId === parentId) {
      if(children.length) {
        source[i].children = children
      }
      target.push(source[i])
    }
  }
}


// 解析Url
function  parseURL(url) {
  const paramStr = /.+|?(.+)$/.exec(url)[1]
  const paramsArr = paramStr.split('&')
  const pramObj = {}

  param.forEach(param => {
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
// JSONP
const jsonp = function({callback, url, params}) {
  const generateUrl = () => {
    let dataSrc = ''
    for(let key in params) {
      if(params.hasOwnProperty(key)) {
        dataSrc += `${key}=${params[key]}`
      }
    }
    dataSrc += `callback = ${callback}`
    return `${url}?${dataSrc}`
  }
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    scriptEle.src = url
    document.body.appendChild(scriptEle)
    window[callback] = function(data) {
      resolve(data)
      document.removeChild(script)
    }
  })
}

// Object.create

Object.create2 = function(proto, propertyObject) {
  if(typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null')
  }
  if(propertyObject == null) {
    new TypeError('')
  }
  function F() {}
  F.prototype = proto
  const obj = new F()
  if (propertyObject != undefined) {
    Object.defineProperties(obj, propertyObject)
  } 
  if(proto === null) {
    obj.__proto__ = null
  }
  return obj
}

Object.assign = function(target, ...source) {
  if(target === null) {
    throw new Error('')
  }

  let res = Object(target)
  source.forEach(function(obj) {
    if (obj != null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = obj[key]
        }
      }
    }
  })
}

function is(x, y) {
  if(x === y) {
    return x !== 0 || y !== 0 || 1/x === 1/y
  } else {
    return x !== x && y !== y
  }
}

function isEqual(obj1, obj2) {
  if(!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }

  if(obj1 === obj2) {
    return true
  }

  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)

  if(obj1Keys.length !== obj2Keys.length) {
    return false
  }
  for(let key in obj) {
    if(!isEqual(obj1[key], obj2[key])) {
      return false
    }
  }
  return true
}

function compose(context, middlewares) {
  if()
  return function() {
    const length = middlewares.length
    return dispatch(0)
    function dispatch() {
      if(length === i) {
        return Promise.resolve()
      } else {
        const fn = middlewares[i]

        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }
}

const lengthOfLIS = function(nums) {
  let len = nums.length
  if(len <= 1) {
    return len
  }
  let tails = [nums[0]]

  for(let i = 1; i < len; i++){
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
      tails[left] = nusm[i]
    }
  }
  return tails.length
}

// 图片懒加载
let imgs = document.getElementsByClassName('.img')

const observer = new IntersectionObserver(function(entries) {
  for(let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const imgElement = entry.target
    imgElement.src = imgElement.getAttribute('data-src')
    observer.unobserve(imgElement)
  }
}, {
  root,
  rootMargin,
  threshold
})

imgs.forEach(img => observer.observe(img))

function limit(count, array, iterateFunc) {
  const task = []
  const doingTask = []

  let i = 0

  const enqueue = () => {
    if(i === array.length) {
      return Promise.resolve()
    }

    const task = Promise.resolve().then(() => iterateFunc(array[i++]))
    tasks.push(task)
    const doingTask = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1))

    doingTask.push(doing)

    const res = doingTask.length >= count ? Promise.race(doingTask) : Promis.resove()

    return res.then(enqueue)
  }
  return enqueue().then(() => Promise.all(tasks))
}

function asyncAdd(a, b, callback) {
  setTimeout(function() {
    callback(null, a + b)
  }, 500)
}

const promiseAdd = (a, b) => new Promise(function(resolve, reject) {
  asyncAdd(a, b, (err, res) => {
    if(err) {
      reject(err)
    } else {
      resolve(res)
    }
  })
})

async function serialSum(...args) {
  return args.reduce((task, now) => task.then(res => promiseAdd(res, now)), Promise.resolve(0))
}

async function parallelSum(...args) {
  if(args.ength === 1) return args[0]
  const tasks = []
  for(let i = 0; i < args.length; i += 2) {
    tasks.push(promiseAdd(args[i], args[i + 1] || 0))
  }
  const results = Promise.all(tasks)
  return parallelSum(...results)
}

function limitRunTask(tasks, n) {

  return new Promise(function(resolve, reject) {
    let index = 0, finish = 0, start = 0, res = []
    
    function run() {
      if(finish == tasks.length) {
        resolve(res)
        return
      }

      while(start < n && index < tasks.length) {
        start++
        let cur = index
        tasks[index++]().then(v => {
          start--
          finish++
          res[curr] = v
          run()
        })
      }
    }
    run()
  })
}