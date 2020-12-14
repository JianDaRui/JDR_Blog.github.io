## 链表

- 链表是有序的列表

- 链表是以节点的方式来存储的

- 每个节点必须包含data域（存值），next域（指向下一个节点）

- 链表的各个节点不一定是连续存放

- 链表分为带头节点的链表和没有头节点的链表，根据实际需求来确定

### 单向链表

- header，没有value，指向单向链表的第一个节点
- node，两个属性value，next
- 链表尾部node的next为空
- 添加：`newNode.next = tempNode.next； tempNode.next = newNode`
- 删除： `tempNode.next = delNode.next；`
- 遍历：`curtNode；curtNode = curtNode.next`

#### 单链表的应用实例

- 获取链表长度
- 获取链表的第K个节   点
- 反转链表
- 从尾到头打印单链表
- 合并两个有序的链表，合并之后的链表依然有序

```javascript
// 定义节点
function Node(value, next=null) {
    this.value = value
    this.next = next
}
// 定义头
function Header(next) {
    this.value = null
    this.next = next
}
// 定义链表
function Linkedlist(header) {
    this.header = header
}
// 添加
Linkedlist.prototype.add = funcion (node) {
    if(!this.hasHeader()) {
        this.header = new Header(node)
        return true
    }
    let temp = this.header.next
    while(temp.next){
         temp = temp.next
    }
    temp.next = node
}
Linkedlist.prototype.delete = funcion (value) {
    
}
Linkedlist.prototype.show = funcion () {
    if(!this.hasHeader()) {
        console.log("链表为空")
        return true
    }
    let temp = this.header.next
    while(temp.next){
        console.log(temp.value)
        temp = temp.next
    }
}
Linkedlist.prototype.hasHeader = funcion () {
    return !!this.header.next
}
// 创建node
let node1 = new Node(1)
let node4 = new Node(4)
let node5 = new Node(5)
let node3 = new Node(3)
let node2 = new Node(2)
let node6 = new Node(6)
// 创建header
let header = new Header(node1)
// 创建list
let linkedList = new Linkedlist(header)

linkedList.add(node1)
linkedList.add(node4)
linkedList.add(node5)
linkedList.add(node3)
linkedList.add(node2)
linkedList.add(node6)

```



### 双向链表

#### 单向链表的问题：

- 单向链表的查找方向只能是一个方向，而双向链表可以向前或者向后查找
- 单向链表不能自我删除，需要依靠辅助节点，而双向链表可以自我删除

#### 双向链表特点：

Node属性：value节点值，next域：下一个节点，pre域：上一个节点

#### 基本操作：

- 添加：
  - `curtNode.next.pre = newNode`
  - `newNode.next = curtNode.next`
  - `newNode.pre = curtNode`
- 修改：
  - `curtNode.next.pre = newNode`
  - `newNode.next = curtNode.next`
  - `newNode.pre = curtNode`
- 删除：
  - `delNode.next.pre = delNode.pre`
  - `delNode.pre.next = delNode.next`
- 遍历：

## 环形链表及约瑟夫问题





[单链表常见面试题](https://juejin.cn/post/6844903573508063246)

[JavaScript数据结构与算法（链表）](https://juejin.cn/post/6844903637974515720)

[搞懂基本排序算法](https://juejin.cn/post/6844903568273571853)