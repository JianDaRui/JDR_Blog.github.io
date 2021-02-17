## 深入浅出Vue 读书笔记

### Object的变化侦测

#### 什么是变化侦测

- 渲染：Vue 自动通过状态生成DOM，并将其输出到页面上显示出来
- 渲染过程是声明式
- 变化侦测的两种方式
  - push 推
  - pull 拉
- Vue的侦测方式使其可以做到更细粒度的更新
- 
- 问题：
  - 一个状态绑定好多依赖，每个依赖对应一个具体DOM节点
  - 粒度越细，依赖也就越多，占用的内存也就越多，内存也就开销越大
- 解决方式：
  - 引入虚拟DOM
  - 降低粒度=》中等
  - 不再是一个具体的DOM节点，而是一个组件
  - 状态变化后，在组件内部使用虚拟DOM进行对比，
  - 降低依赖数量，减少内存消耗

#### 如何追踪变化

**Object.defineProperty**

```js
function defineReactive(data, key, val) {
    Obeject.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val
        },
        set: function(newVal) {
            if(val === newVal) return
            val = newVal
        }
    })
}
```

- 读取数据时，触发getter
- 更改数据时，触发setter

#### 如何收集依赖

**在getter中收集依赖，在setter中触发依赖**

- 开始时，需要使用到状态的依赖会触发getter，这时可以将依赖收集起来
- 更改时，会触发setter，可以通知先前收集的依赖进行状态更新

#### 依赖收集在哪里

**收集在Dep中**

代码演示

第一版

- 每一个key都有一个dep数组负责收集依赖了这个key的依赖项
- 假设依赖项为一个全局对象的函数 target

```js
function defineReactive(data, key, val) {
    let dep = []
    Obeject.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.pus(window.target)
            return val
        },
        set: function(newVal) {
            if(val === newVal) return
            for(let i=0, len = dep.length; i<len; i++) {
                dep[i](newVal, val)
            }
            val = newVal
        }
    })
}
```

问题：

- 响应式与dep存在耦合

第二版

```js
export default class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
       remove(this.subs, sub)
    }
    depend() {
        if(window.target){	
            this.addSub(window.target)
		}
    }
    notify() {
        const subs = [...this.subs]
        for(let i=0, len = subs.length; i<len; i++) {
                subs[i].update()
        }
    }
}
function remove(arr, item) {
    if(arr.length) {
        const index = arr.indexOf(item)
        if(index > -1) {
            return arr.splice(index, 1)
        }
    }
}


function defineReactive(data, key, val) {
    let dep = new Dep()
    Obeject.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            // 收集依赖
            dep.depend()
            return val
        },
        set: function(newVal) {
            if(val === newVal) return
            val = newVal
            // 更新状态
            dep.notify()
        }
    })
}
```

#### 依赖是谁

**Watcher**: 集中处理多种情况的依赖项

#### 什么是Watcher

- 中间人角色，当数据变化时先通知watcher，再由它通知其他地方



```js
export default class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parsePath(expOrfn)
        this.cb = cb
        this.value = this.get()
	}
	get() {
		window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }
    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.vall(this.vm, this.value, oldValue)
	}
}
```

- 依赖收集阶段将当前watcher添加至Dep，
- 更新节点，重新获取getter，并将新旧值传给回调（依赖）

```js
const bailRE = /[^\w.$]/
export fnction parsePath(path) {
    if(bail.test(path)) return
    // [a,b,c]
    // data.a.b.c
    // data = data.a =》 data = data.b =》 data = data.c
    const segments = path.split('.')
    return function(obj) {
        for(let i = 0; i<segments.length; i++) {
            if(!obj) return
            obj = obj[segments[i]]
        }
        return obj
	}
}
```

#### 递归侦测所有key

**Observer类**：通过递归将一个数据中的所有属性都转换成getter/setter的形式，然后追踪他们的变化

```js
export class Observer {
    constructor(value) {
		this.value = value
        
        if(!Array.isArray(value)){
            this.walk(value)
        }
    }
    walk(obj) {
        let keys = Object.keys(obj)
		for(let i=0; i<keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
	
}

function defineReactive(data, key, val) {
    if(typeof val === 'object') {
		new Observer(val)
    }
    let dep = new Dep()
    Obeject.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            // 收集依赖
            dep.depend()
            return val
        },
        set: function(newVal) {
            if(val === newVal) return
            val = newVal
            // 更新状态
            dep.notify()
        }
    })
}
```

#### 关于Object的问题

Object.defineProperty将对象的key转换为getter/setter形式来追踪变化，但是getter/setter只能追踪一个数据否修改，无法追踪新增属性和删除属性

解决方法：

- 提供两个API。vm.$set与vm.$delete+

### Array的变化侦测

针对数组，可以通过调用数组原型上的方法修改数组数据，导致侦测Object上的方法失效。

#### 如何追踪变化

解决思路：使用拦截器覆盖Array.prototype，之后每当Array原型上的方法操作数组时，其实执行的都是拦截其中提供的方法，然后在拦截器中使用原生Array的原型方法去操作数组。

#### 拦截器实现

Array七个改变自身内容的方法，分别是push、pop、shift、unshift、splice、sort、reverse。

代码实现

```js
// 获取原型
const arrayProto = Array.prototype
// 浅拷贝
export const arrayMethods = Object.create(arrayProto)
;['push', 'pop', 'shift', 'unshift','splice','sort','reverse'].forEach(function(method){
    // 缓存原方法
	const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
		value: function mutator(...agrs) {
            // 触发原方法
			return original.apply(this, args)
        },
        enumerable: false,
        writable: true,
        configurable: true
    })
})
```

#### 使用拦截器覆盖Array原型

- 为避免全局污染Array，只需在Observer中使用拦截器覆盖那些即将被转换成响应式Array类型数据的原型

```js
export class Observer {
    constructor(value) {
		this.value = value
        if(Array.isArray(value)) {
			value.__proto__ = arrayMethods
        } else {
			this.walk(value)
        }
    }
    
    walk(obj) {
        let keys = Object.keys(obj)
		for(let i=0; i<keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}
```

