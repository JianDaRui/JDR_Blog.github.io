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



- 单链表反转

- 链表中环的检测

- 两个有序的链表合并

- 删除链表倒数第 n 个结点

- 求链表的中间结点

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
        //[ set[j-1],  set[j]] = [set[j],  set[j-1]]
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
-100 <= `Node.val` <= 100
l1 和 l2 均按 非递减顺序 排列

#### 思路分析

**方法一:** 递归

1. 这道题可以使用递归实现，新链表也不需要构造新节点，我们下面列举递归三个要素
2. 终止条件：两条链表分别名为 l1 和 l2，当 l1 为空或 l2 为空时结束
3. 返回值：每一层调用都返回排序好的链表头
4. 本级递归内容：如果 l1 的 `val` 值更小，则将` l1.next `与排序好的链表头相接，l2 同理
5. `O(m+n)O(m+n)`，m 为 l1的长度，n 为 l2 的长度

```js
// 当 l1 小于 l2 时
// 需要l1做作为前一节点
// 并比较l1.next与当前l2的大小
// 获取其中的小值
l1.next = function(l1.next, l2) {
    if(l1.next === null) {
       return l2
    } else if(l2 === null) {
        return l1.next         
    } else if(l1.next.val < l2.val) {
        return l1.next;
    } else {
        return l2;
    }
};
// 同理
l2.next = function(l1, l2.next) {
    if(l1 === null) {
       return l2.next
    } else if(l2.next === null) {
        return l1         
    } else if(l1.val < l2.next.val) {
        return l1;
    } else {
        return l2.next;
    }
};
```

两者结合为递归：

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

### [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

#### 思路分析

方法一：暴力解法

1. 双循环。遍历l1中的每个节点寻找l2中是否有相同的节点

```js
var getIntersectionNode = function (headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    while (pA) {
        let pB = headB;

        while (pB) {
            if (pA === pB) return pA;
            pB = pB.next;
        }

        pA = pA.next;
    }
};
```

方法二：哈希表

1. 遍历链表A，将A中的每个节点存入哈希表中
2.  否存在B节点

```js
var getIntersectionNode = function (headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    let pB = headB;
    let hashSet = new Set()
    while (pA) {
        hashSet.add(pA)
        pA = pA.next;
    }
    while(pB) {
        if(hashSet.has(pB)) {
            return pB
        }
        pB = pB.next
    }
};
```

方法三：双指针

1. 两链表一长一短，长的先走完 短的后走完
2. 相当于先计算出两链表的长度差再从相同的起点开始走，看能否相遇
3.  `a - b = len`
4. `b + len = a`

```js
var getIntersectionNode = function (headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    let pB = headB;
    while (pA !== pB) {
        pA = pA.next ? pA.next : pB
        pB = pB.next ? pB.next : PA
    }
    return pA
};
```

### [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

#### 思路分析

方法一：快慢指针

1. 设立两个指针fast、slow.
2. fast永远比slow多走两步
3. fast走完，slow即为中间节点

```javascript
var middleNode = function(head) {
  var fast = slow = head
  while(fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};
```

方法二：单指针

1. 将链表遍历两边
2. 第一遍获取链表长度L
3. 第二遍获取链表L/2处的节点

```javascript
var middleNode = function(head) {
  let node = head;
  let l = 0;
  while(node) {
     ++l;
     node = node.next;
  }
  node = head;
  let k = 0;
  while(k < Math.floor((l/2))) {
     ++k;
     node = node.next;
  }
  return node
};
```

注意：

1. `++i` 而不是`i++`
2. `math.floor`的使用

### [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

#### 思路分析

方法一：哈希表

1. 遍历链表，将每个节点添加至哈希表
2. 判断节点是否在哈希表中存在如果有就返回

```javascript
var hasCycle = function(head) {
    var curr = head
    var hashSet = new Set
    while(curr) {
      if(!hashSet.has(curr)) {
        hashSet.add(curr)
         curr = curr.next
      } else {
         return true
      }
    }
    return false
};
```

方法二：快慢指针

1. 设立两个指针fast,slow
2. 快的永远比慢的多走一步
3. 则如果有环就会相遇

```js
var hasCycle = function(head) {
    let slow = head
    let fast = head.next
    while(slow !== fast) {
        if(!fast || !fast.next) return false
        slow = slow.next
        fast = fast.next.next
    }
    return true
};
```

### [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

#### 思路分析

