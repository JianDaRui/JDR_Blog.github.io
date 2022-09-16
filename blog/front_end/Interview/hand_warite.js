// 防抖
function debounce(func, wait, immediate) {
  let timer, result;
  let debounce = function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null
      }, wait);
      if (callNow) result = func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        result = func.apply(context, args)
      }, wait)
    }
    return result;
  }
  debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }
  return debounce;
}
function debounce(func, wait, immediate) {
  let timer, result;
  let debounced = function() {
    let self = this;
    let args = arguments;
    let callNow;
    if(timer) clearTimeout(timer);
    
    if(immediate) {
      if(!timer) callNow = true;
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if(callNow) result = func.apply(self, args)
    } else {
      timer = setTimeout(() => {
        result = func.apply(self, args)
      }, wait)
    }
    
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null;
  }
  return debounced
}
// 节流
function throttle(func, wait) {
  var context, args;
  var previous = 0;

  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

function throttle(func, wait) {
  var timeout;

  return function () {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args)
      }, wait)
    }
  }
}

function throttle(func, wait) {
  var timeout, context, args, result;
  var previous = 0;

  var later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args)
  };

  var throttled = function () {
    var now = +new Date();
    //下次触发 func 剩余的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}

// 深浅拷贝；
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

let data = JSON.parse(JSON.stringify(data));

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function deepClone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }
  // 防止循环引用
  if (map.get(target)) {
    return target;
  }
  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    // map set object array args
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }
  map.set(target, cloneTarget);
  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepClone(value, map));
    });
    return cloneTarget;
  }
  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = deepClone(target[key], map);
  });

  return cloneTarget;
}

// EventBus;
function EventEmitter() {
  this._maxListeners = 10;
  this._events = Object.create(null);
}

// 向事件队列添加事件
// prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.addListener = function (type, listener, prepend) {
  if (!this._events) {
    this._events = Object.create(null);
  }
  if (this._events[type]) {
    if (prepend) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
};

// 移除某个事件
EventEmitter.prototype.removeListener = function (type, listener) {
  if (Array.isArray(this._events[type])) {
    if (!listener) {
      delete this._events[type]
    } else {
      this._events[type] = this._events[type].filter(e => e !== listener && e.origin !== listener)
    }
  }
};

// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function (type, listener) {
  const only = (...args) => {
    listener.apply(this, args);
    this.removeListener(type, listener);
  }
  only.origin = listener;
  this.addListener(type, only);
};

// 执行某类事件
EventEmitter.prototype.emit = function (type, ...args) {
  if (Array.isArray(this._events[type])) {
    this._events[type].forEach(fn => {
      fn.apply(this, args);
    });
  }
};

// 设置最大事件监听个数
EventEmitter.prototype.setMaxListeners = function (count) {
  this.maxListeners = count;
};
// instanceof
function myInstanceof(example, classFunc) {
  let prototype = Object.getPrototypeOf(example);
  while (true) {
    if (prototype === null) {
      return false;
    }
    if (prototype === classFunc.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(proto);
  }
}


function myNew(fn, ...args) {
  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, args);
  return typeof res === 'object' || typeof res === 'function' ? res : instance;
}

Function.prototype.myCall = function (context = window, ...args) {
  let key = Symbol();
  context[key] = this;
  let result = context[key](...args);
  delete context[key];
  return result;
}

Function.prototype.myApply = function (context = window, ...args) {
  let key = Symbol();
  context[key] = this;
  let result = context[key](args);
  delete context[key];
  return result;
}

function create(proto) {
  function F() {};
  F.prototype = proto;
  return new F();
}

