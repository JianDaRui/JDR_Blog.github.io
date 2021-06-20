## 栈

#### 基本特征

- 栈是一种先入后出的有序列表
- 限制线性表中元素的插入和删除只能在线性表的同一端进行的一种特俗线性表，允许插入和删除的一端，为变化的一端，称为栈顶，联一端为固定的一端，称为栈底
- 根据栈的定义可知，最先放入栈中的元素在栈底，最后放入的元素在栈顶，而删除元素刚好相反

- 入栈 push 出栈 pop

#### 应用场景

- 子程序的调用
- 处理递归调用
- 表达式的转换
- 二叉树的遍历
- 图形的深度优先搜索法



栈的一个实际需求

求表达式的值





#### 栈的代码实现

##### 思路分析

1. 使用数组来模拟栈
2. 定义一个top来表示栈顶，初始化为-1
3. 入栈的操作，当有数组加入到栈时，top++；stack[top] = data
4. 出栈的操作，int value = stack[top];top--;return value

```java
class ArrayStack {
    private int maxSize;
    private int[] stack;
    private int top = -1;
    
    public ArrayStack(int maxSize) {
		this.maxSize = maxSize;
        stack = new int[this.maxSize]
    }
    // 栈满
    public isFull() {
        return this.top == this.maxSize -1
	}
    // 栈空
    public isEmpty (){
        return this.top == -1
	}
    // 入栈-push
    public push() {
        
    }
    // 出栈 pop
    public pop() {
		
    }
    // 遍历->从栈顶开始遍历数据
    public list() {
        for(let i=top;i>0;i--){

        }
    }
}
```

```javascript

```

// 用链表模拟栈



// 使用栈完成一个表达式的结果 ：7 * 2 * 2 - 5 +1 - 5 +3 - 4 = ？

// 前缀、中缀、后缀表达式(逆波兰表达式)

//  中缀表达式转后缀表达式思路步骤分析

