// 双向链表
// 单向链表 + 权重// 单向列表

// 定义节点
function Node(value, pre = null, next = null) {
  this.value = value
  this.pre = pre
  this.next = next
}
// 定义头
function Header(next) {
  this.value = null
  this.next = next
}
// 定义链表
function LinkedList(header) {
  this.header = header
}
// 按权重添加
LinkedList.prototype.add = function (node) {
  if (!this.hasHeader()) {
    this.header = new Header(node)
    return true
  }
  let temp = this.header
  // debugger
  while (temp.next) {
    temp = temp.next
  }
  temp.next = node
  node.pre = temp.next
  return true
}
// 插入
LinkedList.prototype.insert = function (node) {
  if (!this.hasHeader()) {
    this.header = new Header(node)
    return true
  }
  let temp = this.header
  // debugger
  while (temp.next) {
    temp = temp.next
  }
  temp.next = node
  node.pre = temp.next
  return true
}
LinkedList.prototype.delete = function (value) {
  if (!this.hasHeader()) {
    console.log("链表为空")
    return 
  }
  let temp = this.header

  while(temp.next) {
    if(temp.value === value ) {
      temp.pre.next = temp.next
      temp.next.pre = temp.pre
      break
    }
    temp = temp.next
  }
}
LinkedList.prototype.show = function () {
  if (!this.hasHeader()) {
    console.log("链表为空")
    return 
  }
  let temp = this.header

  while(temp.next) {
    temp = temp.next
    console.log(temp.value)
  }
}
LinkedList.prototype.hasHeader = function () {
  return !!this.header.next
}
// 创建node
let node1 = new Node('a', 1)
let node4 = new Node('d', 4)
let node5 = new Node('e', 5)
let node3 = new Node('c', 3)
let node2 = new Node('b', 2)
let node6 = new Node('f', 6)
// debugger
// 创建header
let header = new Header()
// 创建list
let linkedList = new LinkedList(header)
console.log(header)
linkedList.add(node1)
linkedList.add(node4)
linkedList.add(node5)
linkedList.add(node3)
linkedList.add(node2)
linkedList.add(node6)

linkedList.show()
console.log('---------')
linkedList.delete('c')
linkedList.show()
console.log('---------')
linkedList.delete('f')
linkedList.show()
console.log('---------')
linkedList.delete('a')
linkedList.show()