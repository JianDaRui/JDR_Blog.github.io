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

[看这个这个！！！](https://leetcode-cn.com/problems/linked-list-cycle/solution/3chong-jie-jue-fang-shi-liang-chong-ji-bai-liao-10/)

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

#### 方法 1：

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

#### 哈希法 🪓

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

#### 快慢指针➡️➡️

```javascript
var rotateRight = function (head, k) {
    let fast = head, slow = head
    // fast 先走k步
    while (k--) {
        if (fast && fast.next) fast = fast.next
        else fast = head
    }
    // slow == fast说明k会被链表长度整除，故无需操作head直接返回即可
    if (slow === fast) return head
    // 快慢指针start
    while (fast.next) {
        slow = slow.next
        fast = fast.next
    }
    // 对慢指针位置进行打断
    fast.next = head
    head = slow.next
    slow.next = null
    return head
};
```



#### 链表转环 ♻️

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

#### 穷举法 💪

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
- 当然这里可以优化一下，比如使用`LinkedHashMap`或者`OrderedDict`这样的数据结构，可以省去排序环节。

代码实现:

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if(head===null || head.next===null) {
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
            // 初始化的时a指向的是哑结点，所以比较逻辑应该是a的下一个节点和b的下一个节点
            if(a.next.val != b.next.val) {
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

标签：删除

### [剑指 Offer 35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

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



#### 方法一：一行 python（不推荐）

明白了以上原理，对于 python 可直接调用相关函数：

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        return copy.deepcopy(head)

#### 方法二：DFS & BFS

图的基本单元是 顶点，顶点之间的关联关系称为 边，我们可以将此链表看成一个图：



由于图的遍历方式有深度优先搜索和广度优先搜索，同样地，对于此链表也可以使用深度优先搜索和广度优先搜索两种方法进行遍历。

#### 算法：深度优先搜索

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

#### 算法：广度优先搜索

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

#### 方法三：迭代

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

#### 方法四：优化的迭代

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



### [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

反转从位置 *m* 到 *n* 的链表。请使用一趟扫描完成反转。

**说明:**
1 ≤ *m* ≤ *n* ≤ 链表长度。

**示例:**

```
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

#### 思路分析

##### 方法一：递归

```js
class Solution {

    // Object level variables since we need the changes
    // to persist across recursive calls and Java is pass by value.
    private boolean stop;
    private ListNode left;

    public void recurseAndReverse(ListNode right, int m, int n) {

        // base case. Don't proceed any further
        if (n == 1) {
            return;
        }

        // Keep moving the right pointer one step forward until (n == 1)
        right = right.next;

        // Keep moving left pointer to the right until we reach the proper node
        // from where the reversal is to start.
        if (m > 1) {
            this.left = this.left.next;
        }

        // Recurse with m and n reduced.
        this.recurseAndReverse(right, m - 1, n - 1);

        // In case both the pointers cross each other or become equal, we
        // stop i.e. don't swap data any further. We are done reversing at this
        // point.
        if (this.left == right || right.next == this.left) {
            this.stop = true;            
        }

        // Until the boolean stop is false, swap data between the two pointers
        if (!this.stop) {
            int t = this.left.val;
            this.left.val = right.val;
            right.val = t;

            // Move left one step to the right.
            // The right pointer moves one step back via backtracking.
            this.left = this.left.next;
        }
    }

    public ListNode reverseBetween(ListNode head, int m, int n) {
        this.left = head;
        this.stop = false;
        this.recurseAndReverse(head, m, n);
        return head;
    }
}
```



##### 方法二: 迭代链接反转

```java
class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {

        // Empty list
        if (head == null) {
            return null;
        }

        // Move the two pointers until they reach the proper starting point
        // in the list.
        ListNode cur = head, prev = null;
        while (m > 1) {
            prev = cur;
            cur = cur.next;
            m--;
            n--;
        }

        // The two pointers that will fix the final connections.
        ListNode con = prev, tail = cur;

        // Iteratively reverse the nodes until n becomes 0.
        ListNode third = null;
        while (n > 0) {
            third = cur.next;
            cur.next = prev;
            prev = cur;
            cur = third;
            n--;
        }

        // Adjust the final connections as explained in the algorithm
        if (con != null) {
            con.next = prev;
        } else {
            head = prev;
        }

        tail.next = cur;
        return head;
    }
}
```

##### 方法三：双指针

1、我们定义两个指针，分别称之为g(guard 守卫)和p(point)。
我们首先根据方法的参数m确定g和p的位置。将g移动到第一个要反转的节点的前面，将p移动到第一个要反转的节点的位置上。我们以m=2，n=4为例。

![img](https://pic.leetcode-cn.com/5389db651086bd4bcd42dd5c4552f180b553a9b204cfc1013523dfe09beac382-1.png)

2、将p后面的元素删除，然后添加到g的后面。也即头插法。

![img](https://pic.leetcode-cn.com/db22bdb60035e45f8c354b3f45f2a844260d6cafcf81528d2c4f1b51e484fb45-2.png)


3、根据m和n重复步骤（2）
4、返回dummyHead.next



```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        ListNode dummyHead = new ListNode(0);
        dummyHead.next = head;

        ListNode g = dummyHead;
        ListNode p = dummyHead.next;

        int step = 0;
        while (step < m - 1) {
            g = g.next; p = p.next;
            step ++;
        }

        for (int i = 0; i < n - m; i++) {
            ListNode removed = p.next;
            p.next = p.next.next;

            removed.next = g.next;
            g.next = removed;
        }

        return dummyHead.next;
    }
}
```

### [剑指 Offer 06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。



**示例 1：**

```
输入：head = [1,3,2]
输出：[2,3,1]
```

[题解](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/solution/mian-shi-ti-06-cong-wei-dao-tou-da-yin-lian-biao-d/)

##### 方法一： 递归

```java
class Solution {
    ArrayList<Integer> tmp = new ArrayList<Integer>();
    public int[] reversePrint(ListNode head) {
        recur(head);
        int[] res = new int[tmp.size()];
        for(int i = 0; i < res.length; i++)
            res[i] = tmp.get(i);
        return res;
    }
    void recur(ListNode head) {
        if(head == null) return;
        recur(head.next);
        tmp.add(head.val);
    }
}

```

##### 方法二：辅助栈法

```java
class Solution {
    public int[] reversePrint(ListNode head) {
        LinkedList<Integer> stack = new LinkedList<Integer>();
        while(head != null) {
            stack.addLast(head.val);
            head = head.next;
        }
        int[] res = new int[stack.size()];
        for(int i = 0; i < res.length; i++)
            res[i] = stack.removeLast();
    return res;
    }
}

```

### [86. 分隔链表](https://leetcode-cn.com/problems/partition-list/)

给你一个链表和一个特定值 `x` ，请你对链表进行分隔，使得所有小于 `x` 的节点都出现在大于或等于 `x` 的节点之前。

你应当保留两个分区中每个节点的初始相对位置。

**示例：**

```
输入：head = 1->4->3->2->5->2, x = 3
输出：1->2->2->4->3->5
```

#### 思路分析

##### 方法一：模拟



```javascript
var partition = function(head, x) {
    let small = new ListNode(0);
    const smallHead = small;
    let large = new ListNode(0);
    const largeHead = large;
    while (head !== null) {
        if (head.val < x) {
            small.next = head;
            small = small.next;
        } else {
            large.next = head;
            large = large.next;
        }
        head = head.next;
    }
    large.next = null;
    small.next = largeHead.next;
    return smallHead.next;
};

```

##### 方法二： 

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode partition(ListNode head, int x) {
        ListNode dummy1 = new ListNode(-1);
        ListNode dummy2 = new ListNode(-1);
        ListNode p1 = dummy1;
        ListNode p2 = dummy2;
        while (head != null) {
            if (head.val < x) {
                p1.next = head;
                p1 = p1.next;
            } else {
                p2.next = head;
                p2 = p2.next;
            }
            head = head.next;
        }
        p1.next = dummy2.next;
        p2.next = null;
        return dummy1.next; 
    }
}

```

[看这个看这个！！！](https://leetcode-cn.com/problems/partition-list/solution/lian-tou-shu-zu-shuang-zhi-zhen-7xing-da-baxz/)



### [剑指 Offer 22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。例如，一个链表有6个节点，从头节点开始，它们的值依次是1、2、3、4、5、6。这个链表的倒数第3个节点是值为4的节点。

 

**示例：**

```
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

#### 思路分析

##### 方法一

```java
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode former = head, latter = head;
        for(int i = 0; i < k; i++)
            former = former.next;
        while(former != null) {
            former = former.next;
            latter = latter.next;
        }
        return latter;
    }
}
```

##### 方法二：双指针

```java
public ListNode getKthFromEnd(ListNode head, int k) {
    ListNode first = head;
    ListNode second = head;
    //第一个指针先走k步
    while (k-- > 0) {
        first = first.next;
    }
    //然后两个指针在同时前进
    while (first != null) {
        first = first.next;
        second = second.next;
    }
    return second;
}
```

##### 方法三：栈

```java
public ListNode getKthFromEnd(ListNode head, int k) {
    Stack<ListNode> stack = new Stack<>();
    //链表节点压栈
    while (head != null) {
        stack.push(head);
        head = head.next;
    }
    //在出栈串成新的链表
    ListNode firstNode = stack.pop();
    while (--k > 0) {
        ListNode temp = stack.pop();
        temp.next = firstNode;
        firstNode = temp;
    }
    return firstNode;
}

