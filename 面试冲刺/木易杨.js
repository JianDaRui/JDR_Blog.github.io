/***********************************/ 
// 如果是对象/数组，返回一个空的对象/数组，
// 都不是的话直接返回原对象
// 判断返回的对象和原有对象是否相同就可以知道是否需要继续深拷贝
// 处理其他的数据类型的话就在这里加判断
function getEmpty(o){
	if(Object.prototype.toString.call(o) === '[object Object]'){
		return {};
	}
	if(Object.prototype.toString.call(o) === '[object Array]'){
		return [];
	}
	return o;
}

function deepCopyBFS(origin){
	let queue = [];
	let map = new Map(); // 记录出现过的对象，用于处理环

	let target = getEmpty(origin);
	if(target !== origin){
		queue.push([origin, target]);
		map.set(origin, target);
	}

	while(queue.length){
		let [ori, tar] = queue.shift();
		for(let key in ori){
			// 处理环状
			if(map.get(ori[key])){
				tar[key] = map.get(ori[key]);
				continue;
			}

			tar[key] = getEmpty(ori[key]);
			if(tar[key] !== ori[key]){
				queue.push([ori[key], tar[key]]);
				map.set(ori[key], tar[key]);
			}
		}
	}

	return target;
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

// test
[deepCopyBFS, deepCopyDFS].forEach(deepCopy=>{
	console.log(deepCopy({a:1}));
	console.log(deepCopy([1,2,{a:[3,4]}]))
	console.log(deepCopy(function(){return 1;}))
	console.log(deepCopy({
		x:function(){
			return "x";
		},
		val:3,
		arr: [
			1,
			{test:1}
		]
	}))

	let circle = {};
	circle.child = circle;
	console.log(deepCopy(circle));
})

/***********************************/ 
// 扁平化 并 去重
Array.prototype.flat= function() {
  return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : [item])));
}

Array.prototype.unique = function() {
  return [...new Set(this)]
}

const sort = (a, b) => a - b;

