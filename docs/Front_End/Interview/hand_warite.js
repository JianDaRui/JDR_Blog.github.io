function myCall(context = window) {
  let fn = Symbol('fn');
  context[fn] = this;
  let args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }
  let result = eval('context[fn](' + args + ')');
  delete context[fn];
  return result;
}

function myCall(context = window) {
  let fn = Symbol();
  let context[fn] = this;
  let args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  let result = eval('context[fn](' + args + ')')
  delete context.fn;
  return result
}


function myApply(context = window, arr) {
  let fn = Symbol('fn');
  let context[fn] = this;
  let result;
  if (!arr.length) {
    result = context[fn]()
  } else {
    let args = [];
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']')
    }
    let result = eval('context[fn](' + args + ')')
  }
  delete context[fn];
  return result
}

Function.prototype.bind2 = function (context) {
  if (typeof this !== "function") {
    throw new Error("调用者必须为函数")
  }
  let self = this;
  let args = Array.prototype.slice(arguments, 1);
  let fNOP = function () {};
  let fBound = function () {
    let bindArgs = Array.prototype.slice(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('调用者必须是函数')
  }
  let self = this;
  let args = Array.prototype.slice.call(arguments, 1);
  let fNOP = function () {};
  let fBound = function () {
    let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

function myBind(context) {
  if (typeof this !== 'function') {
    throw new Error('必须为函数')
  }
  let args = Array.prototype.slice.call(arguments, 1);
  let self = this;
  let fNOP = function () {};
  let fBound = function () {
    let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP
  return fBound
}

function muNew() {
  let obj = new Object()
  let Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype
  let res = Constructor.apply(obj, arguments)
  return typeof res === 'object' ? res : obj;
}


function myNew() {
  let obj = new Object()
  let Constructor = Array.prototype.slice(arguments)
  obj.__proto__ = Constructor.prototype
  let res = Constructor.apply(obj, arguments)
  return typeof res === 'object' ? res : obj;
}

function myCall(context = window) {
  let fn = Symbol('fn');
  context[fn] = this
  let args = []
  for (let i = 0; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  let result = eval('context[fn](' + args + ')')
  delete context[fn]
  return result
}

function myApply(context = window, arr) {
  let fn = Symbol('fn');
  context[fn] = this;
  let result;
  if (!arr) {
    result = context[fn]()
  } else {
    let args = []
    for (let i = 0; i < arr.length; i++) {
      args.push('arr[' + i + ']')
    }
    result = eval('context[fn](' + args + ')')
  }
  delete context[fn];
  return result;
}

function bind2(context = window) {
  if (typeof this !== 'function') {
    throw new Error('请使用函数调用bind')
  }
  let self = this
  let args = Array.prototype.slice.call(arguments, 1)
  let fNOP = function () {};
  let fBound = function () {
    let bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(this instanceof fNOP ? this : context, [...args, ...bindArgs])
  }
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

function myBind(context) {
  if (typeof this !== 'function') {
    throw new Error('遇见问题')
  }
  let self = this;
  let args = Array.prototype.slice.call(arguments, 1);
  let fNOP = function () {};
  let fBind = function () {
    let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, [...args, ...bindArgs])
  }
  fNOP.prototype = this.prototype;
  fBind.prototype = new fNOP()

  return fBind
}

function muNew() {
  let obj = new Object()
  let Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  let ret = Constructor.apply(obj, arguments)
  return typeof res === 'object' ? ret : obj
}

function createPerson(name) {
  let o = new Object()
  o.name = name
  o.getName = function () {
    console.log(this.name)
  }
  return o
}

function Person(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name)
  }
}

function Person(name) {

}

Person.prototype.name = 'sdfsd'
Person.prototype.getName = function () {
  console.log(this.name)
}
Person.prototype = {
  name: 'sdfsdf',
  getName: function () {
    console.log(this.name)
  }
}

function Person(name) {
  this.name = name
}

Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name)
  }
}

function Person(name) {
  let o = new Object()
  o.name = name;
  o.getName = function () {
    console.log(this.name)
  }
}

function Parent() {
  this.name = 'darui'
}
Parent.prototype.getName = function () {
  return this.name;
}

function Child() {

}
Child.prototype = new Parent()

let child1 = new Child()