```

##### 方法四：递归

```java
int size;

public ListNode getKthFromEnd(ListNode head, int k) {
    if (head == null)
        return head;
    ListNode node = getKthFromEnd(head.next, k);
    if (++size == k)
        return head;
    return node;
}

```

[这个这个！！！](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/solution/shuang-zhi-zhen-zhan-di-gui-3chong-jie-jue-fang-sh/)



### [445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/)

难度中等324

给你两个 **非空** 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。



**进阶：**

如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。



**示例：**

```
输入：(7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 8 -> 0 -> 7
```



#### 思路分析

##### 方法一：栈

```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Deque<Integer> stack1 = new LinkedList<Integer>();
        Deque<Integer> stack2 = new LinkedList<Integer>();
        while (l1 != null) {
            stack1.push(l1.val);
            l1 = l1.next;
        }
        while (l2 != null) {
            stack2.push(l2.val);
            l2 = l2.next;
        }
        int carry = 0;
        ListNode ans = null;
        while (!stack1.isEmpty() || !stack2.isEmpty() || carry != 0) {
            int a = stack1.isEmpty() ? 0 : stack1.pop();
            int b = stack2.isEmpty() ? 0 : stack2.pop();
            int cur = a + b + carry;
            carry = cur / 10;
            cur %= 10;
            ListNode curnode = new ListNode(cur);
            curnode.next = ans;
            ans = curnode;
        }
        return ans;
    }
}

```

##### 方法二: 递归

```java
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let countl1 = 0, countl2 = 0
  let l1List = l1
  let l2List = l2
  // 获取l1长度
  while(l1List) {
    countl1++
    l1List = l1List.next
  }
   // 获取l2长度	
  while(l2List) {
    countl2++
    l2List = l2List.next
  }

  // creat the frontest List
  let tmpList = new ListNode(0)
  let cur = tmpList
  let diff = Math.abs(countl2 - countl1)
  while (diff--) {
    cur.next = new ListNode(0)
    cur = cur.next
  }
	// 补齐链表	
  if (countl1 < countl2) {
    cur.next = l1
    l1 = tmpList.next
  } else if (countl2 < countl1) {
    cur.next = l2
    l2 = tmpList.next
  }


  // flag: 1 shows digit carry, 0 not;
  let digitCarry = 0

  /**
   * calculate the sum of l1 and l2
   */
  function listNodeAdd(l1, l2) {
    if (l1 === null) return

    listNodeAdd(l1.next, l2.next)

    let sum = l1.val + l2.val + digitCarry
    if (sum >= 10) {
      l1.val = sum % 10
      digitCarry = 1
    } else {
      l1.val = sum
      digitCarry = 0
    }
  }

  listNodeAdd(l1, l2)

  let result = l1
  if (digitCarry === 1) {
    result = new ListNode(1)
    result.next = l1
  }

  return result
}
```



[看这里！！！](https://leetcode-cn.com/problems/add-two-numbers-ii/solution/java-2ms-ji-bai-100-by-she-hui-zhu-yi-jie-ban-ren-/)



### [114. 二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

难度中等695

给定一个二叉树，[原地](https://baike.baidu.com/item/原地算法/8010757)将它展开为一个单链表。

 

例如，给定二叉树

```
    1
   / \
  2   5
 / \   \
3   4   6
```

将其展开为：

```
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```



#### 思路分析

##### 方法一：栈

```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Deque<Integer> stack1 = new LinkedList<Integer>();
        Deque<Integer> stack2 = new LinkedList<Integer>();
        while (l1 != null) {
            stack1.push(l1.val);
            l1 = l1.next;
        }
        while (l2 != null) {
            stack2.push(l2.val);
            l2 = l2.next;
        }
        int carry = 0;
        ListNode ans = null;
        while (!stack1.isEmpty() || !stack2.isEmpty() || carry != 0) {
            int a = stack1.isEmpty() ? 0 : stack1.pop();
            int b = stack2.isEmpty() ? 0 : stack2.pop();
            int cur = a + b + carry;
            carry = cur / 10;
            cur %= 10;
            ListNode curnode = new ListNode(cur);
            curnode.next = ans;
            ans = curnode;
        }
        return ans;
    }
}
```

方法二： 

```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) { 
        Stack<Integer> stack1 = new Stack<>();
        Stack<Integer> stack2 = new Stack<>();
        while (l1 != null) {
            stack1.push(l1.val);
            l1 = l1.next;
        }
        while (l2 != null) {
            stack2.push(l2.val);
            l2 = l2.next;
        }
        
        int carry = 0;
        ListNode head = null;
        while (!stack1.isEmpty() || !stack2.isEmpty() || carry > 0) {
            int sum = carry;
            sum += stack1.isEmpty()? 0: stack1.pop();
            sum += stack2.isEmpty()? 0: stack2.pop();
            ListNode node = new ListNode(sum % 10);
            node.next = head;
            head = node;
            carry = sum / 10;
        }
        return head;
    }
}
```

### [226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

难度简单735

翻转一棵二叉树。

**示例：**

输入：

```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```

输出：

```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```



#### 方法一： 递归

```java
class Solution {
	public TreeNode invertTree(TreeNode root) {
		//递归函数的终止条件，节点为空时返回
		if(root==null) {
			return null;
		}
		//下面三句是将当前节点的左右子树交换
		TreeNode tmp = root.right;
		root.right = root.left;
		root.left = tmp;
		//递归交换当前节点的 左子树
		invertTree(root.left);
		//递归交换当前节点的 右子树
		invertTree(root.right);
		//函数返回时就表示当前这个节点，以及它的左右子树
		//都已经交换完了
		return root;
	}
}

```

#### 方法二：迭代

```java
class Solution {
	public TreeNode invertTree(TreeNode root) {
		if(root==null) {
			return null;
		}
		//将二叉树中的节点逐层放入队列中，再迭代处理队列中的元素
		LinkedList<TreeNode> queue = new LinkedList<TreeNode>();
		queue.add(root);
		while(!queue.isEmpty()) {
			//每次都从队列中拿一个节点，并交换这个节点的左右子树
			TreeNode tmp = queue.poll();
			TreeNode left = tmp.left;
			tmp.left = tmp.right;
			tmp.right = left;
			//如果当前节点的左子树不为空，则放入队列等待后续处理
			if(tmp.left!=null) {
				queue.add(tmp.left);
			}
			//如果当前节点的右子树不为空，则放入队列等待后续处理
			if(tmp.right!=null) {
				queue.add(tmp.right);
			}
			
		}
		//返回处理完的根节点
		return root;
	}
}

```

[看这个看这个！！！](https://leetcode-cn.com/problems/invert-binary-tree/solution/qian-zhong-hou-xu-bian-li-ceng-xu-bian-li-by-liwei/)





### [654. 最大二叉树](https://leetcode-cn.com/problems/maximum-binary-tree/)

难度中等235

给定一个不含重复元素的整数数组 `nums` 。一个以此数组直接递归构建的 **最大二叉树** 定义如下：

1. 二叉树的根是数组 `nums` 中的最大元素。
2. 左子树是通过数组中 **最大值左边部分** 递归构造出的最大二叉树。
3. 右子树是通过数组中 **最大值右边部分** 递归构造出的最大二叉树。

返回有给定数组 `nums` 构建的 **最大二叉树** 。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/12/24/tree1.jpg)

```
输入：nums = [3,2,1,6,0,5]
输出：[6,3,5,null,2,0,null,null,1]
解释：递归调用如下所示：
- [3,2,1,6,0,5] 中的最大值是 6 ，左边部分是 [3,2,1] ，右边部分是 [0,5] 。
    - [3,2,1] 中的最大值是 3 ，左边部分是 [] ，右边部分是 [2,1] 。
        - 空数组，无子节点。
        - [2,1] 中的最大值是 2 ，左边部分是 [] ，右边部分是 [1] 。
            - 空数组，无子节点。
            - 只有一个元素，所以子节点是一个值为 1 的节点。
    - [0,5] 中的最大值是 5 ，左边部分是 [0] ，右边部分是 [] 。
        - 只有一个元素，所以子节点是一个值为 0 的节点。
        - 空数组，无子节点。
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/12/24/tree2.jpg)

```
输入：nums = [3,2,1]
输出：[3,null,2,null,1]
```

####  方法一： 递归