console.log(arr.flat().unique().sort(sort)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
// 两个数组合并成一个数组
// 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 
// 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。


let a1 =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a2 = ['A', 'B', 'C', 'D'].map((item) => {
  return item + 3
})

let a3 = [...a1, ...a2].sort().map((item) => {
  if(item.includes('3')){
    return item.split('')[0]
  }
  return item
})

/**************** sleep 函数 实现 ***************/ 
//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{console.log(1)})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}

'AbcDefGh'.replace(/[a-zA-Z]/g,function(a){ return /[a-z]/.test(a)?a.toUpperCase():a.toLowerCase(); });

// 字符串查找
// 因为 T 的 length 是一定的，所以在循环S的的时候 ，循环当前项 i 后面至少还有 T.length 个元素
const find = (S, T) => {
  if (S.length < T.length) return -1;
  for (let i = 0; i < S.length - T.length ; i++) {
      if (S.substr(i, T.length) === T) return i ;
  };
  return -1;


/** 对称数 **/
let result=[]
for(let i=1;i<10;i++){
    result.push(i)
    result.push(i*11)
    for(let j=0;j<10;j++){
        result.push(i*101+j*10)
        result.push(i*1001+j*110)
    }
}
// 移动零
function moveZeroToLast(arr) {
  let index = 0;
  for (let i = 0, length = arr.length; i < length; i++) {
      if (arr[i] === 0) {
          index++;
      } else if (index !== 0) {
          arr[i - index] = arr[i];
          arr[i] = 0;
      }
  }
  return arr;
}


function add() {
  let args = [].slice.call(arguments);
  let fn = function() {
    let fn_args = [].slice.call(arguments)
    return add.apply(null, args.concat(fn_args))
  }
  fn.toString = function() {
    return args.reduce((a,b)=>a+b)
  }
  return fn
}

// 数组转树
function convert(source, parentId = 0){
  let trees = [];
  for (let item of source) {
    if(item.parentId === parentId) {
      let children = convert(source, item['id']);
      if(children.length) {
        item.children = children
      }
      trees.push(item);
    }
  }
  return trees;
}

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

// 寻找 路径上的父级 ID
function bfs(target, id) {
  const quene = [...target]
  do {
    const current = quene.shift()
    if (current.children) {
      quene.push(...current.children.map(x => ({ ...x, path: (current.path || current.id) + '-' + x.id })))
    }
    if (current.id === id) {
      return current
    }
  } while(quene.length)
  return undefined
}

function dfs(target, id) {
  const stask = [...target]
  do {
    const current = stask.pop()
    if (current.children) {
      stask.push(...current.children.map(x => ({ ...x, path: (current.path || current.id) + '-' + x.id })))
    }
    if (current.id === id) {
      return current
    }
  } while(stask.length)
  return undefined
}

// 公共的搜索方法，默认bfs
function commonSearch(target, id, mode) {
  const staskOrQuene = [...target]
  do {
    const current = staskOrQuene[mode === 'dfs' ? 'pop' : 'shift']()
    if (current.children) {
      staskOrQuene.push(...current.children.map(x => ({ ...x, path: (current.path || current.id) + '-' + x.id })))
    }
    if (current.id === id) {
      return current
    }
  } while(staskOrQuene.length)
  return undefined
}

// 1234===> '4321'
function fun(num){
  let num1 = num / 10;
  let num2 = num % 10;
  if(num1 < 1) {
      return num;
  } else {
      num1 = Math.floor(num1)
      return `${num2}${fun(num1)}`
  }
}
var a = fun(12345)
console.log(a)


'use strict'
const valuesMap = new Map()

class LocalStorage {
  getItem (key) {
    const stringKey = String(key)
    if (valuesMap.has(key)) {
      return String(valuesMap.get(stringKey))
    }
    return null
  }

  setItem (key, val) {
    valuesMap.set(String(key), String(val))
  }

  removeItem (key) {
    valuesMap.delete(key)
  }

  clear () {
    valuesMap.clear()
  }

  key (i) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.") // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
    }
    var arr = Array.from(valuesMap.keys())
    return arr[i]
  }

  get length () {
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


new URLSearchParams('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33').get('elective')

/* 洗牌算法：
    1.生成一个0 - arr.length 的随机数
    2.交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
    3.生成一个0 - arr.length - 1 的随机数
    4.交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组
    依次类推，直至取完所需的10k个元素
*/

function shuffle(arr, size) {
  let result = []
  for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * (arr.length - i))
      const item = arr[randomIndex]
      result.push(item)
      arr[randomIndex] = arr[arr.length - 1 - i]
      arr[arr.length - 1 - i] = item
  }
  return result
}

// 输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'

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
console.log(simplifyStr(nums1).join(','))

