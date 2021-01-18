## 深入浅出Vue 读书笔记

### Object的变化侦测

#### 什么是变化侦测

- 渲染：Vue 自动通过状态生成DOM，并将其输出到页面上显示出来
- 渲染过程是声明式
- 变化侦测的两种方式
  - push 推
  - pull 拉
- Vue的侦测方式使其可以做到更细粒度的更新
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
    
}
```