```java
public class Solution {
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        return construct(nums, 0, nums.length);
    }
    public TreeNode construct(int[] nums, int l, int r) {
        if (l == r)
            return null;
        int max_i = max(nums, l, r);
        TreeNode root = new TreeNode(nums[max_i]);
        root.left = construct(nums, l, max_i);
        root.right = construct(nums, max_i + 1, r);
        return root;
    }
    public int max(int[] nums, int l, int r) {
        int max_i = l;
        for (int i = l; i < r; i++) {
            if (nums[max_i] < nums[i])
                max_i = i;
        }
        return max_i;
    }
}

```

#### 方法二： 栈

```java
 class Solution {
    public TreeNode constructMaximumBinaryTree(int[] nums) {
        Stack<TreeNode> stack = new Stack<>();
        for (int n : nums) {
            TreeNode node = new TreeNode(n);
            TreeNode pre = null;
            while (!stack.isEmpty() && stack.peek().val < n) {
                stack.peek().right = pre;
                pre = stack.pop();
            }
            node.left = pre;
            stack.push(node);
        }
        TreeNode pre = null;
        while (!stack.isEmpty()) {
            stack.peek().right = pre;
            pre = stack.pop();
        }
        return pre;
    }
}

```

### [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

难度简单1460

反转一个单链表。

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

**进阶:**
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

**提示：**

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`
- `nums` 中的所有整数 **互不相同**



#### 方法一：迭代

```javascript
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}
```

#### 方法二：递归

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode p = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return p;
    }
}
```

#### 方法三：双指针

```java 
class Solution {
	public ListNode reverseList(ListNode head) {
		//申请节点，pre和 cur，pre指向null
		ListNode pre = null;
		ListNode cur = head;
		ListNode tmp = null;
		while(cur!=null) {
			//记录当前节点的下一个节点
			tmp = cur.next;
			//然后将当前节点指向pre
			cur.next = pre;
			//pre和cur节点都前进一位
			pre = cur;
			cur = tmp;
		}
		return pre;
	}
}
```

#### 方法四：栈

```java
public ListNode reverseList(ListNode head) {
    Stack<ListNode> stack = new Stack<>();
    //把链表节点全部摘掉放到栈中
    while (head != null) {
        stack.push(head);
        head = head.next;
    }
    if (stack.isEmpty())
        return null;
    ListNode node = stack.pop();
    ListNode dummy = node;
    //栈中的结点全部出栈，然后重新连成一个新的链表
    while (!stack.isEmpty()) {
        ListNode tempNode = stack.pop();
        node.next = tempNode;
        node = node.next;
    }
    //最后一个结点就是反转前的头结点，一定要让他的next
    //等于空，否则会构成环
    node.next = null;
    return dummy;
}

```

