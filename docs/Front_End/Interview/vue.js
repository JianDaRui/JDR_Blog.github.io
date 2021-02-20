// let data = { name: "amos" }
// observe(data)
// let name = data.name;
// data.name = "DaRui"

function defineReactive(obj, key, val) {
  observe(val)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      if(Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      val = newVal
      dep.notify()
    }
  })
}

function observe(obj) {
  if(!obj || typeof obj !== 'object') {
    return 
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}


class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null
class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this
    this.obj = obj;
    this.cb = cb;
    this.key = key;
    this.value = obj[key]
  }
  update() {
    this.val = this.obj[this.key]
    this.cb(this.val)
  }
}

let data = { name: "amos" }
function update(val) {
  console.log(val + "哈哈哈哈")
  return val + "哈哈哈哈"
}
observe(data)

new Watcher(data, 'name', update)

let name = data.name;
data.name = "DaRui"