// call 模拟实现
Function.prototype.call2 = function (context = window) {
  let fn = Symbol();
  context[fn] = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push[`arguments[${i}]`]
  }
  let result = eval('context.fn(' + args + ')');
  delete context.fn;
  return result;
}
// apply 模拟实现
Function.prototype.apply2 = function (context = window, arr) {
  context.fn = this;
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
// bind模拟实现
Function.prototype.bind2 = function (context) {
  if (this instanceof Function) {
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

// new的模拟实现
function objectFactory() {
  // 创建一个新的对象
  var obj = new Object(),
    Constructor = [].shift.call(arguments);
  // 改变对象原型
  obj.__proto__ = Constructor.prototype;
  // 改变对象this的指向
  var ret = Constructor.apply(obj, arguments);
  // 返回结果
  return typeof ret === 'object' ? ret : obj;
};

// 实现JSON。stringify;
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== 'object') {
    if (/'string'| 'undefined' | 'function' \/ .test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let isArray = Array.isArray(obj);
    for (let key in obj) {
      let val = obj[key];
      let type = typeof val;
      if (/'string'/ undefined / 'function'\/ .test(type)) {
        val = '"' + val + '"';
      } else {
        val = jsonStringify(val);
      }
      json.push((isArray ? "" : '"' + key + '":') + String(val))
    }
    return (isArray ? '[' : '{') + String(json) + (isArray ? ']' : '}')
  }
}

// JSON parse;
function jsonParse(opt) {
  return eval(`(${opt})`)
}

let json = (new Function('return' + jsonStr))();
// Promise.resolve的实现
Promise.resolve = (param) => {
  if (param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then === 'function') {
      param.then(resolve, reject);
    } else {
      resolve(param);
    }
  })
}
function resolve(param) {
  if(param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if(param && param.then && typeof param.then === 'function') {
      param.then(resolve, reject);
    } else {
      resolve(param);
    }
  })
}
// Promise.reject
Promise.reject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
Promise.reject = function(reason) => {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
// finally
Promise.finally = (callback) => {
  return this.then(value => {
    return Promise.resolve(callback()).then(() => {
      return value;
    })
  }, error => {
    return Promise.reject(callback()).then(() => {
      throw error;
    })
  })
}
Promise.finally = function(callback) {
  return this.then(value => {
    return Promise.resolve(callback()).then(() => value)
  }, reason => {
    return Promise.reject(callback()).then(() => reason)
  })
}
Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    let result = [];
    let len = promises.length;
    if (len === 0) {
      resolve(result);
      return;
    }
    let i = 0;
    while (i < len) {
      Promise.resolve(promises[i]).then(data => {
        result[i] = data;
        i++;
        if (i === len) resolve(result);
      }).catch(err => {
        reject(err);
      })
    }
  })
}
function all(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let len = promises.length;
    if(len === 0) {
      resolve(result)
      return;
    }
    let i = 0;
    while(i < len) {
      Promise.resolve(promises[i]).then(value => {
        result[i] = value;
        i++;
        if(i === len) resolve(result)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if (len === 0) return;
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(data => {
        resolve(data);
        return;
      }).catch(err => {
        reject(err);
        return;
      })
    }
  })
}

function parseParam(url) {
  const paramStr = /.+\?(.+)$/.exec(url)[1];
  const paramArr = paramStr.split('&');
  let paramsObj = {};
  paramArr.forEach(param => {
    if (/=/.test(param)) {
      let [key, val] = param.split('=');
      val = decodeURIComponent(val);
      val = /^\d+$/.test(val) ? parseFloat(val) : val;
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val)
      } else {
        paramsObj[key] = val;
      }
    } else {
      paramsObj[param] = true;
    }
  })
  return paramsObj;
}


function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;
  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return render(template, data)
  }
  return template;
}
function render(template, data) {
  let reg = /\{\{(\w+)\}\}/;
  if(reg.test(template)) {
    let name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return render(template, data)
  }
  return template;
}
let f = function (s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  })
}

function isPhone(tel) {
  var regx = /^1[34578]\d{9}$/;
  return regx.test(tel);
}

function isEmail(email) {
  var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
  return regx.test(email);
}
// 身份证
function isCardNo(number) {
  var regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regx.test(number);
}

Array.prototype.map = function (callbackFn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  // 草案中提到要先转换为对象
  let O = Object(this);
  let T = thisArg;
  let len = O.length >>> 0;
  let A = new Array(len);
  for (let k = 0; k < len; k++) {
    // 还记得原型链那一节提到的 in 吗？in 表示在原型链查找
    // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
    if (k in O) {
      let kValue = O[k];
      // 依次传入this, 当前项，当前索引，整个数组
      A[k] = callbackfn.call(T, KValue, k, O);
    }
  }
  return A;
}