[这个不错偶！](https://leetcode-cn.com/problems/reverse-linked-list/solution/3chong-jie-jue-fang-shi-zhan-shuang-lian-biao-di-2/)



### [203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

难度简单517

删除链表中等于给定值 ***val\*** 的所有节点。

**示例:**

```
输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5
```

#### 方法一：哨兵节点

```java
class Solution {
  public ListNode removeElements(ListNode head, int val) {
    ListNode sentinel = new ListNode(0);
    sentinel.next = head;

    ListNode prev = sentinel, curr = head;
    while (curr != null) {
      if (curr.val == val) prev.next = curr.next;
      else prev = curr;
      curr = curr.next;
    }
    return sentinel.next;
  }
}
```



#### 方法二（删除头结点时另做考虑）

```Java
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        //删除值相同的头结点后，可能新的头结点也值相等，用循环解决
        while(head!=null&&head.val==val){
            head=head.next;
        }
        if(head==null)
            return head;
        ListNode prev=head;
        //确保当前结点后还有结点
        while(prev.next!=null){
            if(prev.next.val==val){
                prev.next=prev.next.next;
            }else{
                prev=prev.next;
            }
        }
        return head;
    }
}
```



#### 方法三（添加一个虚拟头结点）

```Java
class Solution {
    public ListNode removeElements(ListNode head, int val) {
        //创建一个虚拟头结点
        ListNode dummyNode=new ListNode(val-1);
        dummyNode.next=head;
        ListNode prev=dummyNode;
        //确保当前结点后还有结点
        while(prev.next!=null){
            if(prev.next.val==val){
                prev.next=prev.next.next;
            }else{
                prev=prev.next;
            }
        }
        return dummyNode.next;
    }
}
```

#### 方法四（递归）

```Java
class Solution {
    public ListNode removeElements(ListNode head, int val) {
       if(head==null)
           return null;
        head.next=removeElements(head.next,val);
        if(head.val==val){
            return head.next;
        }else{
            return head;
        }
    }
}
```



### [328. 奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/)

难度中等368

给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

**示例 1:**

```
输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
```

**示例 2:**

```
输入: 2->1->3->5->6->4->7->NULL 
输出: 2->3->6->7->1->5->4->NULL
```

**说明:**

- 应当保持奇数节点和偶数节点的相对顺序。
- 链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。

#### 方法一：分离节点后合并



![img](https://assets.leetcode-cn.com/solution-static/328/1.png)

```javascript
var oddEvenList = function(head) {
    if (head === null) {
        return head;
    }
    let evenHead = head.next;
    let odd = head, even = evenHead;
    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
};
```



#### 方法二

```javascript
var oddEvenList = function (head) {
  if (head == null) {
    return head;
  }
  let odd = head;         // 扫描奇数结点
  let even = head.next;   // 扫描偶数结点
  let evenHead = even;    // 保存偶链的头结点

  while (even != null && even.next != null) { 
    odd.next = even.next; // even.next是下一个奇数结点
    odd = odd.next;       // odd 推进到下一个奇数结点
    even.next = odd.next; // 下一个奇数结点的next是下一个偶数结点
    even = even.next;     // even 推进到下一个偶数结点
  }
  odd.next = evenHead;    // 奇链连上偶链
  return head;
};
```

#### 迭代

解题思路
奇数指针head从链头向尾每次移动两格。p暂存两格后的第3格
head.next的next指向p.next。head的next指向p。head = p移动两格
迭代后，head指向奇数位最后节点，已不是最初head
需n把偶数位第一节点，最初head.next暂存。与head相连
需m把奇数位第一节点，最初head暂存。

```js
var oddEvenList = function(head, m = head) {
    if (head) {
        var n = head.next
        while(head.next && head.next.next) {
            var p = head.next.next
            head.next.next = p.next
            head = head.next = p
        }
        head.next = n
    }
    return m
};
```



#### 递归

解题思路
思路与迭代相同。n暂存偶数位第一节点
递归到底，奇数指针head指向奇数位最后节点，与n相连
回溯时，head指向递归前位置
回溯到第一次递归前的head即奇数位第一节点，返回head
代码

```js
var oddEvenList = function(head, n = head ? head.next : null, p) {
    return head && (head.next && (p = head.next.next) ? (head.next.next = p.next, oddEvenList(head.next = p, n)) : head.next = n), head
};
```



#### 双指针

解题思路
奇数指针head，偶数指针p。从链头向尾每次移动两格
偶数指针一定比奇数指针先到尾，边界是p && p.next
迭代后，head指向奇数位最后节点，与最初head.next相连
返回最初head
代码

```js
var oddEvenList = function(head, m = head) {
    if (head) {
        var n = p = head.next
        while(p && p.next) {
            head = head.next = head.next.next
            p = p.next = p.next.next
        }
        head.next = n
    }
    return m
};


```



### [剑指 Offer 18. 删除链表的节点](https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/)

难度简单88

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

**注意：**此题对比原题有改动

**示例 1:**

```
输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
```

**示例 2:**

```
输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
```



#### 方法一

```java
class Solution {
    public ListNode deleteNode(ListNode head, int val) {
        if(head.val == val) return head.next;
        ListNode pre = head, cur = head.next;
        while(cur != null && cur.val != val) {
            pre = cur;
            cur = cur.next;
        }
        if(cur != null) pre.next = cur.next;
        return head;
    }
}

```

#### 方法二

```java
public ListNode deleteNode(ListNode head, int val) {
    //初始化一个虚拟节点
    ListNode dummy = new ListNode(0);
    //让虚拟节点指向头结点
    dummy.next = head;
    ListNode cur = head;
    ListNode pre = dummy;
    while (cur != null) {
        if (cur.val == val) {
            //如果找到要删除的结点，直接把他删除
            pre.next = cur.next;
            break;
        }
        //如果没找到，pre指针和cur指针都同时往后移一步
        pre = cur;
        cur = cur.next;
    }
    //最后返回虚拟节点的下一个结点即可
    return dummy.next;
}

```

#### 方法三

```java
public ListNode deleteNode(ListNode head, int val) {
    if (head == null)
        return head;
    if (head.val == val)
        return head.next;
    head.next = deleteNode(head.next, val);
    return head;
}
```



### [143. 重排链表](https://leetcode-cn.com/problems/reorder-list/)

难度中等500

给定一个单链表 *L*：*L*0→*L*1→…→*L**n*-1→*L*n ，
将其重新排列后变为： *L*0→*L**n*→*L*1→*L**n*-1→*L*2→*L**n*-2→…

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

**示例 1:**

```
给定链表 1->2->3->4, 重新排列为 1->4->2->3.
```

**示例 2:**

```
给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
```



#### 方法一：存储

```java
public void reorderList(ListNode head) {
    if (head == null) {
        return;
    }
    //存到 list 中去
    List<ListNode> list = new ArrayList<>();
    while (head != null) {
        list.add(head);
        head = head.next;
    }
    //头尾指针依次取元素
    int i = 0, j = list.size() - 1;
    while (i < j) {
        list.get(i).next = list.get(j);
        i++;
        //偶数个节点的情况，会提前相遇
        if (i == j) {
            break;
        }
        list.get(j).next = list.get(i);
        j--;
    }
    list.get(i).next = null;
}

```

#### 方法二：

```java
public void reorderList(ListNode head) {

    if (head == null || head.next == null || head.next.next == null) {
        return;
    }
    int len = 0;
    ListNode h = head;
    //求出节点数
    while (h != null) {
        len++;
        h = h.next;
    }

    reorderListHelper(head, len);
}

private ListNode reorderListHelper(ListNode head, int len) {
    if (len == 1) {
        ListNode outTail = head.next;
        head.next = null;
        return outTail;
    }
    if (len == 2) {
        ListNode outTail = head.next.next;
        head.next.next = null;
        return outTail;
    }
    //得到对应的尾节点，并且将头结点和尾节点之间的链表通过递归处理
    ListNode tail = reorderListHelper(head.next, len - 2);
    ListNode subHead = head.next;//中间链表的头结点
    head.next = tail;
    ListNode outTail = tail.next;  //上一层 head 对应的 tail
    tail.next = subHead;
    return outTail;
}
```

#### 方法三

```java
public void reorderList(ListNode head) {
    if (head == null || head.next == null || head.next.next == null) {
        return;
    }
    //找中点，链表分成两个
    ListNode slow = head;
    ListNode fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    ListNode newHead = slow.next;
    slow.next = null;
    
    //第二个链表倒置
    newHead = reverseList(newHead);
    
    //链表节点依次连接
    while (newHead != null) {
        ListNode temp = newHead.next;
        newHead.next = head.next;
        head.next = newHead;
        head = newHead.next;
        newHead = temp;
    }

}

private ListNode reverseList(ListNode head) {
    if (head == null) {
        return null;
    }
    ListNode tail = head;
    head = head.next;

    tail.next = null;

    while (head != null) {
        ListNode temp = head.next;
        head.next = tail;
        tail = head;
        head = temp;
    }

    return tail;
}
```

#### 方法四：线性表

```java 
class Solution {
    public void reorderList(ListNode head) {
        if (head == null) {
            return;
        }
        List<ListNode> list = new ArrayList<ListNode>();
        ListNode node = head;
        while (node != null) {
            list.add(node);
            node = node.next;
        }
        int i = 0, j = list.size() - 1;
        while (i < j) {
            list.get(i).next = list.get(j);
            i++;
            if (i == j) {
                break;
            }
            list.get(j).next = list.get(i);
            j--;
        }
        list.get(i).next = null;
    }
}
```



#### 方法五：寻找链表中点 + 链表逆序 + 合并链表

```java
class Solution {
    public void reorderList(ListNode head) {
        if (head == null) {
            return;
        }
        ListNode mid = middleNode(head);
        ListNode l1 = head;
        ListNode l2 = mid.next;
        mid.next = null;
        l2 = reverseList(l2);
        mergeList(l1, l2);
    }

    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    public void mergeList(ListNode l1, ListNode l2) {
        ListNode l1_tmp;
        ListNode l2_tmp;
        while (l1 != null && l2 != null) {
            l1_tmp = l1.next;
            l2_tmp = l2.next;

            l1.next = l2;
            l1 = l1_tmp;

            l2.next = l1;
            l2 = l2_tmp;
        }
    }
}
```



### [面试题 02.02. 返回倒数第 k 个节点](https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/)

难度简单54

实现一种算法，找出单向链表中倒数第 k 个节点。返回该节点的值。

**注意：**本题相对原题稍作改动

**示例：**

```
输入： 1->2->3->4->5 和 k = 2
输出： 4
```

**说明：**

给定的 *k* 保证是有效的。

#### 方法一：双指针求解

```java
    public int kthToLast(ListNode head, int k) {
        ListNode first = head;
        ListNode second = head;
        //第一个指针先走k步
        while (k-- > 0) {
            first = first.next;
        }
        //然后两个指针在同时前进
        while (first != null) {
            first = first.next;
            second = second.next;
        }
        return second.val;
    }
```

#### 方法二：栈

```java
    public int kthToLast(ListNode head, int k) {
        Stack<ListNode> stack = new Stack<>();
        //链表节点压栈
        while (head != null) {
            stack.push(head);
            head = head.next;
        }
        //在出栈串成新的链表
        ListNode firstNode = stack.pop();
        while (--k > 0) {
            ListNode temp = stack.pop();
            temp.next = firstNode;
            firstNode = temp;
        }
        return firstNode.val;
    }

```

#### 方法三：递归求解

```java
    int size;

    public int kthToLast(ListNode head, int k) {
        if (head == null)
            return 0;
        int value = kthToLast(head.next, k);
        if (++size == k)
            return head.val;
        return value;
    }


```

[看这个这个！！！](https://leetcode-cn.com/problems/kth-node-from-end-of-list-lcci/solution/shuang-zhi-zhen-zhan-di-gui-3chong-jie-jue-fang-2/)



### [237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)

难度简单829

请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点。传入函数的唯一参数为 **要被删除的节点** 。

 

现有一个链表 -- head = [4,5,1,9]，它可以表示为:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/01/19/237_example.png)

 

**示例 1：**

```
输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
```

**示例 2：**

```
输入：head = [4,5,1,9], node = 1
输出：[4,5,9]
解释：给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
```



#### 方法一：与下一个节点交换

```java
public void deleteNode(ListNode node) {
    node.val = node.next.val;
    node.next = node.next.next;
}
```



### [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

难度中等502

给你二叉树的根节点 `root` ，返回它节点值的 **前序** 遍历。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

```
输入：root = [1,null,2,3]
输出：[1,2,3]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：[1]
```

**示例 4：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)

```
输入：root = [1,2]
输出：[1,2]
```

**示例 5：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg)

```
输入：root = [1,null,2]
输出：[1,2]
```



#### 方法一：



[看这个这个好！！！](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/leetcodesuan-fa-xiu-lian-dong-hua-yan-shi-xbian-2/)

[这个也不错！！！](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/tu-jie-er-cha-shu-de-si-chong-bian-li-by-z1m/)

[还有这个偶](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution/dai-ma-sui-xiang-lu-chi-tou-qian-zhong-hou-xu-de-d/)



### [94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

难度中等843

给定一个二叉树的根节点 `root` ，返回它的 **中序** 遍历。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

```
输入：root = [1,null,2,3]
输出：[1,3,2]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：[1]
```

**示例 4：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)

```java

class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        WHITE, GRAY = 0, 1
        res = []
        stack = [(WHITE, root)]
        while stack:
            color, node = stack.pop()
            if node is None: continue
            if color == WHITE:
                stack.append((WHITE, node.right))
                stack.append((GRAY, node))
                stack.append((WHITE, node.left))
            else:
                res.append(node.val)
        return res

```

[走一个](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/dong-hua-yan-shi-94-er-cha-shu-de-zhong-xu-bian-li/)

### [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

难度中等510

给定一个二叉树，返回它的 *后序* 遍历。

**示例:**

```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
```

**进阶:** 递归算法很简单，你可以通过迭代算法完成吗？

#### 方法一：递归

```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        postorder(root, res);
        return res;
    }

    public void postorder(TreeNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        postorder(root.left, res);
        postorder(root.right, res);
        res.add(root.val);
    }
}

```

#### 方法二：迭代

```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) {
            return res;
        }

        Deque<TreeNode> stack = new LinkedList<TreeNode>();
        TreeNode prev = null;
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            if (root.right == null || root.right == prev) {
                res.add(root.val);
                prev = root;
                root = null;
            } else {
                stack.push(root);
                root = root.right;
            }
        }
        return res;
    }
}

```

#### Morris 遍历

