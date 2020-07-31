# JavaScript 深入浅出之类型转换

在日常开发过程或者面试中我们都会遇到有关与`Javascript`类型转换的问题。而且说到类型转换，`Javascript`的类型转换总是让人感觉挺“暧昧”，让我们一度搞不清楚是true是false，甚至《`Javascript`语言精粹》的作者Douglas Crockford 直接将`Javascript`中的类型转换归为糟粕、鸡肋（PS：据说作者在日常开发中也经常使用到`Javascript`这一特性，看来万事逃不过真香定律啊）。今天就让我们一起彻底搞清楚`Javascript`中的类型转换问题，结束这种“暧昧”关系。

![](D:\Study\JDR_Blog\articles\02-类型转换\images\暧昧.png)

### 语言特性

1. 弱类型

    `Javascript`是一种弱类型的计算机语言，这意味着我们可以为一个声明的变量赋不同类型的值，而不像JAVA或者Typescript，在声明变量的时候必须明确数据类型,或者明确函数的传入导出类型。

2. 动态类型
   　　`Javascript`是一种动态类型语言，动态类型语言只有在运行期间才去做数据类型检查的语言，也就是说，在用动态类型的语言编程时，永远也不用给任何变量指定数据类型，该语言会在你第一次赋值给变量时，在内部将数据类型记录下来。（Python、Ruby也属于动态类型语言）

弱类型可以随意更换变量所储存值的类型，动态类型可以在声明变量时不需要约束变量类型。正是`Javascript`的弱类型及动态特性给予它很大的灵活性。

## 基本类型

- Undefined
- Null
- Number
- String
- Boolean
- Object
- Symbol(ES6)

Javascript共有七种数据类型，其中undefined表示：变量声明但是未持有值的时候的值为undefined，null表示：没有对象，即该处不应该有值（这个从JAVA中继承的特点简直就是个bug）。再说一说Object，在Javascript中Object其实包括Array、Function、Object。他们的原型最终都指向Object，神奇不神奇。最后Symbol是在ES6中新增的一种数据类型，表示独一无二的值。

### 类型转换

> 类型转换发生在静态语言的编译阶段，而强制类型转换则发生在动态语言的运行时。——《你不知道的`Javascript`中卷》

对于转换方式，笔者参考《你不知道的`Javascript`中卷》将其划分为强制类型转换和隐式强制类型转换。

#### 抽象值操作

这里需要先铺垫三个基本抽象值操作

- ToString 负责处理非字符串转到字符串 强制类型转换。参考[ECMA-9.8](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-9.8)
- ToNumber 负责处理将非数字转到数字 强制类型转换。参考[ECMA5-9.3](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-9.3)
- ToBoolean 负责非布尔转换到布尔类型 强制类型转换。[ECMA5-9.1](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-9.2)
- ToPrimitive 负责将引用类型转换为原始类型，在转换过程中会调用valueOf()或者toString()方法。参考[ECMA5-9.1](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-9.1)

 ####  显式强制类型转换

这里先说显式强制类型转换，因为显式转换肉眼可见，一般通过调用数据类型的构造函数进行转换，且结果明了，不会带来什么困惑。

#### Boolean

|  数据类型   |              true               |   false   |
| :---------: | :-----------------------------: | :-------: |
| `undefined` |                -                |   false   |
|   `null`    |                -                |   false   |
|    `NaN`    |                -                |   false   |
|   Number    |            非零数字             | 0、-0、+0 |
|   String    | 非空字符串、‘null’、‘undefined’ |    ‘’     |
|    Array    |                -                |   true    |
|   Object    |                -                |   true    |

#### Number

- 基本类型转数字

  ```js
  Number(undefined) // NaN
  Number(null) // 0
  Number(NaN) // NaN （NaN本身就是Number类型）
  Number(false) // 0
  Number(true) // 1
  Number("") // 0
  Number("1") // 1
  Number("12sd") //NaN
  ```

- 数组转数字

  ```js
  Number([]) // 0
  Number([undefined]) // 0 
  Number([null]) // 0
  Number([NaN]) // 0
  Number([1]) // 1
  Number([1,2]) // NaN
  Number(['daRui']) // NaN
  Number(['1']) // 1
  Number(['1', '2']) // NaN
  Number([{}]) // NaN
  ```

- 对象转数字

  ```js
  Number({}) // NaN
  ```

#### String

- null、undefined、NaN

  ```js
  String(null) // "null"
  String(undefined) // "undefined"
  String(NaN) // "NaN"
  ```

- 数字转为字符串

  ```js
  String(1) // "1"
  let age = 18
  age.toString() // "18"
  age.toString(2) // "10010"
  age.toString(8) // "22"
  age.toString(10) // "18"
  ```

  > `toString()`方法可以传递转换进制。默认10进制。

- 布尔转为字符串

  ```js
  String(true) // "true"
  String(false) // "false"
  true.toString() // "true" (使用抽象操作)
  false.toString() // "false"
  
  // 这里的传参无效！
  true.toString(2) // "true"
  true.toString(8) // "true"
  
  ```