// 对象 扁平化
function flatObj(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`;
      if (typeof obj[key] === 'object')
        flatObj(obj[key], keyName+".", result)
      else
        result[keyName] = obj[key];
    }
  }
  return result;
}

var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

function map(entry) {
  const obj = Object.create(null);
  for (const key in entry) {
    const keymap = key.split('.');
    set(obj, keymap, entry[key])
  }
  return obj;
}

function set(obj, map, val) {
  let tmp;
  if (!obj[map[0]]) obj[map[0]] = Object.create(null);
  tmp = obj[map[0]];
  for (let i = 1; i < map.length; i++) {
    if (!tmp[map[i]]) tmp[map[i]] = map.length - 1 === i ? val : Object.create(null);
    tmp = tmp[map[i]];
  }
}
console.log(map(entry));


// 从1 到n 整数中  1 出现的次数 
// https://www.muyiy.cn/question/program/121.html
function countOne(n) {
  var factor = 1;
  let count = 0;
  let next = parseInt(n / factor);
  while (next !== 0) {
      var lower = n - next * factor
      var curr = next % 10;
      var high = parseInt(n / (10 * factor));

      if (curr === 0) {
          count += high * factor;
      } else if (curr === 1) {
          count += high * factor + lower + 1
      } else {
          count += (high + 1) * factor
      }

      factor *= 10;
      next = parseInt(n / factor);
  }
  return count;
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


function mySetInterval() {
  var args = arguments
  var timer = setTimeout(() => {
    args[0]()
    args.callee(...args)
  }, args[1])
  return timer
}

var timer = mySetInterval(() => {
  console.log(111)
}, 1000)

function rangeDay (day1, day2) {
  const result = []
  const dayTimes = 24*60*60*1000
  const startTime = day1.getTime()
  const range = day2.getTime() - startTime
  let total = 0
  
  while (total <= range && range > 0) {
      result.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))
      total += dayTimes
  }
  return result
};
rangeDay(new Date("2015-02-08"), new Date("2015-03-03"))


// 德国以 . 分割金钱, 转到德国当地格式化方案即可
10000000000..toLocaleString('de-DE') 

// 寻找字符空隙加 .
'10000000000'.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

// 寻找数字并在其后面加 . 
'10000000000'.replace(/(\d)(?=(\d{3})+\b)/g, '$1.')

// 字符转二进制
function charToBinary(text) {
  var code = "";
  for (let i of text) {
    // 字符编码
    let number = i.charCodeAt().toString(2);
    // 1 bytes = 8bit，将 number 不足8位的0补上
    for (let a = 0; a <= 8 - number.length; a++) {
      number = 0 + number;
    }
    code += number;
  }
  return code;
}
// 二进制转Base64
// 将二进制数据每 6bit 位替换成一个 base64 字符
function binaryTobase64(code) {
  let base64Code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let res = '';
  // 1 bytes = 8bit，6bit 位替换成一个 base64 字符
  // 所以每 3 bytes 的数据，能成功替换成 4 个 base64 字符
    
  // 对不足 24 bit (也就是 3 bytes) 的情况进行特殊处理
  if (code.length % 24 === 8) {
    code += '0000';
    res += '=='
  }
  if (code.length % 24 === 16) {
    code += '00';
    res += '='
  }

  let encode = '';
  // code 按 6bit 一组，转换为
  for (let i = 0; i < code.length; i += 6) {
    let item = code.slice(i, i + 6);
    encode += base64Code[parseInt(item, 2)];
  }
  return encode + res;
}

// 字符转Base64
function base64encode(text) {
  let base64Code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let res = '';
  let i = 0;
  while (i < text.length) {
    let char1, char2, char3, enc1, enc2, enc3, enc4;
    
    // 三个字符一组，转二进制
    char1 = text.charCodeAt(i++); 
    char2 = text.charCodeAt(i++);
    char3 = text.charCodeAt(i++);

    enc1 = char1 >> 2; // 取第 1 字节的前 6 位
    
    // 三个一组处理
    if (isNaN(char2)) {
      // 只有 1 字节的时候
      enc2 = ((char1 & 3) << 4) | (0 >> 4);
      // 第65个字符用来代替补位的 = 号
      enc3 = enc4 = 64;
    } else if (isNaN(char3)) {
      // 只有 2 字节的时候
      enc2 = ((char1 & 3) << 4) | (char2 >> 4);
      enc3 = ((char2 & 15) << 2) | (0 >> 6);
      enc4 = 64;
    } else {
      enc2 = ((char1 & 3) << 4) | (char2 >> 4); // 取第 1 个字节的后 2 位(3 = 11 << 4 = 110000) + 第 2 个字节的前 4 位
      enc3 = ((char2 & 15) << 2) | (char3 >> 6); // 取第 2 个字节的后 4 位 (15 = 1111 << 2 = 111100) + 第 3 个字节的前 2 位
      enc4 = char3 & 63; // 取最后一个字节的最后 6 位 (63 = 111111)
    }
    
    // 转base64
    res += base64Code.charAt(enc1) + base64Code.charAt(enc2) + base64Code.charAt(enc3) + base64Code.charAt(enc4)
  }

  return res;
}
// 字符转Base64-最优解（window.btoa，window.atob）✅✅✅
let encodedData = window.btoa("this is a example");
console.log(encodedData); // dGhpcyBpcyBhIGV4YW1wbGU=

let decodeData = window.atob(encodedData);
console.log(decodeData); // this is a example


// node 端： toBase64:

Buffer.from('123').toString('base64')
decode:

Buffer.from('MTIz', 'base64').toString()
// 浏览器端： toBase64

btoa('123')
decode

atob('MTIz')
// btoa 和 atob 都是 window 上的方法，atob 全称 ascii to binary ，反之亦然


//递归查找
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


function indexOf(arr,target,start=0){
  if(start<0) start+=arr.length;
  if(start>=arr.length) return -1;
  for(let i=start;i<arr.length;++i){
     if(arr[i]===target) return i;
}
return -1;
}


/***********************************编程题*************************************/
// 介绍下深度优先遍历和广度优先遍历，如何实现？

const dfs = (node, nodeList) => {
  if(node !== null) {
    nodeList.push(node)
    let children = node.children
    for(let i = 0; i < children.length; i++) {
      dfs(children[i], nodeList)
    }
  }
  return nodeList
}


const sdfs = (node) => {
  const stack = []
  const nodes = []

  if(node) {
    stack.push(node)
    while(stack.length) {
      let item = stack.pop()
      let children = item.children
      nodes.push(item)
      for(let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}

const bfs = () => {
  const node = []
  const queue = []
  if (node) {
    queue.push(node)
    while (queue.length) {
      let item = queue.shift()
      let children = item.children
      nodes.push(item)
        // 队列，先进先出
        // nodes = [] stack = [parent]
        // nodes = [parent] stack = [child1,child2,child3]
        // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
        // nodes = [parent,child1,child2]
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
    }
  }
  return nodes
}

// 请分别用深度优先思想和广度优先思想实现一个拷贝函数？
function getEmpty(o){
	if(Object.prototype.toString.call(o) === '[object Object]'){
		return {};
	}
	if(Object.prototype.toString.call(o) === '[object Array]'){
		return [];
	}
	return o;
}

function deepCopyBFS(origin) {
  const map = new Map
  const queue = []

  let target = getEmpty(origin)
  if(target !== origin) {
    queue.push([origin, target])
    map.set(origin, target)
  }
  while(queue.length) {
    const [ori, tar] = queue.shift()
    for(let key in ori) {
      if(map.has(ori[key])) {
        tar[key] = map.get(ori[key])
        continue
      }

      tar[key] = getEmpty(ori[key])
      if(tar[key] !== ori[key]) {
        queue.push([origin[key], target[key]])
        map.set(origin[key], target[key])
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

// 偏平化数组 并 去重 并排序

arr.toString().split(',').sort((a, b) => a - b)

[...new Set(arr.flat(Infinity))].sort((a, b) => a - b)

Array.prototype.flat= function() {
  return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : [item])));
}

Array.prototype.unique = function() {
  return [...new Set(this)]
}

const sort = (a, b) => a - b;

console.log(arr.flat().unique().sort(sort)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]


// 手写 new 实现
function create() {
  let obj = Object.create(null)
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let res = Con.apply(obj, arguments)
  return res instanceof Object ? res : obj
}
function _new (fn, ...args) {
  const obj = Object.create(fn.prototype)
  const res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}


// 两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，
// 合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。

let a2 = ['A', 'B', 'C', 'D'].map((item) => {
  return item + 3
})

let a3 = [...a1, ...a2].sort().map((item) => {
  if(item.includes('3')){
    return item.split('')[0]
  }
  return item
})

// flatten 函数的实现
const flatten = array => array.reduce(
  (acc, cur) => (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), []
)

// 实现一个 sleep 函数

//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{console.log(1)})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//ES5
function sleep(callback,time) {
  if(typeof callback === 'function')
    setTimeout(callback,time)
}

function output(){
  console.log(1);
}
sleep(output,1000);

// 冒泡排序 写法 并改进
function bubbleSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}

function bubbleSort1(arr) {
  let i = arr.length - 1;

  while (i > 0) {
      let pos = 0;
      for (let j = 0; j < i; j++) {
          if (arr[j] > arr[j + 1]) {
              pos = j;
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          }
      }
      i = pos;
  }
  console.log(arr);
}

function fn(arr) {

  let i = arr.length - 1
  while(i > 0) {
    let pos = 0
    for(let j = 0; j < i; j++) {
      if(arr[j] > arr[j + 1]) {
        pos = j
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    i = pos
  }
}
// test
[deepCopyBFS, deepCopyDFS].forEach(deepCopy=>{
	console.log(deepCopy({a:1}));
	console.log(deepCopy([1,2,{a:[3,4]}]))
	console.log(deepCopy(function(){return 1;}))
	console.log(deepCopy({
		x:function(){
			return "x";
		},
		val:3,
		arr: [
			1,
			{test:1}
		]
	}))

	let circle = {};
	circle.child = circle;
	console.log(deepCopy(circle));
})

// 实现一懒汉类
class LazyManClass {
  constructor(name) {
    this.taskList = [];
    this.name = name;
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
        this.next();
    }, 0);
  }
  eat (name) {
    var that = this;

    var fn = (function (n) {
        return function () {
            console.log(`I am eating ${n}`)
            that.next();
        }
    })(name);

    this.taskList.push(fn);
    return this;
  }
  sleepFirst (time) {
    var that = this;
    
    var fn = (function (t) {
        return function () {
            setTimeout(() => {
                console.log(`等待了${t}秒...`)
                that.next();
            }, t * 1000);  
        }
    })(time);

    this.taskList.unshift(fn);
    return this;
  }
  sleep (time) {
    var that = this

    var fn = (function (t) {
        return function () {
            setTimeout(() => {
                console.log(`等待了${t}秒...`)
                that.next();
            }, t * 1000); 
        }
    })(time);

    this.taskList.push(fn);
    return this;
  }
  next () {
    var fn = this.taskList.shift();
    fn && fn();
  }
}
function LazyMan(name) {
  return new LazyManClass(name);
}
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');

// 计算数组交集

function intersect (arr1, arr2) {
  const hash = {}
  const res = []
  for(let n of arr1) {
    if(hash[n]) {
      hash[n]++
    } else {
      hash[n] = 1
    }
  }

  for(let n of arr2) {
    if(hash[n] > 0) {
      res.push(n)
      hash[n]--
    }
  }
  return res
}

// 数组编程题 区间划分
function fromArr(arr) {
  const sortarr = [...new Set(arr)].sort((a, b) => a - b)

  return sortarr.reduce((acc, cur) => {
    const lastArr = arr.slice().pop() || []
    const lastVal = lastArr.slice().pop()

    if(lastVal && cur - lastVal) {
      lastArr.push(cur)
    } else {
      acc.push([cur])
    }
    return acc
  }, [])
}

// 字符串 大小写取反
'AahkAHDfKs'.replace(/a-zA-Z/, a => /a-z/.test(a) ? a.toUpperCase() : a.toLowerCase())

// Proxy 实现数据绑定
const model = document.getElementById("model")
const word = document.getElementById("word")
var obj= {};

const handler = {
  get: function(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set: function(target, key, valeu, recevier) {
    if(key === 'text') {
      modle.value = value
      word.innerHtml = value
    }
    return Reflect.set(target, key, value, recevier)
  }
}

const newObj = Proxy(obj, handler)

modle.addEventListener('keyup', function(e) {
  newObj.text = e.target.value
})

// 旋转数组


// 返回1-1000之间的所有对称数
function getNum () {
  const reslut = []
  for(let i = 1; i < 10; i++) {
    reslut.push(i)
    reslut.push(i * 11)
    for(let j = 0; j < 10; j++) {
      reslut.push(i * 101 + j * 10)
      reslut.push(i * 1001 + j * 110)
    }
  }
  return result
}

// 移动数组中的零 将0移动至数组的末尾 使用双指针技巧
function moveZero(arr) {
  let i = 0;
  let j = 0;
  while (j < arr.length) {
    if (arr[i] !== 0) {
      i++
    } else if (arr[j] !== 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
    }
    j++
  }
}

// 函数柯里化
function add() {
  let args = [...arguments]

  const fn = function () {
    let new_arg = [...args, ...arguments]
    return add.apply(null, new_arg)
  }

  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }

  return fn
}

// 两数之和
function anwser (arr, target) {
  let map = {}
  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = i
  }
  for (let i = 0; i < arr.length; i++) {
    var d = target - arr[i]
    if (map[d]) {
      return [i, map[d]]
    }
  }
  return new Error('404 not found')
}
// 正确网址判断方法

function isUrl(url) {
  try{
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

// 把原始list转为树形结构
// 原始 list 如下
let list =[
  {id:1,name:'部门A',parentId:0},
  {id:2,name:'部门B',parentId:0},
  {id:3,name:'部门C',parentId:1},
  {id:4,name:'部门D',parentId:1},
  {id:5,name:'部门E',parentId:2},
  {id:6,name:'部门F',parentId:3},
  {id:7,name:'部门G',parentId:2},
  {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);

function convert(list, parentId) {
  const result = []
  for(let item of list) {
    if(item.parentId === parentId) {
      result.push(item)
      item.children = convert(list, item.id)
    }
  }
  return result
}

function convert(list, parentId) {
  const result = []
  const map = list.reduce((res, v) => (res[v.id] = v, res), {})

  for(const item of list) {
    if(item.parentId === parentId) {
      res.push(item)
      continue
    }
    if(item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return result
}

// 实现模糊搜索高亮显示
// 考过


// 已知数据格式，实现一个函数fn找出链条中的所有父级id
function bfs(target, id) {
  const queue = [...target]
  while(queue.length) {
    const current = queue.shift()
    if(current.children) {
      queue.push(...current.children.map(x => ({...x, path: (current.path || current.id ) + '-' + x.id })))
    }
  }
  return undefined  
}

// 找出 两个有序数组的中位数
function findMdian(nums1, nums2) {
  let nums = []
  while(nums1.length && nums2.length) {
    if(nums[0] < nums2[0]) {
      nums.push(nums1.shift())
    } else {
      nums.push(nums2.shift())
    }
  }
  nums = [...nums, nums1, nums2]
  var median
  if (nums.length % 2) {
    median = nums[Math.floor(nums.length / 2)]
  } else {
    var m = nums.length / 2
    median = (nums[m - 1] + nums[m]) / 2
  }
  return median
}

// 实现一个深拷贝，考虑循环引用与Symbol

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
  array: [{a: 1}, 2],
  [symbolName]: 111
}
obj.d = obj;

const isObject = obj => obj !== null && (typeof obj === 'object' || typeof obj === 'function');
const isFunction = obj => typeof obj === 'function'
function deepClone (obj, hash = new WeakMap()) {
  // 循环引用处理
  if (hash.get(obj)) {
    return hash.get(obj);
  }
  // 基本类型
  if (!isObject(obj)) {
    return obj;
  }
  // 函数类型
  if (isFunction(obj)) {
    // function返回原引用
    return obj;
  }

  let cloneObj;
  // 获取对象构造函数
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
  // 循环遍历属性
  [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].forEach(k => {
    cloneObj[k] = deepClone(obj[k], hash);
  })
  return cloneObj;
}

// 编程算法题
function fun(num) {
  let num1 = num / 10
  let num2 = num % 10
  if(num1 < 1) {
    return num
  } else {
    num1 = Math.floor(num1)
    return `${num2}${fun(num1)}`
  }
}

// 修改函数 达到目标输出
function print(n) {
  setTimeout(() => {
    console.log(n)
  }, 1, Math.floor(Math.random() * 1000))
}
for(let i = 0; i < 100; i++) {
  print(n)
}

// 不用加减乘除 求整数的7倍
function bitAdd(m,n) {
  while(m) {
    [m, n] = [(m & n) << 1, m ^ n]
  }
  return n
}
function multiply7(num){
  let sum = 0;
  for(var i = 0; i < 7; i++){
      sum = bitAdd(sum, num);
  }
  return sum;
}

// 模拟实现一个localStorage
'use strict'
const valuesMap = new Map()

class LocalStorage {
  getItem (key) {
    const stringKey = String(key)
    if (valuesMap.has(key)) {
      return String(valuesMap.get(stringKey))
    }
    return null
  }

  setItem (key, val) {
    valuesMap.set(String(key), String(val))
  }

  removeItem (key) {
    valuesMap.delete(key)
  }

  clear () {
    valuesMap.clear()
  }

  key (i) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.") // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
    }
    var arr = Array.from(valuesMap.keys())
    return arr[i]
  }

  get length () {
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

// localStorage
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

// URL 处理
// https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
URLSearchParams()

// 洗牌算法 从数组中随机获取部分元素
function shuffle(arr, size) {
  const result = []
  for(let i = 0; i < size; i++) {

    const randomIndex = Math.floor(Math.random() * (arr.length - i))

    const item = arr[randomIndex]
    result.push(item)
    [arr[randomIndex], arr[arr.length - 1 - i]]= [arr[arr.length - 1 - i], arr[randomIndex]]
  }
  return result
}

//  数组分区
fucntion simplifyStr(num) {
  const result = []
  let temp = nums[0]
  num.forEach((value, index) => {
    if(value + 1 !== num[index + 1]) {
      if(temp !== value) {
        result.push(`${temp}~${value}`)
      } else {
        result.push(`${value}`)
      }
      temp = num[index + 1]
    }
  })
  return result
}

// 转对象
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

// 要求转换成如下对象
var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

function flatObj(entry, result, key = '') {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`;
      if (typeof obj[key] === 'object') {
        flatObj(obj[key], keyName+".", result)
      } else {
        result[keyName] = obj[key];
      }
    }
  }
  return result;
}

