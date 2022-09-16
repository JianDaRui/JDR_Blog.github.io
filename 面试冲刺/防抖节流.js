// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function() {
    var context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 实现 2
// immediate 表示第一次是否立即执行
function debounce(fn, wait = 50, immediate) {
  let timer = null
  return function(...args) {
      if (timer) clearTimeout(timer)
    
      // ------ 新增部分 start ------ 
      // immediate 为 true 表示第一次触发后执行
      // timer 为空表示首次触发
      if (immediate && !timer) {
          fn.apply(this, args)
      }
      // ------ 新增部分 end ------ 
      
      timer = setTimeout(() => {
          fn.apply(this, args)
      }, wait)
  }
}


// 函数节流的实现;
// wait 是时间间隔
const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}


function throttleByAnimationFrame(fn) {
  let requestId

  const later = (args) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled = (...args) => {
    if (requestId == null) {
      requestId = requestAnimationFrame(later(args));
    }
  };

  throttled.cancel = () => cancelAnimationFrame(requestId!);

  return throttled;
}