- 数组转为字符串

  ```js
  [].toString() // ""
  [1,2,3].toString() // "1,2,3"
  [1,null,undefined,NaN].toString() // "1,,NaN"
  ```

- 对象转为字符串

  ```js
  String({}) // "[Object object]"
  ```


显示强制类型转换总结：

1. 显示类型转换的结果还是很清晰的，基本没有什么模糊不清的地方

2. 原始类型转原始类型时会调用抽象操作进行转换，转为目标值，如果没有成功，这抛出错误。

3. 需要注意的是引用类型转换为原始类型的过程中，流程是不一样的，这里笔者查阅了[ECMA-263 5.1规范 8.12.8](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-8.12.8 ) ：

（1）转为字符串：

- 先检查有没有自己的toString方法，有的话就调用toString 进行转换，如果可以成功转为原始类型则返回值
- 如果没有toString则调用自己的valueOf方法，如果还没有获取到原始类型值，则抛出错误

（2）转为数字

- 先检查有没有valueOf方法，有的话就调用valueOf 进行转换，如果可以成功转为原始类型则返回值
- 如果没有valueOf则调用toString方法，如果还没有获取到原始类型值，则抛出错误

> toString、valueOf 都来源于Object.prototype。toString会返回内部属性[[Class]]，比如"[object Object]"、"[object Array]"、"[object String]"

下面我们代码演示下，这里我们通过修改对象的toString、valueOf方法来演示，我们写的这两个方法会覆盖Obejct的原始方法，但是原理相同，这个涉及到作用域链的知识，不在本文范围内。

```js
let me = {
  toString() {
    return "JianDaRui"
  },
  valueOf() {
    return 18
  }
}
console.log(String(me)) // "JianDaRui"
console.log(Number(me)) // 18
```

注意：

- Object的toString与抽象操作ToString是不同的两种方法，toString来源于对象原型。而ToString是真实暴露出来的方法，除了null和undefined，其他值都可以直接使用抽象操作ToString方法。对象在字符串化的过程中都是调用自己的toString方法。

- Array的toString方法是经过重新定义的，会将所有单元字符串化后再用“,”连接起来，这也就是为什么数字 数组的转换会有Array.join(",")的效果。

#### 隐式强制类型转换

终于到了隐式转换了，其实类型转换最让人头疼的也就是这一部分了，要想搞清楚隐式类型转换，请务必记住三点转换操作优先级，转换抽象操作执行顺序，

#### +(一元操作符)

#### +、-、*、/
##### + (重点)

说到 + ，在Javascript中有两种含义：一种是字符串的连接，一种是数字的加减。+ 操作的重点难点其实还是在引用类型转化为基本类型的过程。这里笔者将ECMA5规范的两张原始类型、引用类型之间转化为字符串和数字的结果表直接贴在这里，方便大家对照。

![`ToString`](D:\Study\JDR_Blog\articles\02-类型转换\images\toString.png)

![toNumber](D:\Study\JDR_Blog\articles\02-类型转换\images\toNumber.png)

有了上面两张表，现在我们需要搞清楚+操作在转化过程中转换类型的优先级，及过程。这里参考[ECMA5-11.6.1](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-11.6.1)

1. 基本类型之间 + 
   -  String + Number/Boolean/String/null/ undefined  则进行字符串连接操作
   - Number + Boolean/null/undefined 则进行数值加减操作，false 为 0 ，true 为 1, null 为 0， undefined 为 ` NaN`

```js
1 + "1" // '11'
1 + "string" // "1tring" （加非数字字符串）
1 + true // 2
1 + false //1
1 + [] // "1"
1 + [1,2,3] // "11,2,3"
1 + {}  // "1[object Object]"
1 + null // 1
1 + undefined // 1
null + undefined // NaN

true + 1 // 2
true + "1" // "true1"
true + "true" // "truetrue" （加非数字字符串）
true + true // 2
true + false // 1
true + [] // "true"
true + [1,2,3] // "true1,2,3" 
true + "true[object Object]" // NaN
true + null // 1
true + undefined // NaN

false + 1 // 1
false + "1" // "false1"
false + "string" // "falsestring" （加非数字字符串）
false + false // 0
false + true // 1
false + [] // "false" 
false + {}  // "false[object Object]"

[] + 1 // "1"
[] + "1" // "1" 
[] + "string" // "string" （加非数字字符串）
[] + true  // "true"
[] + false // "false"
[] + [] // ""
[1] + [1] // "11"
[] + {} // "[object Object]" （注意！！！）
[] + null // "null"
[] + undefined // "undefined"

{} + 1 // 1 
{} + "1" // 1 
{} + "string" // NaN
{} + true // 1 
{} + false // 0
{} + [] // 0 （注意！！！）
{} + [1] // 1 （注意！！！）
{} + [1,2,3] // NaN （注意！！！）
{} + {} // "[object Object][object Object]"
{} + null // 0
{} + undefined // NaN

-Infinity + Infinity // NaN
```

##### ==（重点）

