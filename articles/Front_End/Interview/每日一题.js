// 深度优先遍历 广度优先遍历
let deepTraversal1 = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(children[i], nodeList)
    }
  }
  return nodeList
}
let deepTraversal2 = (node) => {
  let nodes = []
  if (node !== null) {
    nodes.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      nodes = nodes.concat(deepTraversal2(children[i]))
    }
  }
  return nodes
}
// 非递归
let deepTraversal3 = (node) => {
  let stack = []
  let nodes = []
  if (node) {
    // 推入当前处理的node
    stack.push(node)
    while (stack.length) {
      let item = stack.pop()
      let children = item.children
      nodes.push(item)
      // node = [] stack = [parent]
      // node = [parent] stack = [child3,child2,child1]
      // node = [parent, child1] stack = [child3,child2,child1-2,child1-1]
      // node = [parent, child1-1] stack = [child3,child2,child1-2]
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}

let widthTraversal2 = (node) => {
  let nodes = []
  let stack = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift()
      let children = item.children
      nodes.push(item)
      // 队列，先进先出
      // nodes = [] stack = [parent]
      // nodes = [parent] stack = [child1,child2,child3]
      // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
      // nodes = [parent,child1,child2]
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}
// 深度优先遍历广度优先遍历版深拷贝

// 如果是对象/数组，返回一个空的对象/数组，
// 都不是的话直接返回原对象
// 判断返回的对象和原有对象是否相同就可以知道是否需要继续深拷贝
// 处理其他的数据类型的话就在这里加判断
function getEmpty(o) {
  if (Object.prototype.toString.call(o) === '[object Object]') {
    return {};
  }
  if (Object.prototype.toString.call(o) === '[object Array]') {
    return [];
  }
  return o;
}

function deepCopyBFS(origin) {
  let queue = [];
  let map = new Map(); // 记录出现过的对象，用于处理环

  let target = getEmpty(origin);
  if (target !== origin) {
    queue.push([origin, target]);
    map.set(origin, target);
  }

  while (queue.length) {
    let [ori, tar] = queue.shift();
    for (let key in ori) {
      // 处理环状
      if (map.get(ori[key])) {
        tar[key] = map.get(ori[key]);
        continue;
      }

      tar[key] = getEmpty(ori[key]);
      if (tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]]);
        map.set(ori[key], tar[key]);
      }
    }
  }

  return target;
}

function deepCopyDFS(origin) {
  let stack = [];
  let map = new Map(); // 记录出现过的对象，用于处理环

  let target = getEmpty(origin);
  if (target !== origin) {
    stack.push([origin, target]);
    map.set(origin, target);
  }

  while (stack.length) {
    let [ori, tar] = stack.pop();
    for (let key in ori) {
      // 处理环状
      if (map.get(ori[key])) {
        tar[key] = map.get(ori[key]);
        continue;
      }

      tar[key] = getEmpty(ori[key]);
      if (tar[key] !== ori[key]) {
        stack.push([ori[key], tar[key]]);
        map.set(ori[key], tar[key]);
      }
    }
  }

  return target;
}
// 合并两个数组

let a1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a2 = ['A', 'B', 'C', 'D'].map((item) => {
  return item + 3
})

let a3 = [...a1, ...a2].sort().map((item) => {
  if (item.includes('3')) {
    return item.split('')[0]
  }
  return item
})

// 实现Sleep函数
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time))
}
sleep(1000).then(() => {
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  })
}
sleepGenerator(1000).next().value.then(() => {
  console.log(1)
})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//ES5
function sleep(callback, time) {
  if (typeof callback === 'function')
    setTimeout(callback, time)
}

function output() {
  console.log(1);
}
sleep(output, 1000);

// 改进冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.log(arr);
}

// 改进冒泡排序
function bubbleSort1(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    i = pos;
  }
  console.log(arr);
}
// 选择排序
function selectionSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i; j < len; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[min], arr[i]] = [arr[i], arr[min]];
    }
  }
  return arr;
}

// 插入排序
function insertionSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let j = i;
    let tmp = arr[i];
    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = tmp;
  }
  return arr;
}