```java
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null) {
            return res;
        }

        TreeNode p1 = root, p2 = null;

        while (p1 != null) {
            p2 = p1.left;
            if (p2 != null) {
                while (p2.right != null && p2.right != p1) {
                    p2 = p2.right;
                }
                if (p2.right == null) {
                    p2.right = p1;
                    p1 = p1.left;
                    continue;
                } else {
                    p2.right = null;
                    addPath(res, p1.left);
                }
            }
            p1 = p1.right;
        }
        addPath(res, root);
        return res;
    }

    public void addPath(List<Integer> res, TreeNode node) {
        int count = 0;
        while (node != null) {
            ++count;
            res.add(node.val);
            node = node.right;
        }
        int left = res.size() - count, right = res.size() - 1;
        while (left < right) {
            int temp = res.get(left);
            res.set(left, res.get(right));
            res.set(right, temp);
            left++;
            right--;
        }
    }
}

作者：LeetCode-Solution
```

### [102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

难度中等755

给你一个二叉树，请你返回其按 **层序遍历** 得到的节点值。 （即逐层地，从左到右访问所有节点）。

 

**示例：**
二叉树：`[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层序遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
]
```

#### 方法一：广度优先搜索

```javascript
var levelOrder = function(root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);
    while (q.length !== 0) {
        const currentLevelSize = q.length;
        ret.push([]);
        for (let i = 1; i <= currentLevelSize; ++i) {
            const node = q.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
        
    return ret;
};

作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/er-cha-shu-de-ceng-xu-bian-li-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



#### 方法二：递归

```java
import java.util.*;	
class Solution {
	public List<List<Integer>> levelOrder(TreeNode root) {
		if(root==null) {
			return new ArrayList<List<Integer>>();
		}
		//用来存放最终结果
		List<List<Integer>> res = new ArrayList<List<Integer>>();
		dfs(1,root,res);
		return res;
	}
	
	void dfs(int index,TreeNode root, List<List<Integer>> res) {
		//假设res是[ [1],[2,3] ]， index是3，就再插入一个空list放到res中
		if(res.size()<index) {
			res.add(new ArrayList<Integer>());
		}
		//将当前节点的值加入到res中，index代表当前层，假设index是3，节点值是99
		//res是[ [1],[2,3] [4] ]，加入后res就变为 [ [1],[2,3] [4,99] ]
		res.get(index-1).add(root.val);
		//递归的处理左子树，右子树，同时将层数index+1
		if(root.left!=null) {
			dfs(index+1, root.left, res);
		}
		if(root.right!=null) {
			dfs(index+1, root.right, res);
		}
	}
}

```

#### 方法三：迭代

```java
import java.util.*;	
class Solution {
	public List<List<Integer>> levelOrder(TreeNode root) {
		if(root==null) {
			return new ArrayList<List<Integer>>();
		}
		
		List<List<Integer>> res = new ArrayList<List<Integer>>();
		LinkedList<TreeNode> queue = new LinkedList<TreeNode>();
		//将根节点放入队列中，然后不断遍历队列
		queue.add(root);
		while(queue.size()>0) {
			//获取当前队列的长度，这个长度相当于 当前这一层的节点个数
			int size = queue.size();
			ArrayList<Integer> tmp = new ArrayList<Integer>();
			//将队列中的元素都拿出来(也就是获取这一层的节点)，放到临时list中
			//如果节点的左/右子树不为空，也放入队列中
			for(int i=0;i<size;++i) {
				TreeNode t = queue.remove();
				tmp.add(t.val);
				if(t.left!=null) {
					queue.add(t.left);
				}
				if(t.right!=null) {
					queue.add(t.right);
				}
			}
			//将临时list加入最终返回结果中
			res.add(tmp);
		}
		return res;
	}
}
```



[多看题解](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/solution/tao-mo-ban-bfs-he-dfs-du-ke-yi-jie-jue-by-fuxuemin/)





### [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

难度简单778

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

**示例：**
给定二叉树 `[3,9,20,null,null,15,7]`，

```
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

#### 方法一：递归

```java
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        } else {
            int leftHeight = maxDepth(root.left);
            int rightHeight = maxDepth(root.right);
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }
}

```

#### 方法二：广度优先搜索

```java
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);
        int ans = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            while (size > 0) {
                TreeNode node = queue.poll();
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
                size--;
            }
            ans++;
        }
        return ans;
    }
}
```

### [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

难度简单1210

给定一个二叉树，检查它是否是镜像对称的。

 

例如，二叉树 `[1,2,2,3,4,4,3]` 是对称的。

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

 

但是下面这个 `[1,2,2,null,3,null,3]` 则不是镜像对称的:

```
    1
   / \
  2   2
   \   \
   3    3
```



#### 方法一：递归

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root, root);
    }

    public boolean check(TreeNode p, TreeNode q) {
        if (p == null && q == null) {
            return true;
        }
        if (p == null || q == null) {
            return false;
        }
        return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
    }
}
```

#### 方法二：迭代

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        return check(root, root);
    }

    public boolean check(TreeNode u, TreeNode v) {
        Queue<TreeNode> q = new LinkedList<TreeNode>();
        q.offer(u);
        q.offer(v);
        while (!q.isEmpty()) {
            u = q.poll();
            v = q.poll();
            if (u == null && v == null) {
                continue;
            }
            if ((u == null || v == null) || (u.val != v.val)) {
                return false;
            }

            q.offer(u.left);
            q.offer(v.right);

            q.offer(u.right);
            q.offer(v.left);
        }
        return true;
    }
}

```



### [112. 路径总和](https://leetcode-cn.com/problems/path-sum/)

难度简单504

给你二叉树的根节点 `root` 和一个表示目标和的整数 `targetSum` ，判断该树中是否存在 **根节点到叶子节点** 的路径，这条路径上所有节点值相加等于目标和 `targetSum` 。

**叶子节点** 是指没有子节点的节点。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg)

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

```
输入：root = [1,2,3], targetSum = 5
输出：false
```

**示例 3：**

```
输入：root = [1,2], targetSum = 0
输出：false
```

 

#### 方法一

```java
class Solution {
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) {
            return false;
        }
        Queue<TreeNode> queNode = new LinkedList<TreeNode>();
        Queue<Integer> queVal = new LinkedList<Integer>();
        queNode.offer(root);
        queVal.offer(root.val);
        while (!queNode.isEmpty()) {
            TreeNode now = queNode.poll();
            int temp = queVal.poll();
            if (now.left == null && now.right == null) {
                if (temp == sum) {
                    return true;
                }
                continue;
            }
            if (now.left != null) {
                queNode.offer(now.left);
                queVal.offer(now.left.val + temp);
            }
            if (now.right != null) {
                queNode.offer(now.right);
                queVal.offer(now.right.val + temp);
            }
        }
        return false;
    }
}

```

#### 方法二

```java
class Solution {
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) {
            return false;
        }
        Queue<TreeNode> queNode = new LinkedList<TreeNode>();
        Queue<Integer> queVal = new LinkedList<Integer>();
        queNode.offer(root);
        queVal.offer(root.val);
        while (!queNode.isEmpty()) {
            TreeNode now = queNode.poll();
            int temp = queVal.poll();
            if (now.left == null && now.right == null) {
                if (temp == sum) {
                    return true;
                }
                continue;
            }
            if (now.left != null) {
                queNode.offer(now.left);
                queVal.offer(now.left.val + temp);
            }
            if (now.right != null) {
                queNode.offer(now.right);
                queVal.offer(now.right.val + temp);
            }
        }
        return false;
    }
}
```



[看这个这个！！！！](https://leetcode-cn.com/problems/path-sum/solution/lu-jing-zong-he-de-si-chong-jie-fa-dfs-hui-su-bfs-/)



### [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

难度简单301

给定一个头结点为 `head` 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

 

**示例 1：**

```
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```

**示例 2：**

```
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```





#### 方法一：数组

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode[] A = new ListNode[100];
        int t = 0;
        while (head != null) {
            A[t++] = head;
            head = head.next;
        }
        return A[t / 2];
    }
}
```

#### 方法二：单指针法

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        int n = 0;
        ListNode cur = head;
        while (cur != null) {
            ++n;
            cur = cur.next;
        }
        int k = 0;
        cur = head;
        while (k < n / 2) {
            ++k;
            cur = cur.next;
        }
        return cur;
    }
}

```

#### 方法三：快慢指针法

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}
```



[看这个这个！！！](https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/kuai-man-zhi-zhen-zhu-yao-zai-yu-diao-shi-by-liwei/)

#### [19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

难度中等1188

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**进阶：**你能尝试使用一趟扫描实现吗？

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

#### 方法一：计算链表长度

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        int length = getLength(head);
        ListNode cur = dummy;
        for (int i = 1; i < length - n + 1; ++i) {
            cur = cur.next;
        }
        cur.next = cur.next.next;
        ListNode ans = dummy.next;
        return ans;
    }

    public int getLength(ListNode head) {
        int length = 0;
        while (head != null) {
            ++length;
            head = head.next;
        }
        return length;
    }
}
```



#### 方法二：栈

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        Deque<ListNode> stack = new LinkedList<ListNode>();
        ListNode cur = dummy;
        while (cur != null) {
            stack.push(cur);
            cur = cur.next;
        }
        for (int i = 0; i < n; ++i) {
            stack.pop();
        }
        ListNode prev = stack.peek();
        prev.next = prev.next.next;
        ListNode ans = dummy.next;
        return ans;
    }
}