```js

1 == '1' // true
1 == true // true
1 == [] // false
1 == [1] // true
1 == {}  // false

true == "1" // true
true == "true" // false 
true == [] // true
true == [1]  // true
true == {} // false

[] == "1"// false
[] == true  // false
[] == false // true
[] == []  // false
[] == {} // false
[] == ![] // true (注意！！！)

{} == 1 // Unexpected token '=='
{} == "1" // Unexpected token '=='
{} == true // Unexpected token '=='
{} == false // Unexpected token '=='
{} == [] // Unexpected token '=='
{} == {} // false

"0" == null // false
"0" == undefined // false
"0" == false // true (注意！！！)
"0" == NaN // false
"0" == 0 // true
"0" == "" // false

false == null // false (注意！！！)
false == undefined // false (注意！！！)
false == NaN // false
false == 0 // true (注意！！！)
false == "" // true (注意！！！)
false == [] // true (注意！！！)
false == {} // false

"" == null // false
"" == undefined //false
"" == NaN // false
"" == 0 //true (注意！！！)
"" == [] // true (注意！！！)
"" == {} // false

0 == null // false
0 == undefined // false
0 == NaN // false
0 == [] // true 
0 == {} // false
 
null == null // true
null == undefined // true
null == "" // false
null == 0 // false
undefined == "" // false
undefined == 0 // false

NaN == NaN // false
```

##### ！！、&&、||（重点）

###### !! 

将值转为布尔值

```js
 // 除将下面的转为false其余全部为true
!! ""
!! 0
!! -0
!! +0
!! null
!! undefined
!! NaN
```

###### &&、||

> &&与||逻辑运算符的特殊之处在于，两者返回的是两个操作数中的一个（且仅一个），即选择两个操作数中的一个，然后返回它的值。这两个逻辑运算符首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行ToBoolean强制类型转换，然后在执行条件判断。
>
> 对于||来说，如果条件判断结果为true就返回第一个操作数的值，如果为false就返回第二个操作数的值。
>
> &&则相反，如果条件判断结果为true就返回第一个操作数的值，如果为false就返回第一个操作数的值。
>
> ​                                      																					——《你不知道的Javascript上卷》

```js

```

##### -

```js
1 - "1" === 0 // true
1 - "string" // NaN （减非数字字符串）
1 - true === 0 // true
1 - false === 1 // true
1 - [] === 1 // true
1 - {}  // NaN
1 - null // 1
1 - undefined // NaN

true - 1 === 0 // true
true - "1" === 0 // true
true - "true" // NaN （减非数字字符串）
true - true === 0 // true
true - false === 1 // true
true - [] === 1 // true
true - {} // NaN
true - null // 1
true - undefined // NaN

false - 1 === -1 // true
false - "1" === -1 // true
false - "string" // NaN （减非数字字符串）
false - false === 0 // true
false - true === -1 // true
false - [] === 0 // true
false - {}  // NaN

[] - 1 === -1 // true
[] - "1" === -1 // true
[] - "string" // NaN （减非数字字符串）
[] - true === -1 // true
[] - false === 0 // true
[] - [] === false // true
[] - {} // NaN
[] - null // 0
[] - undefined // NaN

{} - 1 === -1 // true
{} - "1" === -1 // true
{} - "string" // NaN （减非数字字符串）
{} - true === -1 // true
{} - false === -0 // true
{} - {} // NaN
{} - [] // -0
{} - null // -0
{} - undefined // NaN

Infinity - Infinity // NaN
```

##### *

```js
1 * "1" === 1 // true
1 * "string" // NaN （乘非数字字符串）
1 * true === 1 // true
1 * false === 0 // true
1 * [] === 0 // true
1 * {}  // NaN
1 * null // 0
1 * undefined // NaN

true * 1 === 1 // true
true * "1" === 1 // true
true * "true" // NaN （乘非数字字符串）
true * true === 1 // true
true * false === 0 // true
true * [] === 0 // true
true * {} // NaN
true * null // 0
true * undefined // NaN

false * 1 === 0 // true
false * "1" === 0 // true
false * "string" // NaN （乘非数字字符串）
false * false === 0 // true
false * true === 0 // true
false * [] === 0 // true
false * {}  // NaN
false * null // 0
false * undefined // NaN

[] * 1 === 0 // true
[] * "1" === 0 // true
[] * "string" // NaN （乘非数字字符串）
[] * true === 0 // true
[] * false === 0 // true
[] * [] === 0 // true
[] * {} // NaN
[] * null // 0
[] * undefined // NaN

{} * 1 // Uncaught SyntaxError: Unexpected token '*'
{} * "1" // Uncaught SyntaxError: Unexpected token '*'
{} * "string" // Uncaught SyntaxError: Unexpected token '*'
{} * true // Uncaught SyntaxError: Unexpected token '*'
{} * false // Uncaught SyntaxError: Unexpected token '*'
{} * [] // Uncaught SyntaxError: Unexpected token '*'
{} * {} // NaN

Infinity * (- Infinity ) // - Infinity 
```









- Object.is()







