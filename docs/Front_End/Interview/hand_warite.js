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
function myCall(context = Window) {
  let fn = Symbol('fn');
  context[fn] = this;
  let args = []
  for(let i=0; i<arguments.length;i++) {
    args.push(`arguments[${i}]`)
  }
  let result = eval(`context[fn](${args})`);
  delete context[fn]
  return result;
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
function myBind(context = window, arr) {
  let fn = Symbol('fn');
  context[fn] = this;
  let result;
  if(arr.length === 0) {
    result = context[fn]()
  } else {
    let args = [....arr];
    result = eval(`context[fn](${args})`)
  }
  delete context[fn];
  return result;
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


function bind2(context) {
  if(typeof this !== 'function') {
    throw new Error('调用者必须是函数 ')
  }
  let self = this;
  let fNOP = function() {};
  let args = Array.prototype.slice.call(arguments, 1);
  function fBound () {
    let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, [...args, ...bindArgs])
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP()
  return fBound;
}

function muNew() {
  let obj = new Object()
  let Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype
  let res = Constructor.apply(obj, arguments)
  return typeof res === 'object' ? res : obj;
}
function myNew() {
  let obj = new Object();
  let Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let res = Constructor.apply(obj, ...arguments);
  return typeof res === 'object' ? res : obj 
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

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: false
  }
})
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