function map(entry) {
  const obj = Object.create(null)
  for(const key in entry) {
    const keymap = key.split('.')
    set(obj, keymap, entry[key])
  }
  return obj;
}

function set(obj, map, val) {
  let tem
  if(!obj[map[0]]) obj[map[0]] = Object.create(null)
  temp = obj[map[0]]
  
  for(let i = 1; i < map.length; i++) {
    if (!tmp[map[i]]) tmp[map[i]] = map.length - 1 === i ? val : Object.create(null);
      tmp = tmp[map[i]];
  }
}

// 数组去重
function hash(arg) {
  if (typeof arg === 'string') return `"${arg}"`
  if (typeof arg === 'number' || typeof arg === 'undefined') return `${arg}`
  if (typeof arg === 'symbol' || typeof arg === 'boolean') return arg.toString()
  if (arg === null) return 'null'
  if (Array.isArray(arg)) {
      let res = '['
      for (const item of arg) {
          res += `${hash(item)},`
      }
      res += ']'
      return res
  }
  let res = '{'
  const keys = Object.keys(arg).sort()
  for (const key of keys) {
      res += `${key}:${hash(arg[key])},`
  }
  res += '}'
  return res
}

function distinct(arr) {
  const res = []
  const map = {}
  for (const item of arr) {
      const key = hash(item)
      if (!map[key]) {
          map[key] = 1
          res.push(item)
      }
  }
  return res
}

