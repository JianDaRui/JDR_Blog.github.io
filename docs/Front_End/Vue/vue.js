// 追踪变化
function defineReactive(data, key, val) {
  let childOb = observe(val);

  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    writable: true,
    get: function () {
      dep.depend()

      if(childOb) {
        childOb.dep.depend()
      }

      return val
    },
    set(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal;
      dep.notify()
    }
  })
}

function observe(value, asRootData) {
  if(!isObject(value)){
    return 
  }
  let ob;
  if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observe) {
    ob = value.__ob__
  } else {
    ob = new Observe()
  }

  return ob
}

// 收集依赖Dep
class Dep {
  constructor() {
    this.subs = []
  }
  addDep(sub) {
    this.subs.push(sub)
  }
  depend() {
    if (Dep.target) {
      this.addDep(Dep.target)
    }
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < this.subs.length; i++) {
      subs[i].update()
    }
  }
}

function remove(arr, item) {
  let index = arr.indexOf(item);
  if (index > -1) {
    return arr.splice(index, 1)
  }
}

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get()
  }
  get() {
    Dep.target = this;
    let value = this.getter.call(this.vm, this.vm)
    Dep.target = null;
    return value;
  }
  update() {
    let oldValue = this.value;
    let newValue = this.get();
    this.cb.call(vm, newValue, oldValue)
  }
}
const hasProto = '__proto__' in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

class Observe {
  constructor(value) {
    this.value = value;
    // 数组收集依赖
    this.dep = new Dep();

    def(value, '__ob__', this)

    if(Array.isArray(value)) {
      // value.__proto__ = arrayMethods
      const augment = hasProto ? protoAugment : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value);
    } else {
      this.walk(value)
    }
    
  }

  walk(value) {
    const keys = Object.keys(value);
    for(let i=0; i<keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  observeArray(items) {
    for(let i = 0; i<items.length; i++) {
      observe(items[i])
    }
  }
}
function protoAugment(value, src, keys) {
  value.__proto__ = src;
} 
function copyAugment(target, src, keys) {
  for(let i=0; i< keys.length; i++) {
    const key = keys[i];
    def(target, key, src[key])
  }
}

const bailRE = /[^\w.$]/

function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.splice('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj;
  }
}


// Array

const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto);
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function(method) {
  const original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: function mutator(...args) {
      const ob = this.__ob__
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break;
        case 'splice':
          inserted = args.slice(2)
          break;
      }
      
      if(inserted) ob.observeArray(inserted) // 侦测新增元素

      ob.dep.notify()

      return original.apply(this, args)
    }
  })
})