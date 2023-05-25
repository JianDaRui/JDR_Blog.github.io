// 单向列表

// 定义节点
function Node(value, next = null) {
  this.value = value
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
// 添加
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
  return true
}
LinkedList.prototype.delete = function (value) {
  if (!this.hasHeader()) {
    console.log("链表为空")
    return 
  }
  let temp = this.header

  while(temp.next) {
    if(temp.next.value === value ) {
      temp.next = temp.next.next
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
let node1 = new Node(1)
let node4 = new Node(4)
let node5 = new Node(5)
let node3 = new Node(3)
let node2 = new Node(2)
let node6 = new Node(6)
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
linkedList.delete(3)
linkedList.show()
console.log('---------')
linkedList.delete(4)
linkedList.show()
console.log('---------')
linkedList.delete(1)
linkedList.show()