```



#### 方法三：一次遍历

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0, head);
        ListNode first = head;
        ListNode second = dummy;
        for (int i = 0; i < n; ++i) {
            first = first.next;
        }
        while (first != null) {
            first = first.next;
            second = second.next;
        }
        second.next = second.next.next;
        ListNode ans = dummy.next;
        return ans;
    }
}
```

### [106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

难度中等437

根据一棵树的中序遍历与后序遍历构造二叉树。

**注意:**
你可以假设树中没有重复的元素。

例如，给出

```
中序遍历 inorder = [9,3,15,20,7]
后序遍历 postorder = [9,15,7,20,3]
```

返回如下的二叉树：

```
    3
   / \
  9  20
    /  \
   15   7
```

#### 方法一：递归

```java
class Solution {
    int post_idx;
    int[] postorder;
    int[] inorder;
    Map<Integer, Integer> idx_map = new HashMap<Integer, Integer>();

    public TreeNode helper(int in_left, int in_right) {
        // 如果这里没有节点构造二叉树了，就结束
        if (in_left > in_right) {
            return null;
        }

        // 选择 post_idx 位置的元素作为当前子树根节点
        int root_val = postorder[post_idx];
        TreeNode root = new TreeNode(root_val);

        // 根据 root 所在位置分成左右两棵子树
        int index = idx_map.get(root_val);

        // 下标减一
        post_idx--;
        // 构造右子树
        root.right = helper(index + 1, in_right);
        // 构造左子树
        root.left = helper(in_left, index - 1);
        return root;
    }

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        this.postorder = postorder;
        this.inorder = inorder;
        // 从后序遍历的最后一个元素开始
        post_idx = postorder.length - 1;

        // 建立（元素，下标）键值对的哈希表
        int idx = 0;
        for (Integer val : inorder) {
            idx_map.put(val, idx++);
        }
        
        return helper(0, inorder.length - 1);
    }
}
```



#### 方法二：迭代

```java
var buildTree = function(inorder, postorder) {
    if (postorder.length == 0) {
        return null;
    }
    const root = new TreeNode(postorder[postorder.length - 1]);
    const stack = [];
    stack.push(root);
    let inorderIndex = inorder.length - 1;
    for (let i = postorder.length - 2; i >= 0; i--) {
        let postorderVal = postorder[i];
        let node = stack[stack.length - 1];
        if (node.val !== inorder[inorderIndex]) {
            node.right = new TreeNode(postorderVal);
            stack.push(node.right);
        } else {
            while (stack.length && stack[stack.length - 1].val === inorder[inorderIndex]) {
                node = stack.pop();
                inorderIndex--;
            }
            node.left = new TreeNode(postorderVal);
            stack.push(node.left);
        }
    }
    return root;
};

```



[kan这个这个牛逼](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/solution/cong-zhong-xu-yu-hou-xu-bian-li-xu-lie-gou-zao-14/)



### [105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

难度中等839

根据一棵树的前序遍历与中序遍历构造二叉树。

**注意:**
你可以假设树中没有重复的元素。

例如，给出

```
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
```

返回如下的二叉树：

```
    3
   / \
  9  20
    /  \
   15   7
```

#### 方法一：递归

```java
public TreeNode buildTree(int[] preorder, int[] inorder) {
    HashMap<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        map.put(inorder[i], i);
    }
    return buildTreeHelper(preorder, 0, preorder.length, inorder, 0, inorder.length, map);
}

private TreeNode buildTreeHelper(int[] preorder, int p_start, int p_end, int[] inorder, int i_start, int i_end,
                                 HashMap<Integer, Integer> map) {
    if (p_start == p_end) {
        return null;
    }
    int root_val = preorder[p_start];
    TreeNode root = new TreeNode(root_val);
    int i_root_index = map.get(root_val);
    int leftNum = i_root_index - i_start;
    root.left = buildTreeHelper(preorder, p_start + 1, p_start + leftNum + 1, inorder, i_start, i_root_index, map);
    root.right = buildTreeHelper(preorder, p_start + leftNum + 1, p_end, inorder, i_root_index + 1, i_end, map);
    return root;
}
```

#### 方法二： 迭代

```java
public TreeNode buildTree(int[] preorder, int[] inorder) {
    if (preorder.length == 0) {
        return null;
    }
    Stack<TreeNode> roots = new Stack<TreeNode>();
    int pre = 0;
    int in = 0;
    //先序遍历第一个值作为根节点
    TreeNode curRoot = new TreeNode(preorder[pre]);
    TreeNode root = curRoot;
    roots.push(curRoot);
    pre++;
    //遍历前序遍历的数组
    while (pre < preorder.length) {
        //出现了当前节点的值和中序遍历数组的值相等，寻找是谁的右子树
        if (curRoot.val == inorder[in]) {
            //每次进行出栈，实现倒着遍历
            while (!roots.isEmpty() && roots.peek().val == inorder[in]) {
                curRoot = roots.peek();
                roots.pop();
                in++;
            }
            //设为当前的右孩子
            curRoot.right = new TreeNode(preorder[pre]);
            //更新 curRoot
            curRoot = curRoot.right;
            roots.push(curRoot);
            pre++;
        } else {
            //否则的话就一直作为左子树
            curRoot.left = new TreeNode(preorder[pre]);
            curRoot = curRoot.left;
            roots.push(curRoot);
            pre++;
        }
    }
    return root;
}
```



[这个优秀！！！](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--22/)



### [116. 填充每个节点的下一个右侧节点指针](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

难度中等381

给定一个 **完美二叉树** ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 `NULL`。

初始状态下，所有 next 指针都被设置为 `NULL`。

**进阶：**

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

 

**示例：**

![img](https://assets.leetcode.com/uploads/2019/02/14/116_sample.png)

```
输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
```

 

**提示：**

- 树中节点的数量少于 `4096`
- `-1000 <= node.val <= 1000`

####  方法一： 迭代

```java
class Solution {
	public Node connect(Node root) {
		if(root==null) {
			return root;
		}
		LinkedList<Node> queue = new LinkedList<Node>();
		queue.add(root);
		while(queue.size()>0) {
			int size = queue.size();
			//将队列中的元素串联起来
			Node tmp = queue.get(0);
			for(int i=1;i<size;++i) {
				tmp.next = queue.get(i);
				tmp = queue.get(i);
			}
			//遍历队列中的每个元素，将每个元素的左右节点也放入队列中
			for(int i=0;i<size;++i) {
				tmp = queue.remove();
				if(tmp.left!=null) {
					queue.add(tmp.left);
				}
				if(tmp.right!=null) {
					queue.add(tmp.right);
				}
			}
		}
		return root;
	}
}

```

#### 方法二：迭代

```java
class Solution {
	public Node connect(Node root) {
		if(root==null) {
			return root;
		}
		Node pre = root;
		//循环条件是当前节点的left不为空，当只有根节点
		//或所有叶子节点都出串联完后循环就退出了
		while(pre.left!=null) {
			Node tmp = pre;
			while(tmp!=null) {
				//将tmp的左右节点都串联起来
				//注:外层循环已经判断了当前节点的left不为空
				tmp.left.next = tmp.right;
				//下一个不为空说明上一层已经帮我们完成串联了
				if(tmp.next!=null) {
					tmp.right.next = tmp.next.left;
				}
				//继续右边遍历
				tmp = tmp.next;
			}
			//从下一层的最左边开始遍历
			pre = pre.left;
		}
		return root;
	}
}

```

#### 方法三

```javascript
var connect = function(root) {
    if (root === null) {
        return root;
    }
    
    // 初始化队列同时将第一层节点加入队列中，即根节点
    const Q = [root]; 
    
    // 外层的 while 循环迭代的是层数
    while (Q.length > 0) {
        
        // 记录当前队列大小
        const size = Q.length;
        
        // 遍历这一层的所有节点
        for(let i = 0; i < size; i++) {
            
            // 从队首取出元素
            const node = Q.shift();
            
            // 连接
            if (i < size - 1) {
                node.next = Q[0];
            }
            
            // 拓展下一层节点
            if (node.left !== null) {
                Q.push(node.left);
            }
            if (node.right !== null) {
                Q.push(node.right);
            }
        }
    }
    
    // 返回根节点
    return root;
};

```





### [117. 填充每个节点的下一个右侧节点指针 II](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/)

难度中等351

给定一个二叉树

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 `NULL`。

初始状态下，所有 next 指针都被设置为 `NULL`。

 

**进阶：**

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。

 

**示例：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/15/117_sample.png)

```
输入：root = [1,2,3,4,5,null,7]
输出：[1,#,2,3,#,4,5,7,#]
解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
```

 

**提示：**

- 树中的节点数小于 `6000`
- `-100 <= node.val <= 100`