Array.prototype.reduce = function (callbackfn, initialValue) {
  // 异常处理，和 map 一样
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let k = 0;
  let accumulator = initialValue;
  if (accumulator === undefined) {
    while (k < len) {
      // 查找原型链
      if (k in O) {
        accumulator = O[k];
        k++;
        break;
      }
      k++
    }
  }
  // 表示数组全为空
  if (k === len && accumulator === undefined) {
    throw new Error('Each element of the array is empty');
  }
  while (k < len) {
    if (k in O) {
      // 注意，核心！
      accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
    }
    k++
  }
  return accumulator;
}
Array.prototype.push = function (...items) {
  let O = Object(this);
  let len = this.length >>> 0;
  let argCount = items.length >>> 0;
  // 2 ** 53 - 1 为JS能表示的最大正整数
  if (len + argCount > 2 ** 53 - 1) {
    throw new TypeError("The number of array is over the max value restricted!")
  }
  for (let i = 0; i < argCount; i++) {
    O[len + i] = items[i];
  }
  let newLength = len + argCount;
  O.length = newLength;
  return newLength;
}

Array.prototype.pop = function () {
  let O = Object(this);
  let len = this.length >>> 0;
  if (len === 0) {
    O.length = 0;
    return undefined;
  }
  len--;
  let value = O[len];
  delete O[len];
  O.length = len;
  return value;
}

Array.prototype.filter = function (callbackfn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'filter' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) !== "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let resLen = 0;
  let res = [];
  for (let i = 0; i < len; i++) {
    if (i in O) {
      let element = O[i];
      if (callbackfn.call(thisArg, O[i], i, O)) {
        res[resLen++] = element;
      }
    }
  }
  return res;
}

// 单例模式
function proxy(func) {
  let instance;
  let handler = {
    constructor(target, args, receiver) {
      if (!instance) {
        instance = Reflect.constructor(func, args, receiver)
      }
      return instance;
    }
  }
  return proxy = new Proxy(func, handler)
}
// 实现flat方法;
let res = []

function flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flat(arr[i])
    } else {
      res.push(arr[i])
    }
  }
}

function flatReduce(arr) {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flatReduce(curr) : curr)
  }, [])
}

function objFlat(obj) {
  let res = {};

  function flat(obj, prevKey) {
    Object.entries(obj).forEach([key, val] => {
      let newKey = prevKey ? `${prevKey}.${key}` : key;
      if (val && typeof val === 'object') {
        flat(val, newKey)
      } else {
        res[newKey] = val
      }
    })
  }
  flag(obj)
  return res;
}

function flatObj(obj) {
  let res = {}
  
  function flat(obj, prevKey) {
    Object.entries(obj).forEach([val, key] => {
      let newKey = prevKey ? `${prevKey}.${key}` : key;
      if (Object.isObject(val)) {
        flat(val, newKey)
      } else {
        res[newKey] = val
      }
    })
  }
  return res;
}

function add() {
  let add_args = [].slice.call(arguments);
  let fn = function () {
    let fn_args = [].slice.call(arguments);
    return add.apply(null, add_args.concat(fn_args))
  }
  fn.toString = function () {
    return add_args.reduce((a, b) => a + b)
  }
  return fn
}

// 函数柯里化
function curry(fn, args) {
  let length = fn.length;
  args = args || [];
  return function () {
    let new_args = args.concat([].slice.call(arguments));
    if (new_args.length < length) {
      return curry.call(this, fn, new_args)
    } else {
      return fn.apply(this, new_args)
    }
  }
}

function isPromise(val) {
  return val && typeof val.then === 'function'; // (123).then => undefined
}
// allSettled
Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let times = 0;
    const setData = (index, data) => {
      arr[index] = data;
      if (++times === promises.length) {
        resolve(arr);
      }
    }

    for (let i = 0; i < promises.length; i++) {
      let current = promises[i];
      if (isPromise(current)) {
        current.then((data) => {
          setData(i, {
            status: 'fulfilled',
            value: data
          });
        }, err => {
          setData(i, {
            status: 'rejected',
            value: err
          })
        })
      } else {
        setData(i, {
          status: 'fulfilled',
          value: current
        })
      }
    }
  })
}

