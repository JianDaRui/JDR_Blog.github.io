# 链表

## 特点

- 线性集合
- 删除和插入操作方便
- 遍历不方便，`索引`来`访问元素`平均要花费 `O(N) `时间，其中 N 是链表的长度。

- 单链表特点
  - 头节点`head`指向第一个节点
  - 尾节点`next`值为`null`
  - 每一个节点是一个对象，两个属性：`value`保存值，`next`保存下一节点地址

###### ![](D:\Study\JDR_Blog\docs\Front_End\Algorithm\LeetCode\LinkList\screen-shot-2018-04-12-at-152754.png)

- **双链表特点**
  - 头节点的`prev`指向`null`
  - 尾节点`next`指向`null`
  - 每一个节点是一个对象，三个属性：`value`保存值，`next`保存下一节点地址，`prev`保存上一节点地址

![](D:\Study\JDR_Blog\docs\Front_End\Algorithm\LeetCode\LinkList\screen-shot-2018-04-17-at-161130.png)

## 题目

### [147. 对链表进行插入排序](https://leetcode-cn.com/problems/insertion-sort-list/)

插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。

 ![](D:\Study\JDR_Blog\docs\Front_End\Algorithm\LeetCode\LinkList\Insertion-sort-example-300px.gif)

**插入排序算法**：

- 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
  每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
- 重复直到所有输入数据插入完为止。


示例 1：

输入: 4->2->1->3
输出: 1->2->3->4
示例 2：

输入: -1->5->3->4->0
输出: -1->0->3->4->5

#### 思路分析

**方法一**：

1. 首先判断给定的链表是否为空，若为空，则不需要进行排序，直接返回
2. 遍历链表, 将每个节点`next`至为`null`, `push`至数组中
3. 对数组进行`插入排序`, 注意 数组中每项为 `节点对象`, 比较的是节点的 `val`
4. 将排序好的数组 再次遍历 , 转为链表
5. 最后一项`next`为 `null`

```javascript 
var insertionSortList = function(head) {
  if(!head) return null;
  // 将每一个节点放入数组中并将next至为空
  let set = [];
  while(head)  {
    let tmp = head.next;
    head.next = null;
    set.push(head);
    head = tmp;
  }
  let len = set.length;
  // 对set进行插入排序
  for(let i=0; i<len; i++) {
    for(let j=i; j > 0; j--) {
      if(set[j].val < set[j-1].val){
        let temp = set[j];
        set[j] = set[j-1];
        set[j-1] = temp;
      }
    } 
  }
  for(let i=0; i<len; i++) { 
    set[i].next = set[i+1];
  }
  // 
  set[len-1].next = null;
  return set[0];
};
```

问题:

没有利用到链表插入或者删除节点的便利性



**方法二**:

1. 首先判断给定的链表是否为空，若为空，则不需要进行排序，直接返回。
2. 创建**哑节点 `dummyHead`**，令` dummyHead.next = head`。
   - 引入哑节点是为了便于在 head 节点之前插入节点。
3. 维护 `lastSorted` 为链表的已排序部分的**最后一个节点**，初始时 `lastSorted = head`。
4. 维护 `curr` 为待插入的元素，初始时 `curr = head.next`。
5. 比较 `lastSorted` 和 `curr `的节点值。
   - 若` lastSorted.val <= curr.val`，说明 `curr` 应该位于` lastSorted `之后，将 `lastSorted `后移一位，`curr `变成新的 `lastSorted`。
   - 否则，从链表的头节点开始往后遍历链表中的节点，寻找插入` curr `的位置。令 `prev`为插入 `curr` 的位置的前一个节点，进行如下操作，完成对` curr` 的插入:

```js
lastSorted.next = curr.next
curr.next = prev.next
prev.next = curr
```

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/insertion-sort-list/solution/dui-lian-biao-jin-xing-cha-ru-pai-xu-by-leetcode-s/)

```js
var insertionSortList = function(head) {
    if (head === null) {
        return head;
    }
    const dummyHead = new ListNode(0);
    // 哑节点记录头指针
    dummyHead.next = head;
    // lastSorted记录已排序的尾节点
    // 
    let lastSorted = head, curr = head.next;
    while (curr !== null) {
        if (lastSorted.val <= curr.val) {
            lastSorted = lastSorted.next;
        } else {
            // 每次插入时并不改变哑节点 而是通过 prev
            let prev = dummyHead;
            // 首先找到要插入的位置
            while (prev.next.val <= curr.val) {
                prev = prev.next;
            }
            // curr.next记录着未排序的链表部分
            lastSorted.next = curr.next;
            // 重置 curr 及 prev 的 next
            curr.next = prev.next;
            prev.next = curr;
        }
        curr = lastSorted.next;
    }
    return dummyHead.next;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/insertion-sort-list/solution/dui-lian-biao-jin-xing-cha-ru-pai-xu-by-leetcode-s/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

**要点**:

- 通过设置哑节点保存头指针
  - 每次需要插入时,从哑节点的开始寻找插入位置
- 注意每个`curr`始终为`lastSorted`的`next`
- `curr`的`next`始终为待排序链表部分















































来源：力扣（`LeetCode`）
链接：https://leetcode-cn.com/problems/insertion-sort-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



