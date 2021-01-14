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

**问题:**

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

### [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

![](D:\Study\JDR_Blog\docs\Front_End\Algorithm\LeetCode\LinkList\merge_ex1.jpg)

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

示例 2：

输入：l1 = [], l2 = []
输出：[]
示例 3：

输入：l1 = [], l2 = [0]
输出：[0]


提示：

两个链表的节点数目范围是 [0, 50]
-100 <= Node.val <= 100
l1 和 l2 均按 非递减顺序 排列

#### 思路分析

**方法一:** 递归

1. 这道题可以使用递归实现，新链表也不需要构造新节点，我们下面列举递归三个要素
2. 终止条件：两条链表分别名为 l1 和 l2，当 l1 为空或 l2 为空时结束
3. 返回值：每一层调用都返回排序好的链表头
4. 本级递归内容：如果 l1 的 val 值更小，则将 l1.next 与排序好的链表头相接，l2 同理
5. O(m+n)O(m+n)，mm 为 l1的长度，nn 为 l2 的长度

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 === null) {
       return l2
    } else if(l2 === null) {
        return l1         
    } else if(l1.val < l2.val) {
     	l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
```

**方法二**：迭代

- 当 l1 和 l2 都不是空链表时，判断 l1 和 l2 哪一个链表的头节点的值更小，将较小值的节点添加到结果里，当一个节点被添加到结果里之后，将对应链表中的节点向后移一位。

- 设定一个哨兵节点 `prehead `，这可以在最后让我们比较容易地返回合并后的链表。
- 维护一个` prev` 指针，我们需要做的是调整它的 `next` 指针。
- 重复以下过程，直到 l1 或者 l2 指向了 null ：
  - 如果 l1 当前节点的值小于等于 l2 ，我们就把 l1 当前的节点接在` prev `节点的后面同时将 l1 指针往后移一位。
  - 否则，我们对 l2 做同样的操作。
  - 不管我们将哪一个元素接在了后面，我们都需要把` prev` 向后移一位。
- 在循环终止的时候， l1 和 l2 至多有一个是非空的。由于输入的两个链表都是有序的，所以不管哪个链表是非空的，它包含的所有元素都比前面已经合并链表中的所有元素都要大。这意味着我们只需要简单地将非空链表接在合并链表的后面，并返回合并链表即可。

```js
var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1);
    let prev = prehead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
    prev.next = l1 === null ? l2 : l1;
    return prehead.next;
};
```











































来源：力扣（`LeetCode`）
链接：https://leetcode-cn.com/problems/insertion-sort-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