function Ajax(url, method, async) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(url, method, async);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        } else if (xhr.status === 400) {
          reject(new Error(404))
        }
      } else {
        reject('请求数据失败')
      }
    }
  })
  xhr.send(null);
}

function isPromise(val) {
  return typeof val.then === 'function'; // (123).then => undefined
}

Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let times = 0;
    const setData = (index, data) => {
      arr[index] = data;
      if (++times === promises.length) {
        resolve(arr);
      }
    }

    for (let i = 0; i < promises.length; i++) {
      let current = promises[i];
      if (isPromise(current)) {
        current.then((data) => {
          setData(i, {
            status: 'fulfilled',
            value: data
          });
        }, err => {
          setData(i, {
            status: 'rejected',
            value: err
          })
        })
      } else {
        setData(i, {
          status: 'fulfilled',
          value: current
        })
      }
    }
  })
}
/**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */
function limit(count, array, iteratorFunc) {
  let tasks = [];
  let doingTasks = [];
  let i = 0;
  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve();
    }
    let task = Promise.resolve().then(() => iteratorFunc(array[i++]));
    tasks.push(task);
    let doing = task.then(() => doingTasks.splice(doingTasks.indexOf(doing), 1));
    doingTasks.push(doing);
    let res = doingTasks.length >= count ? Promise.race(doingTasks) : Promise.resolve();
    return res.then(enqueue)
  }
  return enqueue().then(() => Promise.all(tasks))
}

// 图片懒加载；
function lazyLoad() {
  let imgs = document.getElementsByTagName('img');
  for (let img of imgs) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;
    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = ''
    }
  }
}

function isVisible(el) {
  let windowHeight = document.documentElement.clientHeight;
  let position = el.getBoundingClientRect();
  let isVisible = position.top > 0 && position.top < windowHeight;
  return isVisible;
}
let img = document.getElementsByTagName("img");
let num = img.length;
let count = 0; //计数器，从第一张图片开始计

lazyload(); //首次加载别忘了显示图片

window.addEventListener('scroll', lazyload);

function lazyload() {
  let viewHeight = document.documentElement.clientHeight; //视口高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条卷去的高度
  for (let i = count; i < num; i++) {
    // 元素现在已经出现在视口中
    if (img[i].offsetTop < scrollTop + viewHeight) {
      if (img[i].getAttribute("src") !== "default.jpg") continue;
      img[i].src = img[i].getAttribute("data-src");
      count++;
    }
  }
}

// 深比较
function isEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }
  if (obj1 === obj2) {
    return true;
  }
  let key1 = Object.keys(obj1)
  let key2 = Object.keys(obj2)
  if (key1.length !== key2.length) {
    return false
  }
  for (let k of key1) {
    if (!isEqual(obj1[k], obj2[k])) {
      return false
    }
  }
  return true;
}

// compose
function compose(...funcs) {
  return funcs.reduce((a, b) => {
    return function (x) {
      return a(b(x))
    }
  })
}

function depUp(arr, getKey = () => {}) {
  return arr.reduce((a, b) => {
    let key = getKey(b);
    if (!a[key]) {
      a[key] = b
    }
    return a
  }, {})
}

// MyPromise 手写
function MyPromise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(fun => {
        fun();
      });
    }
  }

  const reject = (reason) => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fun => {
        fun();
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function') {
    onFulfilled = function (value) {
      return value;
    }
  }
  if (typeof onRejected !== 'function') {
    onRejected = function (reason) {
      throw reason;
    }
  }
  const promise2 = new MyPromise((resolve, reject) => {
    switch (this.state) {
      case FULFILLED:
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case REJECTED:
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (reason) {
            reject(reason);
          }
        }, 0);
        break;
      case PENDING:
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolve(x);
            } catch (reason) {
              reject(reason);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (reason) {
              reject(reason);
            }
          }, 0);
        })
        break;
    }
  })
  return promise2;
}
// 函数柯里化
function curry(fn, args) {
  var length = fn.length;
  args = args || [];
  return function () {
    var _args = args.slice(0),
      arg, i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

// 迭代器；
function iterator(list) {
  let idx = 0;
  let len = list.length;
  return {
    next: function () {
      let done = idx >= len;
      let value = !done ? list[idx++] : undefined;
      return {
        done,
        value
      }
    }
  }
}

// 异步循环打印；
function sleep(wait, i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i)
    }, wait)
  })
}