function debounce(func, wait, immediate = false) {
  let result, timer;
  let debounced = function() {
    let context = this;
    let args = arguments;
    if(timer) clearTimeout(timer);
    if(immediate) {
      let callNow = !timer;
      timer = setTimeout(function(){
        timer = null
      }, wait)
      if(callNow) result = func.apply(context, args);
    } else {
      timer = setTimeout(function() {
        result = func.apply(context, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timer)
    timer = null;
  }
  return debounced
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
  let result;
  let previous = 0
  return function() {
    let now = new Date();
    context = this;
    args = arguments;
    if(now - previous > wait){
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

function curry(fn) {
  let args = Array.prototype.slice.call(arguments,1);
  return function() {
    let newArg = [...args,...arguments];
    return fn.apply(this, newArg)
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
    let position = 0,
      len = args.length;
    for (let i = 0; i < len; i++) {
      args[i] = args[i] === '_' ? arguments[position++] : args[i]
    }
    while (position < arguments.length) {
      args.push(arguments[position++])
    }
    return fn.apply(this, args)
  }
}

function fastPlay(speed) {
  if(!document.getElementById('iframe')) {
    var tags=document.getElementsByTagName("video");
    [...tags].forEach(val=> val.playbackRate = speed);
  } else {
    document.getElementById('iframe').contentWindow.document.getElementById('video').playbackRate = speed;
  }
}
fastPlay(16)

function wait(){
  return new Promise(resolve => {
    setTimeout(resolve, 10 * 1000)
  })
}

async function main() {
  console.time()
  let a = wait()
  let b = wait()
  let c = wait()
  await a;
  await b;
  await c;
  console.timeEnd()
}
main()

var name = "daRui";

(function(){
  if(typeof name == "undefined") {
    name = "Jack";
    console.log("goodbye " + name)
  } else {
    console.log("hello " + name)
  }
})()

function debounce(func, wait, immediate) {
  let timer, result;
  
  const debounced = function() {
    let context = this;
    let args = arguments;
    if(timer) clearTimeout(timer)
    if(immediate) {
      let callNode =!timer;
      timer = setTimeout(function() {
        timer = null
      }, wait)
      if(callNow) result = func.apply(context, args)
    } else {
      timer = setTimeout(function() {
        result = func.apply(context, args)
      })
    }
    return timer
  }
  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null
  }
  return debounced
}

function throttle(func, wait) {
  let result;
  let previous = 0;
  return function() {
    let context = this;
    let args = [...arguments];
    let now = new Date()
    if(now-previous > wait) {
      result = func.apply(context, args)
      previous = now
    }
  }
}
let arr = new Array(10000000000)
console.time('forStart')
for(let i=0; i<arr.length; i++) {}
console.timeEnd('forStart')
console.time('foreachStart')
arr.forEach(arr=>{});
console.timeEnd('foreachStart')

// 深度优先遍历
let deepTraversal1 = (node, nodeList = []) => { 
  if(node === null) return null
  nodeList.push(node);
  let children = node.children;
  for(let i=0; i< children.length - 1;i++) {
    deepTraversal1(children[i], nodeList)
  }
  return nodeList;
}

let dfs = (node) => {
  let nodes = []
  if(node === null) return;
  nodes.push(node);
  let children = node.children;
  for(let i = 0; i < children.length - 1; i++) {
    nodes = nodes.concat(dfs(children[i]))
  }
  return nodes
}

let dfs3 = (node) => {
  if(node === null) return null;
  let stack = [];
  let nodes = [];
  stack.push(node);
  while(stack.length) {
    let item = stack.pop();
    let children = item.children;
    nodes.push(item);
    for(let i=0;i<children.length - 1;i++) {
      stack.push(children[i])
    }
  }
  return nodes;
}

let bfs = (node) => {
  if(node === null) return null
  let stack = [];
  let nodes = [];
  stack.push(node);
  while(stack.length) {
    let item = stack.shift();
    nodes.push(item)
    let children = item.children;
    for(let i=0; i<children.length -1; i++) {
      stack.push(children[i])
    }
  }
}

function getEmpty = (o) => {
  if(Object.prototype.toString.call(o) === '[object Object]') {
    return {}
  }
  if(Object.prototype.toString.call(o) === '[object Array]') {
    return []
  }
  return o;
}

function deepBFS(origin) {
  let queue = [];
  let map = new WeakMap();
  let target = getEmpty(origin)
  if(target !== origin) {
    queue.push([origin, target]);
    map.set(origin, target);
  }
  while(queue.length) {
    let [ori, tar] = queue.shift();
    for(let key in ori) {
      // 处理环
      if(map.has(ori[key])) {
        tar[key] = map.get(ori[key]);
        continue;
      }
      tar[key] = getEmpty(ori[key]);
      if(tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]]);
        map.set(ori[key], tar[key]);
      }
    }
  }
  return target
}

let getEmpty = (o) => {
  const toString = Object.prototype.toString;
  if(toString.call(o) === '[object Object]') {
    return {}
  }
  if(toString.call(o) === '[object Array]') {
    return []
  }
  return o
}
function BFS(origin) {
  let queue = [];
  let target = getEmpty(origin);
  let map = new Map();
  if(origin !== target) {
    map.set(origin, target)
    queue.push([origin, target])
  }
  
  while(queue.length) {
    let [ori, tar] = queue.shift()
    for(let key of ori) {
      if(map.has(ori[key])) {
        tar[key] = map.get(ori[key])
        continue
      }
      tar[key] = getEmpty(ori[key])
      if(tar[key] !== ori[key]) {
        map.set(ori[key], tatar[key])
      queue.push([ori[key], tar[key]])
      }
    }
  }
  return target;
}

let DFS = (origin) => {
  let stack = [];
  let map = new Map()
  let target = getEmpty(origin)
  if(target !== origin) {
    map.set(origin, target);
    stack.push([origin, target])
  }

  while(stack.length) {
    let [ori, tar] = stack.pop();
    
    for(let key in ori) {
      if(map.has(ori[key])) {
        tar[key] =map.get(ori[key]);
        continue;
      }
      tar[key] = getEmpty(ori[key]);
      if(tar[key] !== ori[key]) {
        stack.push([ori[key], tar[key]])
        map.set(ori[key], tar[key])
      }
    }
  }
  return target
}

// 
let myNew = function () {
  let obj = new Object();
  let Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype
  let res = Constructor.apply(obj, ...arguments);
  return typeof res === 'object' ? res : obj;
}

let arr = []
arr = arr.map(item => item + 3);
arr.sort().map(item => {
  if(item.includes('3')) {
    return item.split('')[0];
  }
  return item;
})

for(var i=0; i<10; i++) {
  setTimeout(() => {
    console.log(i)
  },1000)
}

Number.prototype.add = function(i=0) {
  return this.valueOf() + i
}

Number.prototype.minus = function(i=0) {
  return this.valueOf() - i
}

arr = [1,3,4,2,7,5,6,9,8,]
function bubbleSort(arr) {
  for(let i=0, len = arr.length; i<len; i++ ) {
    for(let j=0, len = arr.length; j<len - i + 1; j++ ) {
      if(arr[j] > arr[j + 1]) {
        [arr[j+1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr;
}

function bubbleSort1(arr) {
  let i = arr.length - 1;
  while(i > 0) {
    let pos = 0;
    for(let j=0; j<i; j++) {
      if(arr[j] > arr[j+1]) {
        pos = j;
        [arr[j+1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
    i = pos;
  }
  return arr
}
bubbleSort(arr)
let obj = {1: 222, 2: 133, 5: 888}
const result = Array.from({length: 12}).map((_, index) => obj[index + 1] || null)
Array({length : 12}).map((_, index) => obj[index + 1] || null)

class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`I am ${name}`)
    setTimeout(() => {
      this.next()
    })
  }

  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒......`);
        this.next()
      }, time)
    }
    this.queue.unshift(fn);
    return this;
  }

  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒......`)
        this.next()
      }, time)
    }
    this.queue.push(fn);
    return this;
  }

  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`);
      this.next()
    }
    this.queue.push(fn)
    return this;
  }
  next() {
    const fn = this.queue.shift()
    fn && fn()
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}
class LazyWomanClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`你好， 我是${name}...`)
    setTimeout(() => {
      this.next()
    }, 0);
  }
  sleep(time) {
    let fn = () => {
      setTimeout(() => {
        console.log(`等待了 ${time}秒...`)
        this.next()
      },time);
    }
    this.queue.push(fn);
    return this;
  }
  sleepFirst(time) {
    let fn = () => {
      setTimeout(() => {
        console.log(`等待了 ${time}秒...`)
        this.next()
      },time);
    }
    this.queue.unshift(fn);
    return this
  }
  eat(food) {
    let fn = () => {
      console.log(`吃了 ${food}...`)
      this.next()
    };
    this.queue.push(fn);
    return this
  }
  next() {
    let fn = this.queue.shift();
    fn && fn();
  }
}

function LazyWoMan(name) {
  console.log(`你好，我是${name}`);

  let tmp = {
    queue: [],
    sleepFirst: (time) => {
      return () => {
        setTimeout(() => {
          console.log(`等待了 ${time} 秒...`);
          this.next()
        }, time)
      }
    },
    sleep: (time) => {
      return () => {
        setTimeout(() => {
          console.log(`等待了 ${time} 秒...`);
          this.next()
        }, time)
      }
    },
    next:  () =>  {
      let fn = this.queue.shift();
      fn && fn();
    }
  }

  let proxy = new Proxy(tmp, {
    get: function (target, key, receiver) {
      return function(...rest) {
        if(key === 'sleepFirst') {
          target.queue.unshift(target[key](rest))
        } else {
          target.queue.push(target[key](rest))
        }
        return receiver
      }
    }
  })

  setTimeout(() => {
    tmp.next();
  }, 0)
  return proxy;
}

function getInset(num1, num2) {
  let hash = {};
  let res = []
  for(let n of num1) {
    if(hash[n]) {
      hash[n]++;
    } else {
      hash[n] = 1
    }
  }
  for(let k in num2) {
    if(hash[k]) {                                                                                            
      res.push(k)
      hash[key]--
    }
  }
  return res
}

function binarySearch(arr, target) {
  let low = 0;
  let height = arr.length - 1;
  
  while(low <= height) {
    let mid = low + (height - low)>>1
    if(arr[mid] === target) {
      return mid
    } else if(arr[mid] > target) {
      height = mid - 1
    } else{
      low  = mid + 1;
    }
  }
  return -1
}

function bSearchInter(arr, low, height, val) {
  if(low > height) return -1
  let mid = low + ((height - low) >> 1);
  if(a[mid] === val) {
    return mid
  } else if(a[mid] < val) {
    bSearchInter(arr, mid + 1, height, val)
  } else {
    bSearchInter(arr, low, mid - 1, val)
  }
}

function erfen(arr, val) {
  let low = 0, heigh = arr.length - 1;
  while(low <= heigh) {
    let mid = low + ((heigh - low)>>1);
    if(arr[mid] === val) {
      return mid
    } else if(arr[mid] < val) {
      low = mid + 1
    } else {
      heigh = mid - 1
    }
  }
}

function erfen(arr, low, heigh, val) {
  if(low >height) return -1
  let mid = low + ((heigh - low)>>1);
  if(arr[mid] === val) {
    return mid
  } else if(arr[mid] < val) {
    erfen(arr, mid + 1, heigh, val)
  } else {
    erfen(arr, low, mid - 1, val)
  }
}

function bSearch(arr, n, val) {
  let low = 0, high = n - 1;
  while(low <= high) {
    let mid = low + (high - low) >> 1;
    if(arr[mid] > val) {
      high = mid - 1;
    } else if(arr[mid] < val) {
      low = mid + 1;
    } else {
      if(arr[mid] === 0 || arr[mid-1] !== val) {
        return mid;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
}

function bSearch(arr, n, val) {
  let low =0, high = n - 1;
  while(low <= high) {
    let mid = low + (high - low)>>1;
    if(arr[mid] < val) {
      high = mid - 1;
    } else if(arr[mid] > val) {
      low = mid + 1;
    } else {
      if(mid === n - 1 || arr[mid-1] !== val) {
        return mid;
      } else {
        low = mid - 1;
      }
    }
  }
  return -1;
}

function bSear(arr, n, val) {
  let low = 0;
  let high = n - 1;
  while(low <= high) {
    let mid = low + (high - low) >> 1
    if(arr[mid] > val) {
      if(mid === 0 || arr[mid - 1] !== val) {
        return mid;
      } else {
        high = mid - 1;
      }
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

function bSear(arr, n, val) {
  let low = 0;
  let high = n - 1;
  while(low <= high) {
    let mid = low + (high - low) >> 1
    if(arr[mid] > val) {
      if(mid === 0 || arr[mid - 1] !== val) {
        return mid;
      } else {
        high = mid - 1;
      }
      high = mid - 1;
    } else {
      if(mid === n-1 || arr[mid + 1] > val) {
        return mid;
      } else {
        low = mid + 1;
      }
    }
  }
  return -1;
}

arr.sort(function(a, b) {
  return a - b
})
arr = [...new Set(arr)];
let result = [];
arr.forEach(function(val) {
  let index = parseInt(val/10);
  if(!result[index]) {
    result[index] = []
  }
  result[index].push(val)
})

result = result.filter(arr => arr.length > 0);
console.log(result);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let initArr = Array.from({length: 10}, (v) => {return getRandomInt(0, 99)})

'AsdfAsFFGDDdsf'.replace(/[a-zA-Z]/g,function(a) {
  return /[a-z]/.test(a) ? a.toUpperCase() : a.toLowerCase();
})  

var arr = [1,3,4,5,6,7];
var k = 3
while(k > 0) {
  let tmp = arr.pop()
  arr.unshift(tmp);
  k--
}

let res = [];
for(let i = 0;i < 10; i++) {
  res.push(i)
  res.push(i*11)
  for(let j=0; j<10; j++) {
    res.push(1*101 + j*10)
    res.push(1*1001 + j*110)
  }
}
function moveZero(arr) {
  let fast = 0;
  let slow = 0;
  while(fast <arr.length) {
    if(arr[i] !==0) {
      i++;
    } else if(arr[j] !==0) {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      i++;
    }
    j++;
  }
}

function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
      return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}

function curry(fn, length) {
  length = length || fn.length;
  var slice = Array.prototype.slice;
  return function() {
      if (arguments.length < length) {
          var combined = [fn].concat(slice.call(arguments));
          return curry(sub_curry.apply(this, combined), length - arguments.length);
      } else {
          return fn.apply(this, arguments);
      }
  };
}

function sub_curry(fn) {
  let arg = Array.prototype.slice.call(arguments, 1);
  return function() {
    let newArg = arg.concat(Array.prototype.slice.call(arguments));
    return fn.apply(this, newArg)
  }
}

function curry(fn, length) {
  length = length || fn.length;
  const slice = Array.prototype.slice;
  return function() {
    if(arguments.length < length) {
      let combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined),length - arguments.length)
    } else {
      fn.apply(this,)
    }
  }
}

function sub_curry(fn) {
  let arg = Array.prototype.slice.call(arguments, 1);
  return function() {
    let newArg = [...arg, ...arguments];
    return fn.apply(this, newArg);
  }
}

function curry(fn, length) {
  length = length || fn.length;

  slice = Array.prototype.slice;
  return function() {
    if(arguments.length < length ) {
      let combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry(this, combined), length - arguments.length);
    } else {
      fn.apply(this, arguments);
    }
  }
}