#### 方法一：层次遍历

```js

var connect = function(root) {
    if (root === null) {
        return null;
    }
    const queue = [root];
    while (queue.length) {
        const n = queue.length;
        let last = null;
        for (let i = 1; i <= n; ++i) {
            let f = queue.shift();
            if (f.left !== null) {
                queue.push(f.left);
            }
            if (f.right !== null) {
                queue.push(f.right);
            }
            if (i !== 1) {
                last.next = f;
            }
            last = f;
        }
    }
    return root;
};

```

#### 方法二：使用已建立的 \rm nextnext 指针

```js
let last = null, nextStart = null;
const handle = (p) => {
    if (last !== null) {
        last.next = p;
    } 
    if (nextStart === null) {
        nextStart = p;
    }
    last = p;
}
var connect = function(root) {
    if (root === null) {
        return null;
    }
    let start = root;
    while (start != null) {
        last = null;
        nextStart = null;
        for (let p = start; p !== null; p = p.next) {
            if (p.left !== null) {
                handle(p.left);
            }
            if (p.right !== null) {
                handle(p.right);
            }
        }
        start = nextStart;
    }
    return root;
};

```

#### BFS解决

```java
    public Node connect(Node root) {
        if (root == null)
            return root;
        //cur我们可以把它看做是每一层的链表
        Node cur = root;
        while (cur != null) {
            //遍历当前层的时候，为了方便操作在下一
            //层前面添加一个哑结点（注意这里是访问
            //当前层的节点，然后把下一层的节点串起来）
            Node dummy = new Node(0);
            //pre表示访下一层节点的前一个节点
            Node pre = dummy;
            //然后开始遍历当前层的链表
            while (cur != null) {
                if (cur.left != null) {
                    //如果当前节点的左子节点不为空，就让pre节点
                    //的next指向他，也就是把它串起来
                    pre.next = cur.left;
                    //然后再更新pre
                    pre = pre.next;
                }
                //同理参照左子树
                if (cur.right != null) {
                    pre.next = cur.right;
                    pre = pre.next;
                }
                //继续访问这一行的下一个节点
                cur = cur.next;
            }
            //把下一层串联成一个链表之后，让他赋值给cur，
            //后续继续循环，直到cur为空为止
            cur = dummy.next;
        }
        return root;
    }
```

### [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

难度中等909

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/最近公共祖先/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”

例如，给定如下二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/binarytree.png)

 

**示例 1:**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

**示例 2:**

```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
```

####  方法一：

[大佬的必看！！！](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/solution/shou-hui-tu-jie-gei-chu-dfshe-bfsliang-chong-jie-f/)



### [面试题 02.01. 移除重复节点](https://leetcode-cn.com/problems/remove-duplicate-node-lcci/)

难度简单88

编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。

**示例1:**

```
 输入：[1, 2, 3, 3, 2, 1]
 输出：[1, 2, 3]
```

**示例2:**

```
 输入：[1, 1, 1, 1, 2]
 输出：[1, 2]
```

**提示：**

1. 链表长度在[0, 20000]范围内。
2. 链表元素在[0, 20000]范围内。

**进阶：**

如果不得使用临时缓冲区，该怎么解决？

#### 方法一：哈希表



```java
class Solution {
    public ListNode removeDuplicateNodes(ListNode head) {
        if (head == null) {
            return head;
        }
        Set<Integer> occurred = new HashSet<Integer>();
        occurred.add(head.val);
        ListNode pos = head;
        // 枚举前驱节点
        while (pos.next != null) {
            // 当前待删除节点
            ListNode cur = pos.next;
            if (occurred.add(cur.val)) {
                pos = pos.next;
            } else {
                pos.next = pos.next.next;
            }
        }
        pos.next = null;
        return head;
    }
}
```



#### 方法二：两重循环

```java
class Solution {
    public ListNode removeDuplicateNodes(ListNode head) {
        ListNode ob = head;
        while (ob != null) {
            ListNode oc = ob;
            while (oc.next != null) {
                if (oc.next.val == ob.val) {
                    oc.next = oc.next.next;
                } else {
                    oc = oc.next;
                }
            }
            ob = ob.next;
        }
        return head;
    }
}

```

### [20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

难度简单2119

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

 

**示例 1：**

```
输入：s = "()"
输出：true
```

**示例 2：**

```
输入：s = "()[]{}"
输出：true
```

**示例 3：**

```
输入：s = "(]"
输出：false
```

**示例 4：**

```
输入：s = "([)]"
输出：false
```





**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉树中。



#### 方法一

```java
class Solution {
    private static final Map<Character,Character> map = new HashMap<Character,Character>(){{
        put('{','}'); put('[',']'); put('(',')'); put('?','?');
    }};
    public boolean isValid(String s) {
        if(s.length() > 0 && !map.containsKey(s.charAt(0))) return false;
        LinkedList<Character> stack = new LinkedList<Character>() {{ add('?'); }};
        for(Character c : s.toCharArray()){
            if(map.containsKey(c)) stack.addLast(c);
            else if(map.get(stack.removeLast()) != c) return false;
        }
        return stack.size() == 1;
    }
}
```





### [35. 搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)

难度简单800

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

**示例 1:**

```
输入: [1,3,5,6], 5
输出: 2
```

**示例 2:**

```
输入: [1,3,5,6], 2
输出: 1
```

**示例 3:**

```
输入: [1,3,5,6], 7
输出: 4
```

**示例 4:**

```
输入: [1,3,5,6], 0
输出: 0
```

#### 方法一

```java

public class Solution {

    public int searchInsert(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }
        
        int left = 0;
        // 因为有可能数组的最后一个元素的位置的下一个是我们要找的，故右边界是 len
        int right = len;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 小于 target 的元素一定不是解
            if (nums[mid] < target) {
                // 下一轮搜索的区间是 [mid + 1, right]
                left = mid + 1;
            } else {
              	// 下一轮搜索的区间是 [left, mid]
                right = mid;
            }
        }
        return left;
    }
}

```