// 归并排序
function mergeSort(arr) {
  function main(arr) {
    // 记得添加判断，防止无穷递归导致callstack溢出，此外也是将数组进行分解的终止条件。
    if (arr.length === 1) return arr;
    // 从中间开始分解，并构造左边数组和右边数组。
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    // 开始递归调用。
    return merge(arguments.callee(left), arguments.callee(right));
  }
  // 数组的合并函数，left是左边的有序数组，right是右边的有序数组。
  function merge(left, right) {
    // il是左边数组的一个指针，rl是右边数组的一个指针。
    let il = 0,
      rl = 0,
      result = [];
    // 同时遍历左右两个数组，直到有一个指针超出范围。
    while (il < left.length && rl < right.length) {
      //count++;
      // 左边数组的当前项如果小于右边数组的当前项，那么将左边数组的当前项推入result，反之亦然，同时将推入过的指针右移。
      if (left[il] < right[rl]) {
        result.push(left[il++]);
      } else {
        result.push(right[rl++]);
      }
    }
    // 记得要将未读完的数组的多余部分读到result。
    return result.concat(left.slice(il)).concat(right.slice(rl));
  }
}
// 快速排序
function quickSort(arr) {
  let left = 0,
    right = arr.length - 1;
  main(arr, left, right);
  return arr;

  function main(arr, left, right) {
    // 递归结束的条件，直到数组只包含一个元素。
    if (left > right) {
      // 由于是直接修改arr，所以不用返回值。
      return;
    }
    // 获取left指针，准备下一轮分解。
    let index = partition(arr, left, right);
    if (left < index - 1) {
      // 继续分解左边数组。
      main(arr, left, index - 1);
    }
    if (index < right) {
      // 分解右边数组。
      main(arr, index, right);
    }
  }
  // 数组分解函数。
  function partition(arr, left, right) {
    // 选取中间项为参考点。
    let pivot = arr[Math.floor((left + right) / 2)];
    // 循环直到left > right。
    while (left <= right) {
      // 持续右移左指针直到其值不小于pivot。
      while (arr[left] < pivot) {
        left++;
      }
      // 持续左移右指针直到其值不大于pivot。
      while (arr[right] > pivot) {
        right--;
      }
      // 此时左指针的值不小于pivot，右指针的值不大于pivot。
      // 如果left仍然不大于right。
      if (left <= right) {
        // 交换两者的值，使得不大于pivot的值在其左侧，不小于pivot的值在其右侧。
        [arr[left], arr[right]] = [arr[right], arr[left]];
        // 左指针右移，右指针左移准备开始下一轮，防止arr[left]和arr[right]都等于pivot然后导致死循环。
        left++;
        right--;
      }
    }
    // 返回左指针作为下一轮分解的依据。
    return left;
  }
}

// 作者：Russ_Zhong
// 链接：https://juejin.cn/post/6844903609885261832
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 
let obj = {
  1: 222,
  2: 123,
  5: 888
};
const result = Array.from({
  length: 12
}).map((_, index) => obj[index + 1] || null);
console.log(result)