function Child() {
  Parent.apply(this)
}
Child.prototype = Object.create(new Parent(), {
  constructor: {
    value: Child,
    writable: false,
    configurable: false,
  }
})
// Child.prototype.constructor = Child

function createOb(o) {
  function F() {}
  F.prototype = o;
  return new F()
}

function prototypeObj(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      configurable: false,
      writable: false
    }
  })
}

function debounce(func, wait) {
  let timer;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(func, wait)
  }
}

function debounce(func, wait) {
  let timer;
  return function () {
    let context = this
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context)
    }, wait)
  }
}

function debounce(func, wait) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}

function debounce(func, wait, immediate) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 如果已经执行过，不在执行
      let callNow = !timer;
      timer = setTimeout(function () {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

function debounce(func, wait, immediate) {
  let timer, result;
  let debounced = function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(function () {
        timer = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounce
}

function throttle(func, wait) {
  let context, rags;
  let previous = 0;
  return function () {
    let now = new Date();
    context = this
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now
    }
  }
}

function throttle(func, wait) {
  let context, args;
  let timer = null;
  return function () {
    args = arguments;
    context = this;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

// 数组去重的几种方法
let arr = [1, '2', 1, '2', 3, 4, 3, 4]

function unique(arr) {
  let res = []
  for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (arr[i] === res[j]) {
        break;
      }
    }
    if (j === resLen) {
      res.push(arr[i])
    }
  }
  return res
}

unique(arr)
let arr = [1, '2', 1, '2', 3, 4, 3, 4]

function unique(arr) {
  let res = [];
  for (let i = 0, arrLen = arr.length; i < arrLen; i++) {
    let current = arr[i]
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res
}
let arr = [1, '2', 1, '2', 3, 4, 3, 4]
// 排序去重
function unique(arr) {
  let res = [];
  let sortArr = arr.concat().sort();
  let seen;
  for (let i = 0, len = sortArr.length; i < len; i++) {
    if (!i || seen !== sortArr[i]) {
      res.push(sortArr[i])
    }
    seen = sortArr[i]
  }
  return res;
}

unique(arr)
let arr = [1, '2', 1, '2', 3, 4, 3, 4]

function unique(arr) {
  let res = arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index
  })
  return res
}
unique(arr)
let arr = [1, '2', 1, '2', 3, 4, 3, 4]

function unique(arr) {
  let res = arr.concat().sort().filter((item, index, arr) => {
    return !index || item !== arr[index - 1]
  })
  return res
}
unique(arr)

let arr = [1, '2', 1, '2', 3, 4, 3, 4]

function unique(arr) {
  let obj = {};
  return arr.filter((item, index, arr) => {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true)
  })
}

function unique(arr) {
  let obj = {}
  return arr.filter((item, index) => {
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}
unique(arr)

function unique(arr) {
  return Array.from(new Set(arr))
}

function unique(arr) {
  return [...new Set(arr)]
}

function unique(arr) {
  let seen = new Map()
  return arr.filter((item, index) => !seen.has(item) && seen.set(item, 1))
}

// 第二版
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function (item, index) {
  class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
  // 一箭双雕
  if (obj === null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}

function type(obj) {
  if (obj === null) {
    return obj + ""
  }

  return typeof obj === "object" || typeof obj === "function" ?
    class2type[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}
// 浅拷贝
var shallowCopy = function (obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

function shallowCopy(obj) {
  if (typeof obj !== 'object') return
  let res = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return res
}

function shallowCopy(obj) {
  if (typeof obj !== 'object') return
  let res = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key]
    }
  }
  return res
}

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

const deepClone = (target, map = new weakMap()) => {
  if (map.has(target))
    return target;

  if (isObject(target)) {
    map.set(target, true);
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

function deepClone(target, map = new weakMap()) {
  if (map.has(target)) {
    return target
  }

  if (isObject(target)) {
    map.set(target, true);
    let cloneTarget = target instanceof Array ? [] : {}
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

function deepClone(target, map = new weakMap()) {
  if (map.has(target)) {
    return target;
  }
  if (isObject(target)) {
    let cloneTarget = target instanceof Array ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// 数组扁平化
let arr = [1, 2, [3, [4, [6, 7, 8, [5, 9, 10]]]]]

function flatten(arr) {
  let result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
flatten(arr)

function flatten(arr) {
  let str = arr.toString()
  return str.split(',').map(item => {
    return +item
  })
}

function flatten(arr) {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flatten(curr) : curr)
  }, [])
}
let arr2 = [1, 2, [3, [4, [6, 7, 8, [5, 9, 10]]]]]
// function flatten(arr) {
//   while(arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr)
//   }
//   return arr
// }
// flatten(arr2)

function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}


/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} output  这是为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten(input, shallow, strict, output) {
  output = output || [];
  var idx = output.length;
  for (var i = 0, len = input.length; i < len; i++) {
    var value = input[i];
    if (Array.isArray(value)) {
      if (shallow) {
        var j = 0,
          length = value.length;
        while (j < length) output[idx++] = value[j++];
      } else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
}

function flatten(input, shallow, strict, output) {
  output = output || [];
  let idx = output.length;
  for (let i = 0; len = input.length; i < len; i++) {
    let value = input[i];
    if (Array.isArray(value)) {
      if (shallow) {
        var j = 0,
          length = value.length;
        while (j < length) output[idx++] = value[j++];
      } else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output
}

function findIndex(array, predicate, context) {
  for (var i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}

console.log(findIndex([1, 2, 3, 4], function (item, i, array) {
  if (item == 3) return true;
}))

function findIndex(arr, predicate, context) {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (predicate.call(context, arr[i], i, arr)) return i
  }
  return -1
}

function findLastIndex(arr, predicate, context) {
  for (let i = arr.length - 1; i >= 0; --i) {
    if (predicate.call(context, arr[i], i, arr)) return i
  }
  return -1
}

function createIndexFinder(dir) {
  return function (array, predicate, context) {

    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(context, array[index], index, array)) return index;
    }

    return -1;
  }
}


function createIndexOfFinder(dir) {
  return function (array, item) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (array[index] === item) return index;
    }
    return -1;
  }
}

function each(obj, callback) {
  var length, i = 0;
  if (isArrayLike(obj)) {
    length = obj.length;
    for (; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break;
      }
    }
  }
  return obj;
}


function each(obj, callback) {
  var length, i = 0;
  if (isArrayObject(obj)) {
    length = obj.length;
    for (let i = 0; i < length; i++) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  } else {
    for (i in obj) {
      if (callback.call(obj[i], i, obj[i]) === false) {
        break
      }
    }
  }
  return obj
}

function eq(a, b) {
  if (a === b) {
    a !== 0 || 1 / a === 1 / b;
  }
  return false
}

function eq(a, b) {
  if (a !== a) return b !== b;
}

function curry(fn) {
  let args = Array.prototype.slice(arguments, 1)
  return function () {
    let newArgs = args.concat(Array.prototype.slice(arguments))
    return fn.apply(this, newArgs)
  }
}

function sub_curry(fn) {
  let args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

function curry(fn, length) {
  length = length || fn.length;
  let slice = Array.prototype.slice;

  return function () {
    if (arguments.length < length) {
      let combined = [fn, ...arguments];
      return curry(sub_curry.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

function sub_curry(fn) {
  let args = Array.prototype.slice.call(arguments, 1)
  return function () {
    fn.apply(this, [...args, ...arguments])
  }
}

function curry(fn, length) {
  length = length || fn.length

  let slice = Array.prototype.slice
  return function () {
    if (arguments.length < length) {
      let combinedArgs = [fn].concat(slice.call(arguments))
      return curry(sub_curry.apply(this, combinedArgs), length - arguments.length)
    } else {
      fn.apply(this, arguments)
    }
  }
}


// 第三版
function curry(fn, args, holes) {
  length = fn.length;

  args = args || [];

  holes = holes || [];

  return function () {

    var _args = args.slice(0),
      _holes = holes.slice(0),
      argsLen = args.length,
      holesLen = holes.length,
      arg, i, index = 0;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen)
        }
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg);
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1)
        }
      } else {
        _args.push(arg);
      }

    }
    if (_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    } else {
      return fn.apply(this, _args);
    }
  }
}

// 偏函数
function partial(fn) {
  let args = [].slice.call(arguments, 1);
  return function () {
    let position = 0, len = args.length;
    for(let i =0; i< len;i++) {
      args[i] = args[i] === '_' ? arguments[position++] : args[i]
    }
    while(position < arguments.length){
      args.push(arguments[position++])
    }
    return fn.apply(this, args)
  }
}