方法一：哈希表

1. 遍历链表，将每个节点添加至哈希表中
2. 判断是否添加过
3. 如果有就返回 没有就返回 `-1`

```js
var detectCycle = function(head) {
  if(!head) return null
  let curr = head
  let hashSet = new Set()
  while(curr) {
    if(hashSet.has(curr)) {
      return curr
    } else {
      hashSet.add(curr)
    }
    curr = curr.next
  }
};
```

方法二：快慢指针

[官方答案](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/huan-xing-lian-biao-ii-by-leetcode-solution/)

```js
var detectCycle = function(head) {
    if (head === null) {
        return null;
    }
    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        if (fast === slow) {
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
}
```



### [19. 删除链表的倒数第N个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

#### 思路分析

方法一：快慢指针

1. 设置一个哑节点，记录头节点的地址
2. 设置快慢指针，fast比slow多走N个节点
3. 当fast === null 时，slow指向该删除的节点

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  var dummy = new ListNode(0, head);
  var fast = head;
  var slow = dummy;
  // fast 先多走n步
  for (var i = 0; i < n; ++i) {
    fast = fast.next;
  }
  // fast 与 slow一起走
  // 当fast为null时跳出循环
  while (fast != null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  var ans = dummy.next;
  return ans;
}
```

方法二：栈

1. 遍历链表，入栈
2. 弹出栈顶的n个节点
3. 则此时栈顶的节点为待删除节点的前一个节点
4. 改变栈顶节点的next指针

```js
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(0, head);
  let stack = [];
  let cur = dummy;
  while (cur) {
      stack.push(cur);
      cur = cur.next;
  }
  for(let i = 0; i < n; ++i) {
      stack.pop();
  }
  let prev = stack.pop();
  prev.next = prev.next.next;
  let ans = dummy.next;
  return ans;
};
```

### [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

思路分析：

- 将两个链表看成是相同长度的进行遍历，如果一个链表较短则在前面补 0，比如 987 + 23 = 987 + 023 = 1010
- 每一位计算的同时需要考虑上一位的进位问题，而当前位计算结束后同样需要更新进位值
- 如果两个链表全部遍历完毕后，进位值为 1，则在新链表最前方添加节点 1
- 小技巧：对于链表问题，返回结果为头结点时，通常需要先初始化一个哑节点 pre，该指针的下一个节点指向真正的头结点head。使用预先指针的目的在于链表初始化时无可用节点值，而且链表构造过程需要指针移动，进而会导致头指针丢失，无法返回结果。

```js
var addTwoNumbers = function(l1, l2) {
  let head = null, tail = null;
  let carry = 0;
  while (l1 || l2) {
      const n1 = l1 ? l1.val : 0;
      const n2 = l2 ? l2.val : 0;
      const sum = n1 + n2 + carry;
      if (!head) {
          head = tail = new ListNode(sum % 10);
      } else {
          tail.next = new ListNode(sum % 10);
          tail = tail.next;
      }
      carry = Math.floor(sum / 10);
      if (l1) {
          l1 = l1.next;
      }
      if (l2) {
          l2 = l2.next;
      }
  }
  if (carry > 0) {
      tail.next = new ListNode(carry);
  }
  return head;
};
```

### [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

**你不能只是单纯的改变节点内部的值**，而是需要实际的进行节点交换。

输入：head = [1,2,3,4]
输出：[2,1,4,3]
示例 2：

输入：head = []
输出：[]
示例 3：

输入：head = [1]
输出：[1]

![](D:\Study\JDR_Blog\docs\Front_End\Algorithm\LeetCode\LinkList\1602548103-pyYkxE-image.png)

#### 思路分析：

方法一:递归

```javascript
var swapPairs = function(head) {
 	if(head === null || head.next === null) return head
  	let next = head.next
 	head.next = swapPairs(next.next)
  	next.next = head
  	return next
};
```

方法二: 迭代

- 创建哑结点 dummyHead，令 dummyHead.next = head。令 temp 表示当前到达的节点，初始时 temp = dummyHead。每次需要交换 temp 后面的两个节点。

- 如果 temp 的后面没有节点或者只有一个节点，则没有更多的节点需要交换，因此结束交换。
- 否则，获得 temp 后面的两个节点 node1 和 node2，通过更新节点的指针关系实现两两交换节点。

- 具体而言，交换之前的节点关系是 temp -> node1 -> node2，交换之后的节点关系要变成 temp -> node2 -> node1，因此需要进行如下操作。

```js
temp.next = node2
node1.next = node2.next
node2.next = node1
```

完成上述操作之后，节点关系即变成 temp -> node2 -> node1。

- 再令 temp = node1，对链表中的其余节点进行两两交换，直到全部节点都被两两交换。

- 两两交换链表中的节点之后，新的链表的头节点是 dummyHead.next，返回新的链表的头节点即可。

```js
var swapPairs = function(head) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;
    while (temp.next !== null && temp.next.next !== null) {
        const node1 = temp.next;
        const node2 = temp.next.next;
        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temp = node1;
    }
    return dummyHead.next;
};