// 单向链表实现
class LinkList {
  constructor() {
    this.head = null
  }

  find(value) {
    let curNode = this.head
    while (curNode.value !== value) {
      curNode = curNode.next
    }
    return curNode
  }

  findPrev(value) {
    let curNode = this.head
    while (curNode.next!==null && curNode.next.value !== value) {
      curNode = curNode.next
    }
    return curNode
  }

  insert(newValue, value) {
    const newNode = new Node(newValue)
    const curNode = this.find(value)
    newNode.next = curNode.next
    curNode.next = newNode
  }

  delete(value) {
    const preNode = this.findPrev(value)
    const curNode = preNode.next
    preNode.next = preNode.next.next
    return curNode
  }
}

class Node {
  constructor(value, next) {
    this.value = value
    this.next = null
  }
}
// 统计题 1 ~ n 的 整数中 1 出现的次数
function countOne(n) {
  let factor = 1
  let count = 0
  let next = parseInt(n / factor)
  while(next !== 0) {
    let lower = n - next * factor
    let curr = next % 10
    let high = parseInt(n / (10 * factor))

    if(curr === 0) {
      count += high * factor
    } else if (curr === 1) {
      count += high * factor + lower + 1
    } else {
      count += (high + 1) * factor
    }

    factor *= 10;
    next = parseInt(n / factor);
  }
  return count;
}