async function start() {
  for (let i = 0; i < 10; i++) {
    let res = await sleep(1000, i);
    console.log(res) 
  }
}
// 手写 async
// 重点
function asyncToGenerator(generatorFunc) {
  return function () {
    let gen = generatorFunc.apply(this, arguments);

    return new Promise((resolve, reject) => {

      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }
        const {
          done,
          value
        } = generatorResult;
        
        if (done) {
          resolve(value)
        } else {
          
          return Promise.resolve(value).then(
            function onResolve(val) {
              step("next", val)
            }, 
            function onReject(err) {
              step("throw", err)
            }
          )
        }
      }
      step('next', )
    })
  }
}

// 本地缓存过期
class Storage {
  constructor(name) {
    this.name = 'storage';
  }
  //设置缓存
  setItem(params) {
    let obj = {
      name: '', // 存入数据  属性
      value: '', // 属性值
      expires: "", // 过期时间
      startTime: new Date().getTime() //记录何时将值存入缓存，毫秒级
    }
    let options = {};
    //将obj和传进来的params合并
    Object.assign(options, obj, params);
    if (options.expires) {
      //如果options.expires设置了的话
      //以options.name为key，options为值放进去
      localStorage.setItem(options.name, JSON.stringify(options));
    } else {
      //如果options.expires没有设置，就判断一下value的类型
      let type = Object.prototype.toString.call(options.value);
      //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (type == '[object Object]') {
        options.value = JSON.stringify(options.value);
      }
      if (type == '[object Array]') {
        options.value = JSON.stringify(options.value);
      }
      localStorage.setItem(options.name, options.value);
    }
  }
  //拿到缓存
  getItem(name) {
    let item = localStorage.getItem(name);
    //先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      //如果不行就不是json的字符串，就直接返回
      item = item;
    }
    //如果有startTime的值，说明设置了失效时间
    if (item.startTime) {
      let date = new Date().getTime();
      //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        //缓存过期，清除缓存，返回false
        localStorage.removeItem(name);
        return false;
      } else {
        //缓存未过期，返回值
        return item.value;
      }
    } else {
      //如果没有设置失效时间，直接返回值
      return item;
    }
  }
  //移出缓存
  removeItem(name) {
    localStorage.removeItem(name);
  }
  //移出全部缓存
  clear() {
    localStorage.clear();
  }
}

// 去重
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result;
}

// 方法2
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
  return arr.toString().split(',').map(function (item) {
    return +item
  })
}

// 方法3
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// 去重
var array = [1, 1, '1', '1'];

function unique(array) {
  // res用来存储结果
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res;
}
var array = [1, 1, '1'];

function unique(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res;
}

function unique(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i])
    }
    seen = sortedArray[i];
  }
  return res;
}

function unique(array) {
  var res = array.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  })
  return res;
}

function unique(array) {
  return array.concat().sort().filter(function (item, index, array) {
    return !index || item !== array[index - 1]
  })
}

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true)
  })
}

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  })
}

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    console.log(typeof item + JSON.stringify(item))
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}

function unique(array) {
  return Array.from(new Set(array));
}

function unique(arr) {
  const seen = new Map()
  return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}

// 深度优先遍历
function DeepTraversal(node, list) {
  if (node !== null) {
    list.push(node);
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      DeepTraversal(children[i], list)
    }
  }
  return list
}

function DeepTraversal2(node) {
  let list = [];
  if (node !== null) {
    list.push(node)
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      list = list.concat(DeepTraversal2(children[i]))
    }
  }
  return list
}