// lazyMan
class LazyManClass {
  constructor(name) {
    this.name = name
    this.queue = []
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this.next()
    }, 0)
  }

  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time)
    }
    this.queue.unshift(fn)
    return this
  }

  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time)
    }
    this.queue.push(fn)
    return this
  }

  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`)
      this.next()
    }
    this.queue.push(fn)
    return this
  }

  next() {
    const fn = this.queue.shift()
    fn && fn()
  }
}

// 英文字母大小转换
'AbcDefGh'.replace(/[a-zA-Z]/g,
  function (a) {
    return /[a-z]/.test(a) ? a.toUpperCase() : a.toLowerCase();
  });


// Proxy版本的数据绑定

const model = document.getElementById("model")
const word = document.getElementById("word")
var obj = {};

const newObj = new Proxy(obj, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log('setting', target, key, value, receiver);
    if (key === "text") {
      model.value = value;
      word.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  }
});

model.addEventListener("keyup", function (e) {
  newObj.text = e.target.value
})

// 打印对称数
let result = []
for (let i = 1; i < 10; i++) {
  result.push(i)
  result.push(i * 11)
  for (let j = 0; j < 10; j++) {
    result.push(i * 101 + j * 10)
    result.push(i * 1001 + j * 110)
  }
}

// 移动零
function zeroMove(nums) {
  let i = 0;
  let j = 0;
  while (i < nums.length) {
    if (nums[i] !== 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
    i++;
  }
  return nums
}
// add函数 实现
function add() {
  let args = [].slice.call(arguments);
  let fn = function () {
    let fn_args = [].slice.call(arguments)
    return add.apply(null, args.concat(fn_args))
  }
  fn.toString = function () {
    return args.reduce((a, b) => a + b)
  }
  return fn
}

// 验证网址
function isUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}
// 数组转树
function convert(list) {
  const res = []
  const map = list.reduce((res, v) => (res[v.id] = v, res), {})
  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return res
}

function convert(source, parentId = 0) {
  let trees = [];
  for (let item of source) {
    if (item.parentId === parentId) {
      let children = convert(source, item['id']);
      if (children.length) {
        item.children = children
      }
      trees.push(item);
    }
  }
  return trees;
}
// 搜索父级 
function fn(id, list) {
  const match = list.find(item => item.id === id);
  if (match) return [id];
  const sub = list.find(item => id.startsWith(item.id));
  return [sub.id].concat(fn(id, sub.children));
}

function bfs(target, id) {
  const queue = [...target]
  do {
    const current = quene.shift()
    if (current.children) {
      queue.push(...current.children.map(x => ({
        ...x,
        path: (current.path || current.id) + '-' + x.id
      })))
    }
    if (current.id === id) {
      return current
    }
  } while (queue.length)
  return undefined
}

function dfs(target, id) {
  const stack = [...target]
  do {
    const current = stack.pop()
    if (current.children) {
      stack.push(...current.children.map(x => ({
        ...x,
        path: (current.path || current.id) + '-' + x.id
      })))
    }
    if (current.id === id) {
      return current
    }
  } while (stack.length)
  return undefined
}

// 公共的搜索方法，默认bfs
function commonSearch(target, id, mode) {
  const staskOrQuene = [...target]
  do {
    const current = staskOrQuene[mode === 'dfs' ? 'pop' : 'shift']()
    if (current.children) {
      staskOrQuene.push(...current.children.map(x => ({
        ...x,
        path: (current.path || current.id) + '-' + x.id
      })))
    }
    if (current.id === id) {
      return current
    }
  } while (staskOrQuene.length)
  return undefined
}

// 深拷贝 Symbol 类型
const symbolName = Symbol();
const obj = {
  objNumber: new Number(1),
  number: 1,
  objString: new String('ss'),
  string: 'stirng',
  objRegexp: new RegExp('\\w'),
  regexp: /w+/g,
  date: new Date(),
  function: function () {},
  array: [{
    a: 1
  }, 2],
  [symbolName]: 111
}
obj.d = obj;

const isObject = obj => obj !== null && (typeof obj === 'object' || typeof obj === 'function');
const isFunction = obj => typeof obj === 'function'

function deepClone(obj, hash = new WeakMap()) {
  if (hash.get(obj)) {
    // 环处理
    return hash.get(obj);
  }
  if (!isObject(obj)) {
    return obj;
  }

  if (isFunction(obj)) {
    // function返回原引用
    return obj;
  }

  let cloneObj;

  const Constructor = obj.constructor;

  switch (Constructor) {
    case Boolean:
    case Date:
      return new Date(+obj);
    case Number:
    case String:
    case RegExp:
      return new Constructor(obj);
    default:
      cloneObj = new Constructor();
      hash.set(obj, cloneObj);
  }

  [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].forEach(k => {
    cloneObj[k] = deepClone(obj[k], hash);
  })
  return cloneObj;
}

// 反转数字
function fun(num) {
  let num1 = num / 10;
  let num2 = num % 10;
  if (num1 < 1) {
    return num;
  } else {
    num1 = Math.floor(num1)
    return `${num2}${fun(num1)}`
  }
}
// LocalStorage的模拟实现
const valuesMap = new Map()

class LocalStorage {
  getItem(key) {
    const stringKey = String(key)
    if (valuesMap.has(key)) {
      return String(valuesMap.get(stringKey))
    }
    return null
  }

  setItem(key, val) {
    valuesMap.set(String(key), String(val))
  }

  removeItem(key) {
    valuesMap.delete(key)
  }

  clear() {
    valuesMap.clear()
  }

  key(i) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.") // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
    }
    var arr = Array.from(valuesMap.keys())
    return arr[i]
  }

  get length() {
    return valuesMap.size
  }
}
const instance = new LocalStorage()

global.localStorage = new Proxy(instance, {
  set: function (obj, prop, value) {
    if (LocalStorage.prototype.hasOwnProperty(prop)) {
      instance[prop] = value
    } else {
      instance.setItem(prop, value)
    }
    return true
  },
  get: function (target, name) {
    if (LocalStorage.prototype.hasOwnProperty(name)) {
      return instance[name]
    }
    if (valuesMap.has(name)) {
      return instance.getItem(name)
    }
  }
})

// 设置过期时间
(function () {
  var getItem = localStorage.getItem.bind(localStorage)
  var setItem = localStorage.setItem.bind(localStorage)
  var removeItem = localStorage.removeItem.bind(localStorage)
  localStorage.getItem = function (keyName) {
    var expires = getItem(keyName + '_expires')
    if (expires && new Date() > new Date(Number(expires))) {
      removeItem(keyName)
      removeItem(keyName + '_expires')
    }
    return getItem(keyName)
  }
  localStorage.setItem = function (keyName, keyValue, expires) {
    if (typeof expires !== 'undefined') {
      var expiresDate = new Date(expires).valueOf()
      setItem(keyName + '_expires', expiresDate)
    }
    return setItem(keyName, keyValue)
  }
})()
// 
// 快速寻找随机数
function getNum(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * (arr.length - i));
    let item = arr[randomIndex]
    result.push(item);
    [arr[randomIndex], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[randomIndex]]
  }
  return result;
}

// 获取URL参数
new URLSearchParams(url).get('elective')

// localStorage 设置过期时间
(function () {
  var getItem = localStorage.getItem.bind(localStorage)
  var setItem = localStorage.setItem.bind(localStorage)
  var removeItem = localStorage.removeItem.bind(localStorage)
  localStorage.getItem = function (keyName) {
    let expires = getItem(keyName + '_expires');
    if (expires && new Date(Number(expires) < new Date())) {
      removeItem(keyName)
      removeItem(keyName + '_expires')
    }
    return getItem(keyName)
  }
  localStorage.setItem = function (keyName, keyValue, expires) {
    if (typeof expires !== 'undefined') {
      var expiresDate = new Date(expires).valueOf()
      setItem(keyName + '_expires', expiresDate)
    }
    return setItem(keyName, keyValue)
  }
}())

// 使用Map 模拟实现LocalStorage
let valuesMap = new Map();
class myStorage {
  getItem(key) {
    if (valuesMap.has(String(key))) {
      return valuesMap.get(String {
        key
      })
    }
    return undefined
  }
  setItem(key, value) {
    valuesMap.set(String(key), String(value))
  }
  removeItem(key) {
    valuesMap.delete(key)
  }
}

// 数字转为倒序字符串
function foo(num) {
  let num1 = num / 10;
  let num2 = num % 10;
  if (num1 < 1) {
    return num
  } else {
    num1 = Math.floor(num1);
    return `${num2}${foo(num1)}`
  }
}
foo(1234567)

// 深克隆
const isObject = (obj) => obj !== null && (typeof obj === 'object' || typeof obj === 'function')
const isFunction = (obj) => typeof obj === 'function';

function deepClone(obj, hash = new Map) {
  if (hash.has(obj)) {
    return hash.get(obj)
  }

  if (!isObject(obj)) {
    return obj
  }

  if (!isFunction(obj)) {
    return obj
  }
  let target
  let constructor = obj.constructor;
  switch (constructor) {
    case Boolean:
    case Date:
      return new Date(obj);
    case Number:
    case String:
    case RegExp:
      return new Constructor(obj);
    default:
      cloneObj = new Constructor();
      hash.set(obj, cloneObj);
  }
  [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].forEach(k => {
    cloneObj[k] = deepClone(obj[k], hash);
  })
  return cloneObj;
}

let list = [{
    id: 1,
    name: '部门A',
    parentId: 0
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0
  },
  {
    id: 3,
    name: '部门C',
    parentId: 1
  },
  {
    id: 4,
    name: '部门D',
    parentId: 1
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3
  },
  {
    id: 7,
    name: '部门G',
    parentId: 2
  },
  {
    id: 8,
    name: '部门H',
    parentId: 4
  }
];
let result = []

function convert(list, pId) {
  let result = [];
  for (let n of list) {
    if (n.parentId === pId) {
      let child = covert(list, n.parentId)
      n.children = child;
      result.push(n)
    }
  }
  return result;
}

function convert(list) {
  let result = [];
  let map = list.reduce((prev, next) => (prev[next.id] = next, prev), {});
  for (let item of list) {
    if (item.id === parentId) {
      result.push(item)
    }
    if (map[item.parentId]) {
      let parent = map[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item)
    }
  }
  return result
}
// 数组处理
const nums1 = [1, 2, 3, 5, 7, 8, 10];

function simplifyStr(num) {
  var result = [];
  var temp = num[0]
  num.forEach((value, index) => {
    if (value + 1 !== num[index + 1]) {
      if (temp !== value) {
        result.push(`${temp}~${value}`)
      } else {
        result.push(`${value}`)
      }
      temp = num[index + 1]
    }
  })
  return result;
}

// 数组转换
function flatObj(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {

      let keyName = `${parentKey}${key}`;

      if (typeof obj[key] === 'object') {
        flatObj(obj[key], keyName + ".", result)
      } else {
        result[keyName] = obj[key];
      }
    }
  }
  return result;
}

const entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
};
const changObjStructureOfNormal = output => {
  const keys = Object.keys(output);
  const resObj = {};
  for (const key of keys) {
    const everyKey = key.split('.');
    everyKey.reduce((pre, next, index, array) => {
      if (index === array.length - 1) {
        pre[next] = output[key];
        return;
      }
      pre[next] = pre[next] || {};
      return pre[next];
    }, resObj);
  }
  return resObj;
};
changObjStructureOfNormal(entry);

// 数组去重
function isEqual(target, other) {
  const t1 = getType(target);
  const t2 = getType(other);

  // 类型不同
  if (t1 !== t2) return false;

  if (t1 === 'array') {
    if (target.length !== other.length) return false; // 数组长度不等
    // 比较当前数组和另一个数组中的每个元素
    return target.every((item, i) => {
      // return item === target;
      return isEqual(item, other[i]);
    });
  }

  if (t2 === 'object') {
    // 对象情况类似数组 但是遍历方法区别一下
    const keysArr = Object.keys(target);
    if (keysArr.length !== Object.keys(other).length) return false;
    return keysArr.every(k => {
      return isEqual(target[k], other[k]);
    });
  }

  return target === other;
}

/**
 * 对输入数组按照指定规则进行去重
 *
 * @param {Array<any>} arr 待去重的数组
 * @returns {Array<any>} 去重后的新数组
 */
function unique(arr) {
  return arr.reduce((outputArr, current) => {
    const isUnique = !outputArr.some(item => isEqual(current, item));
    if (isUnique) {
      outputArr.push(current);
    }
    return outputArr;
  }, []);
}

const fn = arr => {
  const res = []
  const map = arr.reduce((res, item) => ((res[item.id] = item), res), {})
  for (const item of Object.values(map)) {
    if (!item.pId) {
      res.push(item)
    } else {
      const parent = map[item.pId]
      parent.child = parent.child || []
      parent.child.push(item)
    }
  }
  return res
}

// 扑克牌问题
function poke(arr) {
  let i = 1
  let out = []
  while (arr.length) {
    if (i % 2) {
      out.push(arr.shift())
    } else {
      arr.push(arr.shift())
    }
    i++
  }
  return out
}

function mySetInterval() {
  var args = arguments
  var timer = setTimeout(() => {
    args[0]()
    args.callee(...args)
  }, args[1])
  return timer
}
10000000000..toLocaleString('de-DE')

// 寻找字符空隙加 .
'10000000000'.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

// 寻找数字并在其后面加 . 
'10000000000'.replace(/(\d)(?=(\d{3})+\b)/g, '$1.')

function indexOf(arr, target, start = 0) {
  if (start < 0) start += arr.length;
  if (start >= arr.length) return -1;
  for (let i = start; i < arr.length; ++i) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function myIndexOf(arr, target, start = 0) {
  if (start < 0) start += arr.length;
  if (start >= arr.length) return -1;
  for (let i = start; i < arr.length; ++i) {
    if (arr[i] === target) return i;
  }
  return -1;
}

function normalize(str) {
  let arr = str.match(/\w+/g)
  let temp = {}
  let obj
  while (arr.length) {
    let item = arr.pop()
    temp.value = item
    obj && (temp.children = obj)
    if (arr.length) {
      obj = {
        ...temp
      }
      temp = {}
    } else {
      obj = temp
    }
  }
  return obj
}

// 递归查找
function erfen_digui(arr, val, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  let cent = Math.floor((right + left) / 2);
  if (arr[cent] === val) {
    return `最终查找结果下标为${cent}`;
  } else if (arr[cent] > val) {
    right = cent - 1;
  } else {
    left = cent + 1;
  }
  return erfen_digui(arr, val, left, right);
}
//非递归查找
function erfen_feidigui(arr, val) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    let cent = left + Math.floor((right - left) / 2);
    if (arr[cent] === val) {
      return `最终查找结果下标为${cent}`;
    } else if (arr[cent] > val) {
      right = cent - 1;
    } else {
      left = cent + 1;
    }
  }
  return -1;
}

//左边界查找（查找第一个元素）
function erfen_digui(arr, val, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  let cent = Math.floor((right + left) / 2);
  if (arr[cent] === val) {
    /****************改动点********************/
    if (arr[cent - 1] === val) {
      right = cent - 1;
    } else {
      return `最终查找结果下标为${cent}`;
    }
    /*****************************************/
  } else if (arr[cent] > val) {
    right = cent - 1;
  } else {
    left = cent + 1;
  }
  return erfen_digui(arr, val, left, right);
}

// 二分查找右边界（查找最后一个元素）
function erfen_digui(arr, val, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  let cent = Math.floor((right + left) / 2);
  if (arr[cent] === val) {
    /****************改动点********************/
    if (arr[cent + 1] === val) {
      left = cent + 1;
    } else {
      return `最终查找结果下标为${cent}`;
    }
    /*****************************************/
  } else if (arr[cent] > val) {
    right = cent - 1;
  } else {
    left = cent + 1;
  }
  return erfen_digui(arr, val, left, right);
}

function intersect(...args) {
  if (args.length === 0) {
    return []
  }

  if (args.length === 1) {
    return args[0]
  }

  return args.reduce((result, arg) => {
    return result.filter(item => arg.includes(item))
  })
}

// 大数相加

let a = "9007199254740991";
let b = "1234567899999999999";

function add(a, b) {
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength, 0); //"0009007199254740991"
  b = b.padStart(maxLength, 0); //"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; //"进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = t % 10 + sum;
  }
  if (f == 1) {
    sum = "1" + sum;
  }
  return sum;
}

// 数组去重<!--  -->
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
  return res.length === array.length ? false : true;
}

console.log(unique(array));
var array = [1, 1, '1'];

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

console.log(unique(array));
var array = [1, 2, 1, 1, '1'];

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
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
  })
}

function unique(array) {
  return Array.from(new Set(array));
}
console.log(unique(array));
// 数组扁平化
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

function flatten(arr) {
  return arr.toString().split(',').map(function (item) {
    return +item
  })
}

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

function get36() {
  let num = [];
  for (let i = 0; i < 36; i++) {
    if (i <= 9 && i >= 0) {
      num.push(i)
    } else {
      num.push(String.fromCharCode(i + 87))
    }
  }
  return num
}

function covert36(n) {
  let res = [];
  let arr = get36();
  while (n) {
    let tmp = n % 36;
    res.unshift(arr[tmp])
    n = parseInt(n / 36)
  }
  return res
}

function totalAmount() {
  let result = 0;
  let arr = [...performances.values()]
  performances.reduce((prev, next) => {

  })
  return result
}

实现一个抓包请求
这块一开始没了解清楚面试官的要求，然后具体问了下，最终理解下来是需要实现一个并发限制功能。
function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = [];
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++];
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);
    let r = Promise.resolve();
    if (executing.length >= poolLimit) {
      r = Promise.race(executing);
    }
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}
// 实现一个异步求和函数
// 提供一个异步add方法如下，需要实现一个await sum(...args)函数;
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}
//复制代码实现方式如下：
async function sum(...args) {
  if (args.length > 1) {
    const result = await new Promise((resolve) => {
      asyncAdd(args[0], args[1], (err, result) => {
        if (!err) {
          resolve(result);
        }
      });
    });
    return sum(result, ...args.splice(2));
  }
  return args[0];
}
//复制代码认真看的同学应该就能发现，
//当前版本存在一个优化点，计算时长可以缩短。优化版本如下：
function createAdd(a, b = 0) {
  return new Promise((resolve) => {
    asyncAdd(a, b, (err, result) => {
      if (!err) {
        resolve(result);
      }
    });
  });
}

async function sum(...args) {
  if (args.length > 1) {
    const result = [];
    for (let i = 0; i < args.length; i = i + 2) {
      result.push(createAdd(args[i], args[i + 1]));
    }
    return sum(...(await Promise.all(result)));
  }
  return args[0];
}

作者：Y的三次方
链接：https://juejin.cn/post/6844904149386002440
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。