```



### [61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)

难度中等402

给定一个链表，旋转链表，将链表每个节点向右移动 *k* 个位置，其中 *k* 是非负数。

**示例 1:**

```
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL
```

**示例 2:**

```
输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
```

方法 1：
直觉

链表中的点已经相连，一次旋转操作意味着：

- 先将链表闭合成环
- 找到相应的位置断开这个环，确定新的链表头和链表尾


新的链表头在哪里？

- 在位置 n-k 处，其中 n 是链表中点的个数，新的链表尾就在头的前面，位于位置 n-k-1。

- 我们这里假设 k < n

如果 k >= n 怎么处理？

- k 可以被写成 k = (k // n) * n + k % n 两者加和的形式，其中前面的部分不影响最终的结果，因此只需要考虑 k%n 的部分，这个值一定比 n 小。

算法

算法实现很直接：

- 找到旧的尾部并将其与链表头相连 old_tail.next = head，整个链表闭合成环，同时计算出链表的长度 n。
- 找到新的尾部，第 (n - k % n - 1) 个节点 ，新的链表头是第 (n - k % n) 个节点。
- 断开环 new_tail.next = None，并返回新的链表头 new_head。
  实现

```java
class Solution {
  public ListNode rotateRight(ListNode head, int k) {
    // base cases
    if (head == null) return null;
    if (head.next == null) return head;

    // close the linked list into the ring
    ListNode old_tail = head;
    int n;
    for(n = 1; old_tail.next != null; n++)
      old_tail = old_tail.next;
    old_tail.next = head;

    // find new tail : (n - k % n - 1)th node
    // and new head : (n - k % n)th node
    ListNode new_tail = head;
    for (int i = 0; i < n - k % n - 1; i++)
      new_tail = new_tail.next;
    ListNode new_head = new_tail.next;

    // break the ring
    new_tail.next = null;

    return new_head;
  }
}
```

方法二： 双指针解决:

![](D:\Study\JDR_Blog\docs\Front_End\Algorithm\LeetCode\LinkList\1602048483-IWdmcz-image.png)

![](D:\Study\JDR_Blog\docs\Front_End\Algorithm\LeetCode\LinkList\1602048492-Jwboqd-image.png)

```java
public ListNode rotateRight(ListNode head, int k) {
    if (head == null)
        return head;
    ListNode fast = head, slow = head;
    //链表的长度
    int len = 1;
    //统计链表的长度，顺便找到链表的尾结点
    while (fast.next != null) {
        len++;
        fast = fast.next;
    }
    //首尾相连，先构成环
    fast.next = head;
    //慢指针移动的步数
    int step = len - k % len;
    //移动步数，这里大于1实际上是少移了一步
    while (step-- > 1) {
        slow = slow.next;
    }
    //temp就是需要返回的结点
    ListNode temp = slow.next;
    //因为链表是环形的，slow就相当于尾结点了，
    //直接让他的next等于空
    slow.next = null;
    return temp;
}
```

哈希法 🪓

- 在例子1中：k=2 ，head为 1->2->3->4->5->NULL
- 链表第一步变成: 5->1->2->3->4->NULL
- 第二步变成: 4->5->1->2->3->NULL
- 那我们是否可以直接简化其步骤：直接拆分倒数k项，再插入到head呢？
  当然是可以的，此时，步骤就变为：

- 原链表：1->2->3->4->5->NULL
- 拆分后k项，链表变为：1->2->3->NULL 和 4->5->NULL
- 再合并：4->5->1->2->3->NULL

```js
const rotateRight = (head, k) => {
    if (!head || !head.next) return head
    let curr = head, n = 0
    let hash = new Map()
    // 遍历并将数据存入map
    while (curr && ++n) {
        hash.set(n, curr)
        curr = curr.next
    }
    k = k % n // 去重
    // 通过查找map对链表进行操作
    hash.get(n).next = head // 链表最后一项指向头部形成环
    head = hash.get(n - k).next // 定位新的头节点
    hash.get(n - k).next = null // 打断链表环
    return head
}
```


通过Map数据存储的特性，把第一次遍历的数据存储在Map中
而后直接通过 n-k 获取到链表右移的前一项



链表转环 ♻️
在哈希法中，我们最后处理链表时，把单链表转成了环

那么，我们当然也可以直接把链表转成环，然后在环中找到k的位置将其打断～

```js
const rotateRight = (head, k) => {
    if (!head) return null
    let curr = head, n = 0
    while (++n && curr.next) curr = curr.next
    // 形成环链表
    curr.next = head
    k = k % n // 去重
    while (++k < n) head = head.next // 找到打断位置
    // 对环链表打断再拼接得到答案
    let tmp = head
    head = head.next
    tmp.next = null
    return head
}
```

遍历链表，获得链表长度n
curr.next = head 形成环链表
去重
通过循环n-k>0找到打断环的位置并打断

穷举法 💪
这种解法没什么好说的，就是按照正常思维逻辑，一步步来。

```js
const rotateRight = (head, k) => {
    if (!head || !head.next) return head
    let curr = head, n = 0
    // 遍历链表计算其长度
    while (++n && curr.next) curr = curr.next
    k = k % n	// 去重
    // 链表右移
    while (k--) {
        curr = head
        while (curr.next.next) curr = curr.next
        // 这里curr是链表的打断位置，即倒数第二项
        curr.next.next = head // 链表最后一项指向头部形成环
        head = curr.next // 定位新的头节点
        curr.next = null // 打断链表环
    }
    return head
}
```

- 遍历链表，获取链表长度 n
- 对 k 取余进行去重
- 循环 k 次，每次把最后一项移动到第一项



### [82. 删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)

难度中等437

给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 *没有重复出现* 的数字。

**示例 1:**

```
输入: 1->2->3->3->4->4->5
输出: 1->2->5
```

**示例 2:**

```
输入: 1->1->1->2->3
输出: 2->3
```

#### 思路分析

##### 解法一: 哈希表

- 遍历链表，将每个节点的值放到哈希表中，哈希表的key就是节点的值，value是这个值出现的频率
- 遍历哈希表，将所有频率==1的key放到集合中
- 对集合进行排序
- 遍历集合，然后不断创建新的链表节点
- 当然这里可以优化一下，比如使用LinkedHashMap或者OrderedDict这样的数据结构，可以省去排序环节。

代码实现:

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if(head==null || head.next==null) {
            return head;
        }
        //用哈希表记录每个节点值的出现频率
        HashMap<Integer,Integer> cache = new HashMap<Integer,Integer>();
        ArrayList<Integer> arr = new ArrayList<Integer>();
        ListNode p = head;
        while(p!=null) {
            int val = p.val;
            if(cache.containsKey(val)) {
                cache.put(val,cache.get(val)+1);
            } else {
                cache.put(val,1);
            }
            p = p.next;
        }
        //将所有只出现一次的值放到arr中，之后再对这个arr排序
        for(Integer k : cache.keySet()) {
            if(cache.get(k)==1) {
                arr.add(k);
            }
        }
        Collections.sort(arr);
        ListNode dummy = new ListNode(-1);
        p = dummy;
        //创建长度为arr.length长度的链表，依次将arr中的值赋给每个链表节点
        for(Integer i : arr) {
            ListNode tmp = new ListNode(i);
            p.next = tmp;
            p = p.next;
        }
        return dummy.next;
    }
}
```

