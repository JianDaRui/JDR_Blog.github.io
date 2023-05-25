Array.prototype.map = function(callbackfn, thisArg) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // Step 1. 转成数组对象，有 length 属性和 K-V 键值对
  let O = Object(this)
  // Step 2. 无符号右移 0 位，左侧用 0 填充，结果非负
  let len = O.length >>> 0
  // Step 3. callbackfn 不是函数时抛出异常
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }
  // Step 4.
  let T = thisArg
  // Step 5.
  let A = new Array(len)
  // Step 6.
  let k = 0
  // Step 7.
  while(k < len) {
    // Step 7.1、7.2、7.3
    // 检查 O 及其原型链是否包含属性 k
    if (k in O) {
      // Step 7.3.1
      let kValue = O[k]
      // Step 7.3.2 执行 callbackfn 函数
      // 传入 this, 当前元素 element, 索引 index, 原数组对象 O
      let mappedValue = callbackfn.call(T, kValue, k, O)
    	// Step 7.3.3 返回结果赋值给新生成数组
      A[k] = mappedValue
    }
    // Step 7.4
    k++
  }
  // Step 8. 返回新数组
  return A
}

// 代码亲测已通过


Array.prototype.filter = function(callbackfn, thisArg) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }

  let O = Object(this), len = O.length >>> 0,
      T = thisArg, A = new Array(len), k = 0
  // 新增，返回数组的索引
  let to = 0
  
  while(k < len) {
    if (k in O) {
      let kValue = O[k]
      // 新增
      if (callbackfn.call(T, kValue, k, O)) {
        A[to++] = kValue;
      }
    }
    k++
  }
  
  // 新增，修改 length，初始值为 len
  A.length = to;
  return A
}

// 代码亲测已通过


Array.prototype.reduce = function(callbackfn, initialValue) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this)
  let len = O.length >>> 0
  let k = 0, accumulator
  
  // 新增
  if (initialValue) {
    accumulator = initialValue
  } else {
    // Step 4.
    if (len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    // Step 8.
    let kPresent = false
    while(!kPresent && (k < len)) {
      kPresent = k in O
      if (kPresent) {
        accumulator = O[k] 
      }
      k++
    }
  }
  
  while(k < len) {
    if (k in O) {
      let kValue = O[k]
      accumulator = callbackfn.call(undefined, accumulator, kValue, k, O)
    }
    k++
  }
  return accumulator
}

// 代码亲测已通过