#### 方法二

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while(left <= right) {
            int mid = (left + right) / 2;
            if(nums[mid] == target) {
                return mid;
            } else if(nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}
```







[看这个吧~！！！](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)



### [394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

难度中等637

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: `k[encoded_string]`，表示其中方括号内部的 *encoded_string* 正好重复 *k* 次。注意 *k* 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 *k* ，例如不会出现像 `3a` 或 `2[4]` 的输入。

 

**示例 1：**

```
输入：s = "3[a]2[bc]"
输出："aaabcbc"
```

**示例 2：**

```
输入：s = "3[a2[c]]"
输出："accaccacc"
```

**示例 3：**

```
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"
```

**示例 4：**

```
输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
```

#### 方法一

```java
class Solution {
    public String decodeString(String s) {
        StringBuilder res = new StringBuilder();
        int multi = 0;
        LinkedList<Integer> stack_multi = new LinkedList<>();
        LinkedList<String> stack_res = new LinkedList<>();
        for(Character c : s.toCharArray()) {
            if(c == '[') {
                stack_multi.addLast(multi);
                stack_res.addLast(res.toString());
                multi = 0;
                res = new StringBuilder();
            }
            else if(c == ']') {
                StringBuilder tmp = new StringBuilder();
                int cur_multi = stack_multi.removeLast();
                for(int i = 0; i < cur_multi; i++) tmp.append(res);
                res = new StringBuilder(stack_res.removeLast() + tmp);
            }
            else if(c >= '0' && c <= '9') multi = multi * 10 + Integer.parseInt(c + "");
            else res.append(c);
        }
        return res.toString();
    }
}
```

#### 方法二：递归法

```java
class Solution {
    public String decodeString(String s) {
        return dfs(s, 0)[0];
    }
    private String[] dfs(String s, int i) {
        StringBuilder res = new StringBuilder();
        int multi = 0;
        while(i < s.length()) {
            if(s.charAt(i) >= '0' && s.charAt(i) <= '9') 
                multi = multi * 10 + Integer.parseInt(String.valueOf(s.charAt(i))); 
            else if(s.charAt(i) == '[') {
                String[] tmp = dfs(s, i + 1);
                i = Integer.parseInt(tmp[0]);
                while(multi > 0) {
                    res.append(tmp[1]);
                    multi--;
                }
            }
            else if(s.charAt(i) == ']') 
                return new String[] { String.valueOf(i), res.toString() };
            else 
                res.append(String.valueOf(s.charAt(i)));
            i++;
        }
        return new String[] { res.toString() };
    } 
}
```

### [56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

难度中等783

给出一个区间的集合，请合并所有重叠的区间。

 

**示例 1:**

```
输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2:**

```
输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

**注意：**输入类型已于2019年4月15日更改。 请重置默认代码定义以获取新方法签名。

 

**提示：**

- `intervals[i][0] <= intervals[i][1]`

#### 方法一：排序

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) {
            return new int[0][2];
        }
        Arrays.sort(intervals, new Comparator<int[]>() {
            public int compare(int[] interval1, int[] interval2) {
                return interval1[0] - interval2[0];
            }
        });
        List<int[]> merged = new ArrayList<int[]>();
        for (int i = 0; i < intervals.length; ++i) {
            int L = intervals[i][0], R = intervals[i][1];
            if (merged.size() == 0 || merged.get(merged.size() - 1)[1] < L) {
                merged.add(new int[]{L, R});
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], R);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}

```



#### 方法二

```c++
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> ans;
        for (int i = 0; i < intervals.size();) {
            int t = intervals[i][1];
            int j = i + 1;
            while (j < intervals.size() && intervals[j][0] <= t) {
                t = max(t, intervals[j][1]);
                j++;
            }
            ans.push_back({ intervals[i][0], t });
            i = j;
        }
        return ans;
    }
```

### [48. 旋转图像](https://leetcode-cn.com/problems/rotate-image/)

难度中等766

给定一个 *n* × *n* 的二维矩阵表示一个图像。

将图像顺时针旋转 90 度。

**说明：**

你必须在**[原地](https://baike.baidu.com/item/原地算法)**旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要**使用另一个矩阵来旋转图像。

**示例 1:**

```
给定 matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**示例 2:**

```
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```



#### 方法一：使用辅助数组

```javascript

var rotate = function(matrix) {
    const n = matrix.length;
    const matrix_new = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix_new[j][n - i - 1] = matrix[i][j];
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = matrix_new[i][j];
        }
    }
};
```

#### 方法二：原地旋转

```javascript
var rotate = function(matrix) {
    const n = matrix.length;
    for (let i = 0; i < Math.floor(n / 2); ++i) {
        for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
            matrix[j][n - i - 1] = temp;
        }
    }
};
```



#### 方法三：用翻转代替旋转

```java
var rotate = function(matrix) {
    const n = matrix.length;
    // 水平翻转
    for (let i = 0; i < Math.floor(n / 2); i++) {
        for (let j = 0; j < n; j++) {
            [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
        }
    }
    // 主对角线翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
};
```



### [面试题 01.08. 零矩阵](https://leetcode-cn.com/problems/zero-matrix-lcci/)

难度中等22

编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。

 

**示例 1：**

```
输入：
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出：
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

**示例 2：**

```
输入：
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出：
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

#### 方法一

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        boolean isFirstRowHaveZero = false;
        boolean isFirstColHaveZero = false;
        for(int i = 0; i < matrix.length; i++) {
            if (matrix[i][0] == 0) {
                isFirstColHaveZero = true;
            }
        }

        for(int j = 0; j < matrix[0].length; j++) {
            if (matrix[0][j] == 0) {
                isFirstRowHaveZero = true;
            }
        }

        for(int i = 1; i < matrix.length; i++) {
            for(int j = 1; j < matrix[i].length; j++) {
                if (matrix[i][j] == 0) {
                    matrix[0][j] = 0;
                    matrix[i][0] = 0;
                } 
            }
        }
        
        for(int i = 1; i < matrix.length; i++) {
            for(int j = 1; j < matrix[i].length; j++) {
                if (matrix[0][j] == 0 || matrix[i][0] == 0) {
                    matrix[i][j] = 0;
                } 
            }
        }

        for(int i = 0; i < matrix.length; i++) {
            if (isFirstColHaveZero) {
                matrix[i][0] = 0;
            }
        }

        for(int j = 0; j < matrix[0].length; j++) {
            if (isFirstRowHaveZero) {
                matrix[0][j] = 0;
            }
        }

    }
}
```

### [739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)

难度中等622

请根据每日 `气温` 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 `0` 来代替。

例如，给定一个列表 `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`，你的输出应该是 `[1, 1, 4, 2, 1, 1, 0, 0]`。

**提示：**`气温` 列表长度的范围是 `[1, 30000]`。每个气温的值的均为华氏度，都是在 `[30, 100]` 范围内的整数。

#### 方法一：暴力

```java
class Solution {
    public int[] dailyTemperatures(int[] T) {
        int length = T.length;
        int[] ans = new int[length];
        int[] next = new int[101];
        Arrays.fill(next, Integer.MAX_VALUE);
        for (int i = length - 1; i >= 0; --i) {
            int warmerIndex = Integer.MAX_VALUE;
            for (int t = T[i] + 1; t <= 100; ++t) {
                if (next[t] < warmerIndex) {
                    warmerIndex = next[t];
                }
            }
            if (warmerIndex < Integer.MAX_VALUE) {
                ans[i] = warmerIndex - i;
            }
            next[T[i]] = i;
        }
        return ans;
    }
}
```

#### 方法二：单调栈

```java
class Solution {
    public int[] dailyTemperatures(int[] T) {
        int length = T.length;
        int[] ans = new int[length];
        Deque<Integer> stack = new LinkedList<Integer>();
        for (int i = 0; i < length; i++) {
            int temperature = T[i];
            while (!stack.isEmpty() && temperature > T[stack.peek()]) {
                int prevIndex = stack.pop();
                ans[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        return ans;
    }
}
```

### [150. 逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

难度中等230

根据[ 逆波兰表示法](https://baike.baidu.com/item/逆波兰式/128437)，求表达式的值。

有效的运算符包括 `+`, `-`, `*`, `/` 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

 

**说明：**

- 整数除法只保留整数部分。
- 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。

 

**示例 1：**

```
输入: ["2", "1", "+", "3", "*"]
输出: 9
解释: 该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
```

**示例 2：**

```
输入: ["4", "13", "5", "/", "+"]
输出: 6
解释: 该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
```

**示例 3：**

```
输入: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
输出: 22
解释: 
该算式转化为常见的中缀算术表达式为：
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```







### [200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/)

难度中等959

给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

 

**示例 1：**

```
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
```

**示例 2：**

```
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
```





### [724. 寻找数组的中心索引](https://leetcode-cn.com/problems/find-pivot-index/)

难度简单245

给定一个整数类型的数组 `nums`，请编写一个能够返回数组 **“中心索引”** 的方法。

我们是这样定义数组 **中心索引** 的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

 

**示例 1：**

```
输入：
nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：
索引 3 (nums[3] = 6) 的左侧数之和 (1 + 7 + 3 = 11)，与右侧数之和 (5 + 6 = 11) 相等。
同时, 3 也是第一个符合要求的中心索引。
```

**示例 2：**

```
输入：
nums = [1, 2, 3]
输出：-1
解释：
数组中不存在满足此条件的中心索引。
```

 

### [133. 克隆图](https://leetcode-cn.com/problems/clone-graph/)

难度中等319

给你无向 **[连通](https://baike.baidu.com/item/连通图/6460995?fr=aladdin)** 图中一个节点的引用，请你返回该图的 [**深拷贝**](https://baike.baidu.com/item/深拷贝/22785317?fr=aladdin)（克隆）。

图中的每个节点都包含它的值 `val`（`int`） 和其邻居的列表（`list[Node]`）。

```
class Node {
    public int val;
    public List<Node> neighbors;
}
```

 

**测试用例格式：**

简单起见，每个节点的值都和它的索引相同。例如，第一个节点值为 1（`val = 1`），第二个节点值为 2（`val = 2`），以此类推。该图在测试用例中使用邻接列表表示。

**邻接列表** 是用于表示有限图的无序列表的集合。每个列表都描述了图中节点的邻居集。

给定节点将始终是图中的第一个节点（值为 1）。你必须将 **给定节点的拷贝** 作为对克隆图的引用返回。

 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/01/133_clone_graph_question.png)

```
输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
输出：[[2,4],[1,3],[2,4],[1,3]]
解释：
图中有 4 个节点。
节点 1 的值是 1，它有两个邻居：节点 2 和 4 。
节点 2 的值是 2，它有两个邻居：节点 1 和 3 。
节点 3 的值是 3，它有两个邻居：节点 2 和 4 。
节点 4 的值是 4，它有两个邻居：节点 1 和 3 。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/01/graph.png)

```
输入：adjList = [[]]
输出：[[]]
解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
```

**示例 3：**

```
输入：adjList = []
输出：[]
解释：这个图是空的，它不含任何节点。
```

**示例 4：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/01/graph-1.png)

```
输入：adjList = [[2],[1]]
输出：[[2],[1]]
```

 

**提示：**

1. 节点数不超过 100 。
2. 每个节点值 `Node.val` 都是唯一的，`1 <= Node.val <= 100`。
3. 无向图是一个[简单图](https://baike.baidu.com/item/简单图/1680528?fr=aladdin)，这意味着图中没有重复的边，也没有自环。
4. 由于图是无向的，如果节点 *p* 是节点 *q* 的邻居，那么节点 *q* 也必须是节点 *p* 的邻居。
5. 图是连通图，你可以从给定节点访问到所有节点。









来源：力扣（`LeetCode`）
链接：https://leetcode-cn.com/problems/insertion-sort-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



