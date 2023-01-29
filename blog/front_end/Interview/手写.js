// 计算字符串字节长度
function GetBytes(str){
  var len = str.length;
  var bytes = len;
  for(var i = 0; i < len; i++){
      if (str.charCodeAt(i) > 255) bytes++;
  }

  return bytes;
}

alert(GetBytes("你好,as"));


// 克隆
// 方法一：
Object.prototype.clone = function(){
  var o = this.constructor === Array ? [] : {};
  for(var e in this){
          o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
  }
  return o;
}

//方法二：
/**
* 克隆一个对象
* @param Obj
* @returns
*/
function clone(Obj) {   
  var buf;   
  if (Obj instanceof Array) {   
    buf = [];                    //创建一个空的数组
    var i = Obj.length;   
    while (i--) {   
        buf[i] = clone(Obj[i]);   
    }   
    return buf;    
  } else if (Obj instanceof Object){   
    buf = {};                   //创建一个空对象
    for (var k in Obj) {           //为这个对象添加新的属性
      buf[k] = clone(Obj[k]);   
    }   
    return buf;   
  } else {                         //普通变量直接赋值
    return Obj;   
  }   
}

// instanceof 实现
// 我们也可以试着实现一下 instanceof
function instanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype
  // 获得对象的原型
  left = left.__proto__
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null)
      return false
    if (prototype === left)
      return true
    left = left.__proto__
  }
}

// bind 实现
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}

// call 实现

Function.prototype.call = function (context) {
  context = context ? Object(context) : window; 
  var fn = Symbol(); // added
  context[fn] = this; // changed

  let args = [...arguments].slice(1);
  let result = context[fn](...args); // changed

  delete context[fn]; // changed
  return result;
}
// 测试用例在下面
Function.prototype.myCall = function (context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'pp', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'pp', '24') => a.fn('pp', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}

Function.prototype.apply = function (context, arr) {
  context = context ? Object(context) : window; 
  context.fn = this;

  var result;
  // 判断是否存在第二个参数
  if (!arr) {
      result = context.fn();
  } else {
      var args = [];
      for (var i = 0, len = arr.length; i < len; i++) {
          args.push('arr[' + i + ']');
      }
      result = eval('context.fn(' + args + ')');
  }

  delete context.fn
  return result;
}
// apply 实现
Function.prototype.myApply = function(context = window, ...args) {
  // this-->func  context--> obj  args--> 传递过来的参数
  // 在context上加一个唯一值不影响context上的属性
  let key = Symbol('key')
  context[key] = this; // context为调用的上下文,this此处为函数，将这个函数作为context的方法
  // let args = [...arguments].slice(1)   //第一个参数为obj所以删除,伪数组转为数组
  
  let result = context[key](...args); 
  delete context[key]; // 不删除会导致context属性越来越多
  return result;
}

// new 手写实现
function create(fn, ...args) {
  if(typeof fn !== 'function') {
    throw 'fn must be a function';
  }
	// 1、用new Object() 的方式新建了一个对象obj
  // var obj = new Object()
	// 2、给该对象的__proto__赋值为fn.prototype，即设置原型链
  // obj.__proto__ = fn.prototype

  // 1、2步骤合并
  // 创建一个空对象，且这个空对象继承构造函数的 prototype 属性
  // 即实现 obj.__proto__ === constructor.prototype
  var obj = Object.create(fn.prototype);

	// 3、执行fn，并将obj作为内部this。使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  var res = fn.apply(obj, args);
	// 4、如果fn有返回值，则将其作为new操作返回内容，否则返回obj
	return res instanceof Object ? res : obj;
};

function myNew(fn, ...args) {
  if(typeof fn !== 'function') return new Error()
  const obj = Object.create(fn.prototype)
  const res = fn.apply(obj, args)
  return typeof res === 'object' && res !== null ? res : obj
}
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

// new 实现
function create() {
	// 1、获得构造函数，同时删除 arguments 中第一个参数
    Con = [].shift.call(arguments);
	// 2、创建一个空的对象并链接到原型，obj 可以访问构造函数原型中的属性
    var obj = Object.create(Con.prototype);
	// 3、绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
	// 4、优先返回构造函数返回的对象
	return ret instanceof Object ? ret : obj;
};


// Object assign
if (typeof Object.assign2 != 'function') {
  // Attention 1
  Object.defineProperty(Object, "assign2", {
    value: function (target) {
      'use strict';
      if (target == null) { // Attention 2
        throw new TypeError('Cannot convert undefined or null to object');
      }

      // Attention 3
      var to = Object(target);
        
      for (var index = 1; index < arguments.length; index++) {
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
  });
}