##### 解法二: 双指针

这里我们使用双指针的方式，定义a，b两个指针。

考虑到一些边界条件，比如1->1->1->2这种情况，需要把开头的几个1给去掉，我们增加一个哑结点，方便边界处理。

初始的两个指针如下:

- 将a指针指向哑结点
- 将b指针指向head(哑结点的下一个节点)
- 如果a指向的值不等于b指向的值，则两个指针都前进一位
  否则，就单独移动b，b不断往前走，直到a指向的值不等于b指向的值。

注意，这里不是直接比较a.val==b.val，这么比较不对，因为初始的时候，a指向的是哑结点，所以比较逻辑应该是这样：

a.next.val == b.next.val

- 当两个指针指向的值相等时，b不断往前移动，这里是通过一个while循环判断的，因为要过滤掉1->2->2->2->3重复的2。
- 那么整个逻辑就是两个while，但时间复杂度不是O(N^2)，而是O(N)，空间上也只是常数级别。

代码实现:

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if(head==null || head.next==null) {
            return head;
        }
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode a = dummy;
        ListNode b = head;
        while(b!=null && b.next!=null) {
            //初始化的时a指向的是哑结点，所以比较逻辑应该是a的下一个节点和b的下一个节点
            if(a.next.val!=b.next.val) {
                a = a.next;
                b = b.next;
            }
            else {
                //如果a、b指向的节点值相等，就不断移动b，直到a、b指向的值不相等 
                while(b!=null && b.next!=null && a.next.val==b.next.val) {
                    b = b.next;
                }
                a.next = b.next;
                b = b.next;
            }
        }
        return dummy.next;
    }
}
```



##### 解法三

解法三和解法二的代码实现很类似，区别是

解法二初始化的时候b指针指向的是head
而解法三初始化的时候b指针指向的是head.next

所以判断两个指针指向的节点值是否相等时，解法三是这么做的:

- a.next.val == b.val
- 当两个指针指向的值不同时，a和b指针都是前移一位
- 当两个指针指向的值相同时，解法二和解法三也略有不同
- 主要体现在while循环后面的几句
- 此外b指针还需要考虑边界条件，当循环结束后b指针可能会指向空，所以不能直接b=b.next，需要判断一下边界，这里请查看代码，并配合动态/静态图方便理解。

时间复杂度和空间复杂度，解法二和解法三都是一样的。



```java
///代码实现中还有一个小细节，外层的while是这么写的
while(b!=null)