// 扑克牌问题
function poke(arr) {
  let i = 1
  let out = []
  while(arr.length) {
    if(i % 2) {
      out.push(arr.shift())
    } else {
      arr.push(arr.shift())
    }
    i++
  }
  return
}

function reverse(arr) {
  let i = 1
  let out = []
  while(arr.length) {
    if(i % 2) {
      out.unshift(arr.pop())
    } else {
      out.unshift(out.pop())
    }
    i++
  }
  return out
}

// 实现一个 可拖拽 dialog 类

// setTimeout 实现 setInterval
function mySetInterval() {
  mySetInterval.timer = setTimeout(() => {
      arguments[0]()
      mySetInterval(...arguments)
  }, arguments[1])
}

mySetInterval.clear = function() {
  clearTimeout(mySetInterval.timer)
}

mySetInterval(() => {
  console.log(11111)
}, 1000)

setTimeout(() => {
  // 5s 后清理
  mySetInterval.clear()
}, 5000)

// 求两个有效日期中的有效日期
function rangeDay (day1, day2) {
  const result = []
  const dayTimes = 24 * 60 * 60 * 1000
  const startTime = day1.getTime()
  // 获取范围
  const range = day2.getTime() - startTime
  let total = 0
  
  while (total <= range && range > 0) {
    result.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))

    total += dayTimes
  }
  return result
};

