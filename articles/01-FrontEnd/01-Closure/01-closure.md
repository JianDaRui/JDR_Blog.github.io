- ![我老婆](https://imgkr.cn-bj.ufileos.com/ae6286a9-fcd3-406e-8333-d1ac8a7d6cc7.jpg)

  在面试过程中，各位童鞋经常会被问道这样的问题："请描述下你对闭包的理解"，或者在面试烤卷中会有关于闭包的选择、填空题。如果是前者，大可一句带过："闭包就是一个函数有权访问另一个函数作用域中的变量"。如果是后者，那我们拿起笔的那只小爪爪可能会有一丝颤抖~~~（我对闭包真的熟悉吗？）。
  > PS: 面试中的闭包相关知识点总是喜欢结合Javascript作用域、声明提前、事件循环、this一起进行！

  <img src="https://imgkr.cn-bj.ufileos.com/cbf79904-4051-438a-b2ea-c41c74190436.jpg" height="300px">

  为了能让大家在再次遇到有关闭包的问题时，能做到"心不虚，手不抖，LZ跟着感觉走"。所以接下来，我要为大家表演一个"我吹闭包，如吹大乌苏"。走起！！！

  ![](https://imgkr.cn-bj.ufileos.com/6d6ce491-6925-43be-a51b-e3c52f282520.gif)

  开场白：请各位大声告诉我下面的代码打印了什么？为什么？

  ```javascript
  function daRio() {
    let name = "剑大瑞"
    let callMe = function(bilibili) {
      return bilibili + name
    }
    return callMe
  }
  
  daRio()("帅哥") 
  ```


  先看代码，我们在上面的代码中做了哪些事情？

  - 在`daRio`中分别**创建**了一个变量name,一个匿名函数callMe
  - 在匿名函数中 return 一个 bilibili (callMe 参数)+ name(daRio函数**作用域**中的变量name)
  - 将callMe返回
  - 调用daRio，并传入参数

  ## 正戏：

  ### 创建变量时发生了什么？

  当JavaScript引擎在执行代码之前会经历三个步骤：

  分词/词法分析——》解析/语法分析——》代码生成

  最终结果代码会转化为一组机器指令，紧接着开始执行。在上面这个过程中其实有三个不同的角色相互配合，分别是Javascript引擎、编译器、作用域。

  - Javascript负责整个Javascript代码的编译及执行

  - 编译器负责进行语法分析及代码生成

  - 作用域根据一套非常严格的家规（***规则***）收集并维护变量一系列的查询，确定谁有权限访问谁。

  ![图解](https://imgkr.cn-bj.ufileos.com/39c321c0-8dcc-4522-b122-98332514e4b3.jpg)


  ### 扒一扒：作用域

  作用域的查询规则主要有两种工作模型，一种是**词法作用域**，遵循词法作用域的查询模型关注的是标识符定义的位置，比如Javascript.另一种是**动态作用域**，遵循动态作用域的查询模型关注的是函数从何处调用，其作用域链是基于运行时的调用栈的，比如Base、Perl。

  当我们看到 let name = "剑大瑞" 时，JS引擎会分为两步执行，一步由编译器进行编译时处理，一步由引擎在运行时处理，

  - 在编译器处理时会首先询问作用域是否有一个name的变量存在，如果有，则编译器会忽略该声明，继续编译，否则作用域会创建一个新的变量，并命名为name。
  - 接着由Javascript引擎执行name = "剑大瑞"操作，在执行过程中引擎会询问作用域，当前作用域中是否有name变量存在，如果有则进行赋值操作，如果没有，引擎会继续进行查找操作。如果最终没有找到，引擎就会抛出一个异常！

  在上面的代码中

  - 声明并创建daRio
  - 声明并创建name
  - 声明并创建callMe
  - 传参

  都是在进行下面这个操作：

  > 首先编译器会在当前作用域中声明一个变量（如果之前没有声明过），然后在运行在时引擎会在作用域中查找该变量，如果能找到就对变量进行赋值。

  ![图解](https://imgkr.cn-bj.ufileos.com/888a2c43-f0f0-4b75-9386-0bb9c26e6b7e.jpg)


  ### 捋一捋JS引擎继续查找的操作：作用域链

  前面说到当引擎在询问当前作用域中是否存在变量时，如果没有找到当前变量则会继续查找，如果找到就停止，没有就抛错。其实这一过程这就是我们所说的作用域链查找。

  每当我们创建一个函数时，都会生成一个**函数作用域**，而这个函数作用域中就会保存当前函数参数和局部变量，如果存在作用域嵌套的话还会有一个作用域链指针，指向包裹该函数的包含环境。

  这个过程是通过层层嵌套的作用域链最终找到我们的目标变量，直至我们的全局环境（在浏览器中即windows）。并且作用域链直接保证了执行环境有权访问的所有变量、函数的有序访问。

  ![图解](https://imgkr.cn-bj.ufileos.com/6263ca24-f892-473f-97cc-38c9c8e9bcc6.png)

  通过这张图片我们可以看到在callMe函数中存在一个[[Scopes]]属性，当然我们不能通过callMe.Scopes访问到他，但是我们实实在在使用了他，这里面保存了两个对象指针一个是Closure，一个Global。当我们的Js引擎在执行过程中发现在callMe作用域中没有找到变量name，就会沿着Scopes去查找，如果通过Closure找到则停止（即使Global中还存在同一个变量name）。这就是作用域链为我们callMe函数所提供的变量访问权限！至此我们也就明白了为什么我们可以在callMe中访问到daRio中的name。
  ![图解](https://imgkr.cn-bj.ufileos.com/0c34308e-0d53-48f9-a944-c1004b109ea9.jpg)

  ### 闭包
  ![](https://imgkr.cn-bj.ufileos.com/efe3a75c-f415-4d6a-87c7-27b57423fd36.jpg)

  文章写到这里，我已经感觉我的台词已经用完了，闭包已经没得解释了~~~，通过上面的内容我们已经把闭包最为本质的东西扒完了。不过还是要一句话总结下闭包的原理：

  > 其实闭包就是基于JavaScript的**词法作用域**，当嵌套函数在外部环境执行的过程中通过**作用域链**访问到包含它的函数作用域中变量所形成的一种现象。并且由于嵌套函数存在对包含函数变量引用的原因，导致外部作用域中的变量无法及时销毁，会占用一定的内。如果闭包过多，则会影响程序性能。
  ### 用途

  * 模块化

  ```js
  let daRio = (function() {
    	let myAttr = {
            name: "剑大瑞"
            gender: "man",
            age: 18,
            height: 180,
            weChat: 185****0350
        }
        
      let callMe = function(bilibili) {
    		    return bilibili + myAttr.name
      }
      let introduceMe = function() {
    		    return  `Hi sweetie, my name is ${myAttr.name}, I\`m  ${myAttr.age} years old and  ${myAttr.height} , this\`s my weChat ${myAttr.weChat} `
      }
        
      return {
        callMe,
        introduceMe
    	}
    })()
    
    daRio.callMe("帅哥") 
    daRio.introduceMe()
  ```

    通过创建函数作用域 + 利用闭包的特点，我们可以实现简单的模块化

  * 柯里化 Currying

    通过Js函数柯里化，可以实现函数参数的缓存效果。在日常的开发任务中我们回经常使用到这项技术，比如bind的实现，React中的高阶组件等等。

  ```js
  function youInfo(gender) {
    let style 
    if(gender) {
        style = "小姐姐"
    } else {
        style = "小锅锅"
    }
    return function(name) {
    		return style + name
    }
  }
  let me = youInfo(1)
  console.log(me("剑大瑞")) // 打印了什么？
  ```

  - 经典面试题

    - [改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。](https://muyiy.cn/question/program/31.html)

  ```js
  for (var i = 0; i< 10; i++){
    setTimeout(() => {
      	console.log(i);
    }, 1000)
  }
  ```
  PS:这道题涉及到JS的异步事件，如果吃透，对于理解JS的**事件循环机制**及异步非常有帮助哦~

    - [请写出如下代码的打印结果](https://muyiy.cn/question/js/108.html)

  ```js
   var name = 'Tom';】【【
  (function() {
      if (typeof name == 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
      } else {
        console.log('Hello ' + name);
      }
  })();
  ```
  PS:这道题涉及到Javascript的变量提升及函数作用域，请先分辨出它有没有产生闭包呢？为什么？可以在评论区留下答案哈
  - [下面的题目打印结果是什么，如果想输出1，2，3怎么实现？]([https://muyiy.cn/blog/2/2.3.html#%E9%97%AD%E5%8C%85%E9%9D%A2%E8%AF%95%E9%A2%98%E8%A7%A3](https://muyiy.cn/blog/2/2.3.html#闭包面试题解))

  ```js
      var data = [];
      
      for (var i = 0; i < 3; i++) {
        data[i] = function () {
          console.log(i);
        };
      }
      
      data[0]();	
      data[1]();
      data[2]();	
  ```

  节目的最后，给大家留个问题：函数可以通过作用域链访问到上层甚至上上层的变量，但是为什么当闭包存在时，使用this会出错呢？

  关于"闭包"的这杯酒我是吹完了，各位呢？
  <img src="https://imgkr.cn-bj.ufileos.com/41680549-6bb9-419f-891e-75b6cd8bf217.jpg" height="300px"/>

  最后记得：别馋我老婆！
  ![凶你](https://imgkr.cn-bj.ufileos.com/01e26e94-5509-4a99-9ee8-272503f14854.jpg)

  参考文献：
  - 《Javascript权威指南》
  - 《Javascript高级程序设计》
  - 《你不知道的Javascript》上卷
  - 《MDN --- 闭包》
  - 面试题引用---木易杨前端进阶每日一题