function DeepTraversal3(node) {
  let stack = [];
  let res = [];
  if (node !== null) {
    stack.push(node)
    while (stack.length) {
      let item = stack.pop();
      let children = item.children;
      res.push(item);
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return res
}

function widthTraversal2(node) {
  let queue = [];
  let res = [];
  if (node !== null) {
    queue.push(node);
    while (queue.length) {
      let item = queue.shift();
      res.push(item);
      let children = item.children;
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
  }
  return res;
}

// 深度遍历与广度遍历的深拷贝
function getType(origin) {
  let type = Object.prototype.toString.call(origin);
  if (type === "[object Object]") {
    return {}
  }
  if (type === "[object Array]") {
    return []
  }
  return origin;
}

function CloneBFS(obj) {
  let queue = [];
  let map = new Map();
  let target = getType(obj);
  if (target !== obj) {
    queue.push([obj, target]);
    map.set(obj, target)
  }
  while (queue.length) {
    let [origin, target] = queue.shift();
    for (let key in origin) {
      if (map.has(origin[key])) {
        target[key] = map.get(origin[key]);
        continue;
      }
      target[key] = getType(origin[key]);
      if (target[key] !== origin[key]) {
        queue.push([origin[key], target[key]]);
        map.set(origin[key], target[key]);
      }
    }
  }
  return target;
}

function CloneDFS(obj) {
  let stack = [];
  let map = new Map();
  let target = getType(obj);
  if (target !== obj) {
    stack.push([obj, target]);
    map.set(obj, target);
  }
  while (stack.length) {
    let [origin, target] = stack.pop();
    for (let key in origin) {
      if (map.has(origin[key])) {
        target[key] = origin[key];
        continue;
      }
      target[key] = getType(origin[key])
      if (target[key] !== origin[key]) {
        stack.push([origin[key], target[key]])
        map.set(origin[key], target[key])
      }
    }
  }
  return target;
}

// 数组转树
function convert(list = [], pid = -1) {
  let trees = [];
  for (let node of list) {
    if (node.pid === pid) {
      let children = convert(list, node.id);
      if (children.length) {
        node.children = [...children]
      }
      trees.push(node)
    }
  }

  return trees;
}

function convert2(list, pid = -1) {
  let res = [];
  let map = list.reduce((res, node) => (res[node.id] = node, res), {});
  for (let node of list) {
    if (node.pid === pid) {
      res.push(node);
      continue;
    }
    if (node.pid in map) {
      let parent = map[node.pid];
      parent.children = parent.children || [];
      parent.children.push(item)
    }
  }
  return res;
}

// 数组去重并压平
[...new Set(arr.flat(Infinity))].sort((a, b) => a - b);
arr.toString().split(",").sort((a, b) => {
  return a - b
});
// 手写new
function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
}

// 两个数组合并
let list1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
let list2 = ['A', 'B', 'C']
list2.forEach(item => item + 3);
[...list1, ...list2].sort().map(item => {
  if (item.includes('3')) {
    return item.charAt(0);
  }
  return item;
})

let a = {
  value: 1,
  toString: function () {
    return this.value++
  }
}

let a = {
  i: 1,
  toString: function () {
    return a.i++
  }
}

let sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

Number.prototype.add = function (i = 0) {
  return this.valueOf() + i;
}

Number.prototype.minus = function (i = 0) {
  return this.valueOf() - i;
}

// 排序
function popSort(list) {
  let n = list.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (list[j] > list[j + 1]) {
        [list[j + 1], list[j]] = [list[j], list[j + 1]];
      }
    }
  }
  return list;
}

let obj = {
  1: 222,
  2: 123,
  5: 888
};
const result = Array.from({
  length: 12
}, (_, index) => obj[index + 1]) || null

// indexOF
Array.prototype.indexOf(item, start = 0) {
  if (start < 0) start += this.length;
  if (start > this.length) return -1
  for (let i = start; i < this.length; i++) {
    if (this[i] === item) {
      return i
    }
  }
  return -1
}

// 黄红蓝
let obj = {
  '黄': 0,
  '红': 1,
  '蓝': 2
}
let strs = '黄黄黄红红红红红蓝蓝蓝'
let arr = [...strs];
console.log(arr.sort((prev, next) => obj[prev] - obj[next]))

// 有效日期
function getDate(day1, day2) {
  day1 = new Date(day1)
  day2 = new Date(day2)
  let oneDay = 1000 * 60 * 60 * 24;
  start = day1.getTime()
  end = day2.getTime()
  range = end - start;
  let total = 0;
  let result = []
  while (total <= range && range > 0) {
    result.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))
    total += oneDay
  }
  return result
}
// setTimeOut实现setInterval
function mySetTimeOut() {
  let args = [].slice.call(arguments)
  mySetTimeOut.timer = setTimeout(() => {
    args[0]();
    mySetTimeOut(...args)
  }, args[1])
}
mySetTimeOut.clear = function () {
  clearInterval(mySetTimeOut.timer)
}