// 如果写成

while(b!=null && b.next!=null)

// 这就不对了，没法处理1->1这种情况。
```



代码实现:

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if(head==null || head.next==null) {
            return head;
        }
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode a = dummy;
        ListNode b = head.next;
        while(b!=null) {
            if(a.next.val!=b.val) {
                a = a.next;
                b = b.next;
            }
            else {
                while(b!=null && a.next.val==b.val) {
                    b = b.next;
                }
                //这里的去重跟解法二有点差别，解法二的是
                //a.next = b.next
                a.next = b;
                //b指针在while中判断完后，可能指向了null，这里需要处理边界问题
                b = (b==null) ? null : b.next;
            }
        }
        return dummy.next;
    }
}

```



#### [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

难度中等137

请实现 `copyRandomList` 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 `next` 指针指向下一个节点，还有一个 `random` 指针指向链表中的任意节点或者 `null`。

 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png)

```
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e2.png)

```
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
```

**示例 3：**

**![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e3.png)**

```
输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

**示例 4：**

```
输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
```

 

**提示：**

- `-10000 <= Node.val <= 10000`
- `Node.random` 为空（null）或指向链表中的节点。
- 节点数目不超过 1000 。

题意理解
本题的意思是复制一个链表并返回，这个链表与一般链表不同的是多了一个 random 指针。

在这里，复制的意思是指 深拷贝（Deep Copy），类似我们常用的“复制粘贴”，事实上，与此对应的还有 浅拷贝，它们的区别是：

浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。具体可以参考 @mraz-t 在下方评论中的解释。



方法一：一行 python（不推荐）
明白了以上原理，对于 python 可直接调用相关函数：


class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        return copy.deepcopy(head)
方法二：DFS & BFS
图的基本单元是 顶点，顶点之间的关联关系称为 边，我们可以将此链表看成一个图：



由于图的遍历方式有深度优先搜索和广度优先搜索，同样地，对于此链表也可以使用深度优先搜索和广度优先搜索两种方法进行遍历。

算法：深度优先搜索
从头结点 head 开始拷贝；
由于一个结点可能被多个指针指到，因此如果该结点已被拷贝，则不需要重复拷贝；
如果还没拷贝该结点，则创建一个新的结点进行拷贝，并将拷贝过的结点保存在哈希表中；
使用递归拷贝所有的 next 结点，再递归拷贝所有的 random 结点。

