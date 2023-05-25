#  `Node.js` 如何查看内存泄漏

内存管理问题在计算机领域中一直备受关注。在计算机中运行的每个软件，都会被分配到计算机有限内存的一小部分。这些内存必须得认真管理，在合适的时间进行分配或者释放。

`Nodejs` 可以通过其高效的自动垃圾回收机制，来处理内存管理的繁琐任务，从而将开发人员解放出来，从事其他任务。虽然说 `Nodejs` 已经帮助开发者解决了内存管理的问题，但是在面对大型应用开发的过程中，对于开发者理解 `V8` 和 `Nodejs` 中的内存管理机制仍然非常重要。

这片文章主要介绍了如何在堆中分配和释放内存，并且帮助你知道如何最小化堆分配和防止内存泄漏。

## `Nodejs` 中的堆分配

`JavaScript` 和 `Node.js` 为你抽象了很多东西，并且在后台完成了大部分繁重的工作。

我们知道，当一段代码被执行的时候，代码中的变量和对象会被存储在栈内存或者堆内存中，`JavaScript` 代码会被存储在将要被执行的执行上下文中。

`ECMAScript` 规范本身并没有规定如何分配和管理内存。这是一个依赖于 `JavaScript` 引擎和底层系统架构的实现细节。深入理解引擎是如何处理变量的已经超出了本文的范围，但如果你想了解更多关于`V8`是如何做到这一点的，请参考文章[`JavaScript内存模型揭秘`](https://www.zhenghao.io/posts/javascript-memory)和[`数据是如何存储在V8 JS引擎内存中的？`](https://blog.dashlane.com/how-is-data-stored-in-v8-js-engine-memory/)。

## 为什么在 `Node.js` 中高效的堆内存使用很重要?

存储在堆中的内存变量将一直存在，除非它被垃圾收集器删除或释放。堆内存是一大块连续的内存块，即使再被分配和释放之后，仍然会保持这种状态。

不幸的是，由于堆内存收集和释放方式，内存可能会被浪费，从而导致泄漏。

`V8` 使用的是分代垃圾收集机制，即它将对象划分为不同的代(新生代和老生代)。代空间又会被划分为不同的区——例如新生代由新空间组成，老生代会被划分为旧空间、映射空间和大对象空间。新对象最初被分配到新生代空间中，当新生代空间使用完时，垃圾收集器将执行清理机制以释放空间。在一次 `GC` 运行中幸存下来的对象会被复制到新生代的中间中间中，在第二轮运行中幸存下来的对象会被移动到老生代中。

由于运行程序先进行内存收集，占用了宝贵的虚拟内存资源，因此当不再需要内存时，程序必须释放内存，这就是内存释放。

此外，如果内存被释放了（不管先前它在堆中的哪个位置释放），堆内存将被合并为一个连续的内存块形式。由于堆内存复杂性的增加，在这里存储会导致更高的性能开销（但使得后续的存储有了更大的灵活性）。

虽然 `Nodejs` 拥有高效的垃圾回收机制，但是堆内存的低效使用可能导致内存泄漏。应用程序可能会占用太多的内存，甚至崩溃。

## Nodejs 堆内存泄漏的原因

垃圾回收器会寻找并释放孤立的内存空间，但有时它可能无法跟踪每一块内存。这可能导致不必要的负载增加，特别是对于大型应用程序。稍后我们将详细讨论 `Nodejs` 中的垃圾收集器是如何工作的。

导致内存泄漏的一些最常见的原因包括：

- 多重引用
- 全局变量
- 闭包
- 计时器
- 事件

使用多个变量指针保持对一个对象的引用是非常常见的操作。虽然这对你来说非常方便，但如果对对象的其中一个引用被垃圾回收器收集，而其他引用没有被收集，则也可能导致内存泄漏。

在 `Node.js` 和 `JavaScript` 应用程序中，被忘记清理的计时器和回调函数也是导致内存泄漏的两个常见原因。被绑定到计时器的对象直到超时才会被垃圾收集。如果计时器一直运行，则被引用的对象将永远不会被垃圾回收器收集。即使没有变量指针引用对象，也会发生这种情况，因此将在堆中造成内存泄漏。

思考下示例代码：

```javascript
const language = () => {
  console.log("Javascript");】
  // 递归自身
  setTimeout(() => language(), 1000);
}
```

上面这段代码将会被一直运行，并且永远不会被垃圾回收器回收

## 如何发现 `Nodejs` 中的内存泄漏

这有几个工具可以用于检测和调试 `Nodejs` 中的内存泄漏，包括 `Chrome DevTools`，`Node` 的进程。`memoryUsage API` 和 `AppSignal` 的垃圾收集器看板。

### 使用 Chrome DevTools

`Chrome DevTools`可能是最简单的工具之一。要启动调试器，需要以 `inspect` 模式启动 `Node`。运行`node --inspect`来执行此操作。

更具体地说，如果你的 `Node` 的入口是 `app.js`，你需要运行 `node --inspect app.js` 来调试Node 应用程序。然后，打开 `Chromium` 浏览器，进入 `chrome://inspect`。你也可以在 Edge://inspect 打开检查器页面。在检查器页面，你应该看到这样一个页面:

![](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fchrome-inspect-devices.png&w=3840&q=75)

注意，你正在尝试调试的 `Node` 应用程序出现在检查器页面的底部。单击 `inspect` 打开调试器。调试器有两个重要的选项卡—— `Memory` 和 `Profiler` ——但在本讨论中，我们将重点关注 `Memory` 选项卡。

![](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fnode-debugger.png&w=3840&q=75)

使用 `Chrome` 调试器查找内存泄漏最简单的方法是使用`堆快照`。快照可以帮助你检查一些变量或检查它们的保留区大小。

你也可以通过比较多张快照发现内存泄漏。对于一个实力来说，你可以在内存泄漏之前和之后分别保存一张快照，然后比较两者。为了获取快照，你可以通过在 **`Heap snapshot`** 上点击一下，然后点击 **`Take snapshot`* 按钮。这可能需要一些时间，这取决于应用程序的 `Total JS` 堆大小。你也可以通过点击 `DevTool` 底部的 `load` 按钮来加载现有的快照。

当你有了两张或者多张快照时，你就可以非常容易的比较堆分配，已找到内存泄漏的原因。你可以通过以下方式查看快照：

- **`Summary`**：根据构造函数名称对 `Node` 应用程序中的对象进行分组展示

- **`Comparison`**： 显示两张快照之间的区别

- **`Containment`**：允许你查看堆内并分析全局名称空间中引用的对象

- **`Statistics`**：

  ![](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fchrome-debugger-views.png&w=3840&q=75)

在 `DevTools` 堆分析器中有两列很突出——即 **`Shallow Size`** 和 **`Retained Size`**。

 **`Shallow Size`** 表示的是对象自身在内存中的大小。这个内存大小对于大多数对象来说并不大，但数组和字符串类型除外。另一方面， **`Retained Size`** 是党有问题的对象和依赖对象被释放或从根节点无法访问时释放的内存大小。

`Chrome DevTools` 并不是获取堆快照的唯一方法。如果你使用的是 `nodejs` 12.0 或更高版本，你还可以通过运行  `node --heapsnapshot-signal` 命令：

```js
node --heapsnapshot-signal=SIGUSR2 app.js
```

虽然可以使用任何标志，但建议使用用户定义的信号`SIGUSR1`或`SIGUSR2`。

如果你从正在服务端运行的应用中获取一张对快照，则可以使用 `V8` 包中的 `writeHeapSnapshot` 函数：

```javascript
require("v8").writeHeapSnapshot();
```

这个方法要求 `Nodejs` 的版本高于 11.13。在早期的版本中，你可以使用相关的包来实现。

使用 `Chrome DevTools` 获取堆快照并不是调试内存问题的唯一方法。你也可以使用`Allocation instrumentation on timeline` 跟踪每个堆分配的情况。

内存分配时间轴显示了随时间变化的测量内存分配的情况。要启用此功能，需要先启动分析器(`Profiler`)，然后运行应用程序示例以开始调试内存问题。如果你希望记录长时间运行的内存分配操作，并想要更小的性能开销，那么最好的选择是分配抽样方法。

### 通过 `Node` 的 `process.memoryUsage` API

你也可以使用 `Node` 的 `process.memoryUsage` API来观察内存使用情况。运行 `process.memoryUsage`，你可以访问以下内容：

- **`rss`**：已分配的内存量
- **`heapTotal`**：已分配堆的总大小
- **`heapUsed`**：当执行进程时被使用内存总量
- **`arrayBuffers`**：为 Buffer 实例分配的内存大小

### 使用 `AppSignal` 的垃圾收集器看板

为了可视化堆的变化情况，`AppSignal` 提供了一个方便的[垃圾收集看板](https://www.appsignal.com/nodejs/express-js-performance-monitoring)。当你将 `Node.js` 应用连接到`AppSignal` 时，这个看板会自动为你生成!

看看这个例子，在“`V8 Heap Statistics`”图表中，你可以清楚地看到内存使用的峰值:

![](https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-09%2Fheap-graph.png&w=3840&q=75)

如果看板中中的数据出现一个稳定增长的趋势，这意味着你的代码中或者依赖中存在内存泄漏的情况。

[了解更多关于 Node.js 的AppSignal。](https://www.appsignal.com/nodejs)

## 垃圾回收机制工作原理

如果你知道如何发现内存泄漏，但如何修复它们？我们可能很快就知道。但是首先重要的是理解 `Nodejs` 和 `V8` 是如何进行垃圾收集的。

垃圾回收机制会在不需要的时候释放内存。为了更高效的工作，垃圾回收算法必须正确的定义和识别不需要再内存中继续存储的内容。

在引用计数 `GC` 算法中，如果堆中的对象在堆栈中不再有引用，则该对象将被垃圾收集。该算法通过计数引用来工作——因此，如果引用计数为零，则对象将进行垃圾收集。尽管这个算法大多数时候都有效，但它**在处理循环引用的情况时却失效**了。

看一下代码示例：

```javascript
let data = {};
data.el = data;
 
let obj1 = {};
let obj2 = {};
obj1.a = obj2;
obj2.a = obj1;
```

具有循环引用的对象永远不会被清除作用域或被垃圾回收器回收，即使不再需要或使用它们。这会形成内存泄漏，并使应用程序效率低下。值得庆幸的是，`Node.js` 不再使用这种算法进行垃圾回收。

`JavaScript` 中的最上层对象是一个全局对象。在浏览器中，是 `window` 对象，但在 `Nodejs` 中，是 `global` 对象。该算法比引用计数算法更高效，并解决了循环引用的问题。

考虑到上面的例子，虽然 `obj1` 和 obj2 `仍然`存在循环引用，但如果它们不再从顶级对象可访问(不再需要)，它们将被垃圾收集。

这种算法，通常称为 `mark and sweep` (标记清除算法)回收算法，非常有用。但是，你必须小心并显式地使一个对象从根节点不可访问，以确保它被垃圾收集。

## 修复 Nodejs App 中的内存泄漏

这有一些方法可以提高内存使用率并避免内存泄漏。

### 避免全局变量

全局变量包括使用 `var` 关键字声明的变量、`this` 关键字声明的变量和未使用关键字声明的变量。

我们已经偶然声明的全局变量(以及任何其他形式的全局变量)会导致内存泄漏。它们总是可以从全局对象访问，因此除非显式地设置为 `null`，否则不能被垃圾收集。

考虑下面的例子:

```javascript
function variables() {
  this.a = "Variable one";
  var b = "Variable two";
  c = "Variable three";
}
```

这三个变量都是全局变量。为了避免使用全局变量，可以考虑在文件顶部添加 `use strict` 指令来切换`strict` 模式。

### 使用 `JSON.parse`

`JSON` 的语法比 `JavaScript` 简单得多，因此它比 `JavaScript` 对象更容易解析。

事实上，如果你使用一个大型 `JavaScript` 对象，通过将其转化为字符串形式，使用时解析为 `JSON`，那么你可以在 `V8` 和`Chrome` 中将性能提高 1.7 倍。

在其他 `JavaScript` 引擎(如`Safari`)中，性能可能会更好。在 `Webpack` 中使用这种优化方法来提高前端应用程序的性能。

例如，不使用以下 `JavaScript` 对象:

```js
const Person = { name: "Samuel", age: 25, language: "English" };
```

更有效的方法是将它们进行字符串化，然后将其解析为`JSON`。

```javascript
const Person = JSON.parse('{"name":"Samuel","age":25,"language":"English"}');
```

### 将大数据处理拆分为块并创建子进程

你获取在实际业务中会当处理大型数据时，遇到一些奇观的内存溢出的问题，例如大的 `CSV` 文件。当然，你可以通过扩展你的应用内存上限去处理任务，但是最好的方法是通过将大块数据分割为多个小块（`chunks`）。

在一些情况下，在多核机器上扩展 `Node.js` 应用程序可能会有所帮助。这涉及到将应用程序分离为主进程和工作进程。`worker` 处理繁重的逻辑，而 `master` 控制 `worker` 并在内存耗尽时重新启动它们。

### 有效使用计时器

我们创建的计时器可能会造成内存泄漏。为了提高堆内存管理，确保你的计时器不会永远运行。

特别是，使用 `setInterval` 创建计时器时，当不再需要计时器时调用 `clearInterval` 清除计时器是至关重要的。

当你不再需要使用 `setTimeout` 或 `setimmediation` 创建计时器时，调用 `clearTimeout` 或`clearImmediate` 也是一个很好的实践。

```javascript
const timeout = setTimeout(() => {
  console.log("timeout");
}, 1500);
 
const immediate = setImmediate(() => {
  console.log("immediate");
});
 
const interval = setInterval(() => {
  console.log("interval");
}, 500);
 
clearTimeout(timeout);
clearImmediate(immediate);
clearInterval(interval);
```

### 移除闭包中不在需要的变量

在 `JavaScript` 中，闭包是一个常见概念。例如存在函数嵌套或者回调函数。如果在函数中使用了一个变量，当函数返回时，它将被标记为垃圾收集，但闭包可不是这样的。

代码示例：

```javascript
const func = () => {
  let Person1 = { name: "Samuel", age: 25, language: "English" };
  let Person2 = { name: "Den", age: 23, language: "Dutch" };
 
  return () => Person2;
};
```

上面函数会一直引用父级作用域并将每个变量保存在作用域中。换句话说，虽然你仅仅使用了 **`Person2`**，但 **`Person1`** 和 **`Person2`** 都被保存在作用域中。

这会消耗更多内存，并造成内存泄漏。为此，在面临上面这种情况时，你最好仅声明你需要的，将不需要的重置为 `null`。

例如：

```javascript
const func = () => {
  let Person1 = { name: "Samuel", age: 25, language: "English" };
  let Person2 = { name: "Den", age: 23, language: "Dutch" };
  Person1 = null;
  return () => Person2;
};
```

### 取消订阅观察者和 Event Emitters

具有较长生命周期的观察器和事件发射器可能是内存泄漏的来源，特别是如果你在不再需要它们时没有取消订阅的话。

代码示例：

```javascript
const EventEmitter = require("events").EventEmitter;
const emitter = new EventEmitter();
 
const bigObject = {}; //Some big object
const listener = () => {
  doSomethingWith(bigObject);
};
emitter.on("event1", listener);
```

在这里，我们保留 `bigObject` 的内存，直到侦听器从发射器中释放，或者发射器被垃圾收集。为了解决这个问题，我们需要调用 `removeEventListener` 从发射器中释放监听器。

```javascript
emitter.removeEventListener("event1", listener);
```

当连接到发射器的事件侦听器超过 10 个时，也可能发生内存泄漏。大多数情况下，你可以通过编写更高效的代码来解决这个问题。

但是，在某些情况下，你可能需要显式地设置最大事件侦听器。

例如:

```javascript
emitter.setMaxListeners(n);
```

## 总结

在这篇文章中，我们探索了如何最小化你的堆和检测 `Node.js` 中的内存泄漏。

我们首先研究了 `Node` 中的堆分配，包括堆栈和堆的工作方式。然后，我们考虑了跟踪内存使用情况和内存泄漏的原因的重要性。

接下来，我们看到了如何使用 `Chrome DevTools ,` `Node` 的进程来查找内存泄漏。`memoryUsage` API和 `AppSignal` 的垃圾收集可视化看板。

最后，我们发现了垃圾收集是如何工作的，并分享了一些修复应用程序内存泄漏的方法。

像任何其他编程语言一样，内存管理在 `JavaScript` 和 `Node.js` 中非常重要。我希望这篇介绍对你有用。编码快乐!

> 看到这里如果你还感觉对 `Nodejs` 中的垃圾回收机制的了解意犹未尽的话，笔者推荐各位朋友去看看扑灵大佬的 《深入浅出 `Nodejs`》

**引用**

- [Memory Management - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [Node.js Memory Limits - What You Should Know](https://blog.appsignal.com/2021/12/08/nodejs-memory-limits-what-you-should-know)
- [The Observer Pattern in Node.js](https://apdoelsaed.hashnode.dev/the-observer-pattern)
- [Timers in Node.js](https://nodejs.org/en/docs/guides/timers-in-node/)
- [The cost of JavaScript in 2019](https://v8.dev/blog/cost-of-javascript-2019#json)
- [Debugging - Getting Started](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [V8 Documentation](https://v8.dev/docs)
- [Notes and resources related to V8](https://github.com/thlorenz/v8-perf)

