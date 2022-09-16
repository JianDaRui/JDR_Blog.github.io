function add(a) {
  function sum(b) { // 使用闭包
    a = a + b; // 累加
    return sum;
  }
  sum.toString = function() { // 重写toString()方法
      return a;
  }
  return sum; // 返回一个函数
}

add(1); // 1
add(1)(2);  // 3
add(1)(2)(3)； // 6
add(1)(2)(3)(4)； // 10 

// Curry

// 木易杨
const add = (...args) => args.reduce((a, b) => a + b);

// 简化写法
function currying(func) {
    const args = [];
    return function result(...rest) {
        if (rest.length === 0) {
          return func(...args);
        } else {
          args.push(...rest);
        	return result;
        }
    }
}

const sum = currying(add);

sum(1,2)(3); // 未真正求值
sum(4); 		 // 未真正求值
sum(); 			 // 输出 10


// 木易杨

// 注释 1：第一次调用获取函数 fn 参数的长度，后续调用获取 fn 剩余参数的长度

// 注释 2：currying 包裹之后返回一个新函数，接收参数为 ...args

// 注释 3：新函数接收的参数长度是否大于等于 fn 剩余参数需要接收的长度

// 注释 4：满足要求，执行 fn 函数，传入新函数的参数

// 注释 5：不满足要求，递归 currying 函数，
//       新的 fn 为 bind 返回的新函数（bind 绑定了 ...args 参数，未执行），
//       新的 length 为 fn 剩余参数的长度
function currying(fn, length) {
  length = length || fn.length; 	// 注释 1
  return function (...args) {			// 注释 2
    return args.length >= length	// 注释 3
    	? fn.apply(this, args)			// 注释 4
      : currying(fn.bind(this, ...args), length - args.length) // 注释 5
  }
}

// Test
const fn = currying(function(a, b, c) {
    console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]