// 求数组交集
let a = new Set([1, 2, 3]); 
let b = new Set([4, 3, 2]); 
let intersect = new Set([...a].filter(x => b.has(x))); // set {2, 3}

// 分割 1000000000
// 德国以 . 分割金钱, 转到德国当地格式化方案即可
10000000000..toLocaleString('de-DE') 

// 寻找字符空隙加 .
'10000000000'.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

// 寻找数字并在其后面加 . 
'10000000000'.replace(/(\d)(?=(\d{3})+\b)/g, '$1.')

// 手写 二进制转Base64
// 字符转二进制
function charToBinary(text) {
  var code = "";
  for (let i of text) {
    // 字符编码
    let number = i.charCodeAt().toString(2);
    // 1 bytes = 8bit，将 number 不足8位的0补上
    for (let a = 0; a <= 8 - number.length; a++) {
      number = 0 + number;
    }
    code += number;
  }
  return code;
}
// node 端：
// toBase64:
Buffer.from('123').toString('base64')
// decode:
Buffer.from('MTIz', 'base64').toString()
// 浏览器端：
// toBase64
btoa('123')
// decode
atob('MTIz')
// btoa 和 atob 都是 window 上的方法，atob 全称 ascii to binary ，反之亦然

// 二分查找左右边界
//递归查找
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

// indexOf 实现
function indexOf(arr,target,start=0){
  if(start < 0) start += arr.length;
  if(start >= arr.length) return -1;
  for(let i = start; i < arr.length; ++i){
    if(arr[i] === target) return i;
  }
  return -1;
}
/***********************************编程题*************************************/ 