// 扑克牌问题
function reverse(arr) {
  let out = [];
  let i = 1;
  while (arr.length) {
    if (i % 2) {
      out.unshift(arr.pop())
    } else {
      out.unshift(out.pop())
    }
    i++;
  }
  return out
}

// 数组转树
function fn(arr) {
  let res = [];
  let map = arr.reduce((res, item) => ((res[item.id] = Object.assign({}, item)), res), {})
  for (let item of Object.values(map)) {
    if (!item.pId) {
      res.push(item)
    } else {
      let parent = map[item.pId];
      parent.children = parent.children || [];
      parent.children.push(item)
    }
  }
  return res;
}

// 单向链表

class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next;
  }
}
class ListNode {
  constructor(head) {
    this.head = head;
  }
  findVal(value) {
    let curr = this.head;
    while (curr && curr.value !== value) {
      curr = curr.next;
    }
    return curr;
  }
  findPrev(value) {
    let curr = this.head;
    while (curr.next && curr.next.val !== value) {
      curr = curr.next
    }
    return curr
  }
  insert(newVal, oldVal) {
    let prev = this.findVal(oldVal);
    let newNode = new Node(newVal);
    newNode.next = prev.next;
    prev.next = newNode;
  }
  delete(value) {
    let prev = this.findPrev(value);
    let curr = prev.next;
    prev.next = prev.next.next;
    return curr
  }
}
// 寻找字符串中出现最多的字符及其个数
function findStr(str) {
  let arr = str.match(/(\w)\1*/g);
  let maxLen = Math.max(...arr.map(item => item.length));
  let result = arr.reduce((prev, curr) => {
    if (curr.length === maxLen) {
      prev[curr[0]] = maxLen;
    }
    return prev
  }, {})
  return result
}
// 数组去重
function getType = (function () {
  const class2type = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Object]': 'object',
    '[object Error]': 'error',
    '[object Symbol]': 'symbol'
  };

  return function getType(obj) {
    if (obj == null) {
      return obj + '';
    }
    const str = Object.prototype.toString.call(obj);
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[str] || 'object' : typeof obj;
  };
})();

function isEqual(target, other) {
  let t1 = getType(target);
  let t2 = getType(other);
  if (t1 !== t2) return false;
  if (t1 === 'array') {
    return target.every((item, index) => {
      return isEqual(item, other[index])
    })
  }
  if (t1 === 'object') {
    let keys = Object.keys(target);
    return keys.length === Object.keys(other).length;
    return keys.every((item, index) => {
      return isEqual(target[item], other[item])
    })
  }
  return target === other;
}

function unique(arr) {
  return arr.reduce((result, current) => {
    let isUnique = !result.some(item => isEqual(item, current));
    if (isUnique) {
      result.push(current)
    }
    return result;
  }, [])
}

// 压平对象
function flatObj(obj, parentKey = '', result = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}.${key}`
      if (type obj[key] === 'object') {
        flatObj(obj[key], keyName, result)
      } else {
        result[keyName] = obj[key]
      }
    }
  }
  return result
}
// 对象展开
function convert(obj) {
  let keys = Object.keys(obj);
  let result = {};
  for (let key of keys) {
    let keyArr = key.split('.');
    keyArr.reduce((prev, next, index, arr) => {
      if (index === arr.length - 1) {
        prev[next] = obj[key];
        return
      }
      prev[next] = prev[next] || {};
      return prev[next];
    }, result)
  }
  return result;
}
convert(entry)
const entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
};

function convertStr(str) {
  let num = str.split(',');
  let result = [];
  let tmp = num[0];
  num.forEach((value, index) => {
    if(value + 1 !== num[index + 1]) {
      if(tmp !== value) {
        result.push(`${tmp}~${value}`);
      } else {
        result.push(`${value}`);
      }
      tmp = num[index + 1];
    }
  })
  return result;
}