```python
class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        visited = {}
    
        def bfs(head):
            if not head: return head
            clone = Node(head.val, None, None) # 创建新结点
            queue = collections.deque()
            queue.append(head)
            visited[head] = clone
            while queue:
                tmp = queue.pop()
                if tmp.next and tmp.next not in visited:
                    visited[tmp.next] = Node(tmp.next.val, [], [])
                    queue.append(tmp.next)  
                if tmp.random and tmp.random not in visited:
                    visited[tmp.random] = Node(tmp.random.val, [], [])
                    queue.append(tmp.random)
                visited[tmp].next = visited.get(tmp.next)
                visited[tmp].random = visited.get(tmp.random)
            return clone
        return bfs(head)
```


复杂度分析
时间复杂度：O(N)O(N)。
空间复杂度：O(N)O(N)。
算法：广度优先搜索
创建哈希表保存已拷贝结点，格式 {原结点：拷贝结点}
创建队列，并将头结点入队；
当队列不为空时，弹出一个结点，如果该结点的 next 结点未被拷贝过，则拷贝 next 结点并加入队列；同理，如果该结点的 random 结点未被拷贝过，则拷贝 random 结点并加入队列；

```python
class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        visited = {}
    
        def bfs(head):
            if not head: return head
            clone = Node(head.val, None, None) # 创建新结点
            queue = collections.deque()
            queue.append(head)
            visited[head] = clone
            while queue:
                tmp = queue.pop()
                if tmp.next and tmp.next not in visited:
                    visited[tmp.next] = Node(tmp.next.val, [], [])
                    queue.append(tmp.next)  
                if tmp.random and tmp.random not in visited:
                    visited[tmp.random] = Node(tmp.random.val, [], [])
                    queue.append(tmp.random)
                visited[tmp].next = visited.get(tmp.next)
                visited[tmp].random = visited.get(tmp.random)
            return clone
        return bfs(head)

作者：z1m
链接：https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/solution/lian-biao-de-shen-kao-bei-by-z1m/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```
复杂度分析
时间复杂度：O(N)O(N)。
空间复杂度：O(N)O(N)。
方法三：迭代
该方法的思路比较直接，对于一个结点，分别拷贝此结点、next 指针指向的结点、random 指针指向的结点， 然后进行下一个结点...如果遇到已经出现的结点，那么我们不用拷贝该结点，只需将 next 或 random 指针指向该结点即可。

```python
class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        visited = {}
        def getClonedNode(node):
            if node:
                if node in visited:
                    return visited[node]
                else:
                    visited[node] = Node(node.val,None,None)
                    return visited[node]
            return None
        
        if not head: return head
        old_node = head
        new_node = Node(old_node.val,None,None)
        visited[old_node] = new_node

        while old_node:
            new_node.random = getClonedNode(old_node.random)
            new_node.next = getClonedNode(old_node.next)
            
            old_node = old_node.next
            new_node = new_node.next
        return visited[head]
```
复杂度分析
时间复杂度：O(N)O(N)。
空间复杂度：O(N)O(N)。
方法四：优化的迭代
我们也可以不使用哈希表的额外空间来保存已经拷贝过的结点，而是将链表进行拓展，在每个链表结点的旁边拷贝，比如 A->B->C 变成 A->A'->B->B'->C->C'，然后将拷贝的结点分离出来变成 A->B->C和A'->B'->C'，最后返回 A'->B'->C'。

![img](https://pic.leetcode-cn.com/c53b7c728bcf064803cefc137766e5dbfa0247059ed8adf76a86d7e3f2de7546-35_1.gif)

```python
class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head: return head
        cur = head
        while cur:
            new_node = Node(cur.val,None,None)   # 克隆新结点
            new_node.next = cur.next
            cur.next = new_node   # 克隆新结点在cur 后面
            cur = new_node.next   # 移动到下一个要克隆的点
        cur = head

        while cur:  # 链接random
            cur.next.random = cur.random.next if cur.random else None
            cur = cur.next.next

        cur_old_list = head # 将两个链表分开
        cur_new_list = head.next
        new_head = head.next
        while cur_old_list:
            cur_old_list.next = cur_old_list.next.next
            cur_new_list.next = cur_new_list.next.next if cur_new_list.next else None
            cur_old_list = cur_old_list.next
            cur_new_list = cur_new_list.next
        return new_head
```
复杂度分析
时间复杂度：O(N)O(N)。
空间复杂度：O(1)O(1)。
总结
在对链表进行操作的时候，经常要记得把一个结点的指针域用另一个指针保存起来，这样返回的时候不容易出错。



来源：力扣（`LeetCode`）
链接：https://leetcode-cn.com/problems/insertion-sort-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



