/* 对象的拷贝 */
let obj = {a:1,b:{c:1}}
let obj2 = {...obj}
obj.a = 2
console.log(obj)  //{a:2,b:{c:1}} console.log(obj2); //{a:1,b:{c:1}}
obj.b.c = 2
console.log(obj)  //{a:2,b:{c:2}} console.log(obj2); //{a:1,b:{c:2}}
/* 数组的拷贝 */
let arr = [1, 2, 3];
let newArr = [...arr]; //跟arr.slice()是一样的效果


// 它不会拷贝对象的继承属性；
// 它不会拷贝对象的不可枚举的属性；
// 可以拷贝 Symbol 类型的属性。
let obj1 = { a:{ b:1 }, sym:Symbol(1)}; 
Object.defineProperty(obj1, 'innumerable' ,{
    value:'不可枚举属性',
    enumerable:false
});
let obj2 = {};
Object.assign(obj2,obj1)
obj1.a.b = 2;
console.log('obj1',obj1);
console.log('obj2',obj2);

// 拷贝数组
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr);  // [ 1, 2, 3 ]
console.log(newArr); // [ 1, 100, 3 ]

let arr = [1, 2, {val: 4}];
let newArr = arr.slice();
newArr[2].val = 1000;
console.log(arr);  //[ 1, 2, { val: 1000 } ]


// 浅拷贝
const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? []: {};
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

// 深拷贝
let a = {
  age: 1,
  jobs: {
      first: 'FE'
  }
}
let b = JSON.parse(JSON.stringify(a))
a.jobs.first = 'native'
console.log(b.jobs.first) // FE

// 深拷贝2

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    return new Date(obj)       // 日期对象直接返回一个新的日期对象
  }
  
  if (obj.constructor === RegExp){
    return new RegExp(obj)     //正则对象直接返回一个新的正则对象
  }
  
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  
  let allDesc = Object.getOwnPropertyDescriptors(obj)

  //遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  // 把cloneObj原型复制到obj上
  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) { 
    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
  }
  return cloneObj
}


// 木易杨
function cloneDeep3(source, hash = new WeakMap()) {

  if (!isObject(source)) return source; 
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表
    
  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值
  
  for(var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (isObject(source[key])) {
              target[key] = cloneDeep3(source[key], hash); // 新增代码，传入哈希表
          } else {
              target[key] = source[key];
          }
      }
  }
  return target;
}


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
  

  const o = deepClone(obj)
  console.log(o.objNumber === obj.objNumber);
  console.log(o.number === obj.number);
  console.log(o.objString === obj.objString);
  console.log(o.string === obj.string);
  console.log(o.objRegexp === obj.objRegexp);
  console.log(o.regexp === obj.regexp);
  console.log(o.date === obj.date);
  console.log(o.function === obj.function);
  console.log(o.array[0] === obj.array[0]);
  console.log(o[symbolName] === obj[symbolName]);