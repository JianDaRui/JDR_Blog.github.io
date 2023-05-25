<!-- # Javascript隐式强制类型转换 -->

`Javascript中`让人诟病的技术点不少，类型转换就是其一，甚至《`Javascript`语言精粹》的作者`Douglas Crockford `直接将`Javascript`中的类型转换归为糟粕、鸡肋（PS：据说作者在日常开发中也经常使用到`Javascript`这一特性，看来万事逃不过真香定律啊）。而类型转换中最让人诟病的就数` + 、 ==`操作过分了。但是`Javasript`的类型转化也不是一无用处。为了让大家在开发过程中用的舒心、放心，于是就有了这篇博文。希望对大家有帮助。



>  这里直接上各种类型之间的转换结果，如果没有明白，那就带着问题往下读。

## +、==、||、&&

### + (重点)

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
{ a:1 } + [] // 0（注意！！！）
{} + [1] // 1 （注意！！！）
{} + [1,2,3] // NaN （注意！！！）
{} + {} // "[object Object][object Object]"
{} + null // 0
{} + undefined // NaN

-Infinity + Infinity // NaN
```

总结：

1. 如果某个操作数是字符串或者能够转换为字符串的话， + 将进行拼接操作。可见在 + 操作中字符串的拼接**优先级**高于数字的 +。
2. 如果一个操作数是对象（包括数组），则首先对其调用`ToPrimitive`操作，该抽象操作再调用`[[DefalutValue]]`，以数字作为上下文，保证了优先调用`valueOf()`方法，可见在 + 操作时，引用类型内部调用`valueOf()`方法的**优先级**高于`toString()`。
3. 数组或者对象在调用`valueOf()`方法如果无法获取到基本类型值（数字），会转而调用`toString()`。

代码演示：

```js
// 这里提供valueOf()方法，
var daRui = {
    valueOf: function() {
        return 18
    },
    toString: function() {
        return "daRUI"
    }
}

daRui + 7 // 25
daRui + "7" // "187"
daRui + "hello" // "18hello"

// 这里仅提供toString()方法，
var daRui = {
    toString: function() {
        return "daRUI"
    }
}

daRui + 7 // "daRUI7"
daRui + " hello" // "daRUI hello"

```

特别说明:

1. 数组中的`toString()`方法是经过改写的，故`[1,2,3]`会转为"1,2,3"，` []` 会转为""。
2. 对象的`toString()`方法会返回 "[object Class]"，`Object.prototype.toString.call([])` 返回 "[object Array]"。
3. `[] + {} `得到”[object Object]“，而`{} + []` 得到 0。这是因为 `{}` (花括号)在JS中有两种含义：
   1. 当 `{}` 在 + 后面时，表示对象`{}`
   2. 当 `{}` 位于 + 前面时，`{}` 表示一个独立的**空代码块**，所以`{} + []` 操作相当于进行的是 `+[]`(一元操作符转换操作) 将 `[]` 转为0

### ==（重点）

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
[] == []  // false (注意！！！)
[] == {} // false
[] == ![] // true (注意！！！)

{} == 1 // Unexpected token '=='
{} == "1" // Unexpected token '=='
{} == true // Unexpected token '=='
{} == false // Unexpected token '=='
{} == [] // Unexpected token '=='
{} == {} // false (注意！！！)

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
0 == [] // true  (注意！！！)
0 == {} // false
+0 == -0 // true

null == null // true
null == undefined // true
null == "" // false
null == 0 // false
undefined == "" // false
undefined == 0 // false

NaN == NaN // false  可以使用isNaN() 判断是不是NaN
```

总结：

 == 操作，最重要的时在两个操作数的转换过程！关于 == 操作[ES5 规范11.9.3](http://www.ecma-international.org/ecma-262/5.1/index.html#sec-11.9.3)给出了明确规范：

1. 字符串和数字之间的相等比较：
   1. 如果Type(x)是数字，Type(y)是字符串，则返回 `x == ToNumber(y)`的结果。
   2. 如果Type(x)是字符串，Type(y)是数字，则返回`ToNumber(x) == y`的结果。
   
2. 其他类型值和布尔类型之间的相等比较：
   1. 如果Type(x)是布尔类型，这返回`ToNumber(x) == y `的结果
   2. 如果Type(y)是布尔类型，则返回` x == ToNumber(y)` 的结果
   
3. null和undefined之间的相等比较
   1. 如果x为null，y为undefined，则结果为true
   2. 如果x为undefined，y为null，则结果为true
   
4. 对象和非对象之间的相等比较：
   1. 如果Type(x)是字符串或者数字，Type(y)是对象，则返回`x == ToPrimitive(y)`的结果
   2. 如果Type(x)是对象，Type(y)是字符串或者数字，则返回`toPrimitive(x) == y`的结果
   
5. 对象和对象之间比较:

   1. 在`Javascript`中对象属于引用类型，对象之间的比较，本质比较的是内存地址。所以都为false。

      （感谢掘友*Bug开发工程师同志*的指正）

> == 相等操作中，如果两边的操作数不同的话，都会进行类型转换，而且优先转为数字，再进行比较，如果转换后还不同则再次转换，直到相同为止。这里以 `字符串类型 == 布尔类型`做介绍：
>
> 1. 首先字符串类型转为Number 类型，这时比较的是 `数字类型 == 布尔类型`
> 2. 再将布尔类型转为Number类型，这时比较的是` 数字类型 == 数字类型`
>
>   这也就不难解释为什么`"0" == false`了
>
> 如果连个操作数中有引用类型，这会先将引用类型转换为基本类型，在进行上面的操作，进行比较。
>
> 再说` [] == ![] // true`:
>
> 1. 这里!操作的优先级是高于 == 的，![] 首先转换为false
> 2. 此时比较双方是 [] == false，这里会将 [] 再次转换为 0 
> 3. 此时比较双方是 0 == false，接下来就不难理解了

### ！！、&&、||（重点）

#### !! 

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

#### &&、||

> &&与||逻辑运算符的特殊之处在于，两者返回的是两个操作数中的一个（且仅一个），即选择两个操作数中的一个，然后返回它的**值**。这两个逻辑运算符首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行`ToBoolean`强制类型转换，然后在执行条件判断。
>
> 对于||来说，如果条件判断结果为true就返回第一个操作数的值，如果为false就返回第二个操作数的值。
>
> &&则相反，如果条件判断结果为true就返回第二个操作数的值，如果为false就返回第一个操作数的值。
>
> ​                                      																					——《你不知道的Javascript上卷》

```js
18 || "daRui" // 18
undefined || "daRui" // "daRui"
18 && "daRui" // daRui
null && "daRui" // null
null || {} // {}
null && {} // null
```

总结:

1. ||与&&返回的都是操作数中两个中的一个，这个严格意义上说并不是一种转换，而是一种选择

2. 日常开发中的 `if (a||b) {return true}`的过程，其实是先获取到 `a||b`的值再进行的判断

3. 这里说 ||和&&的原因是它可以简化我们日常开发中的代码，使代码更简洁，例：

   ```js
   18 || "daRui" 
   // 相当于
   18 ? 18 : "daRui"
   
   18 && "daRui" // daRui
   // 相当于
   18 ? "daRui" : 18
   ```

参考文献：

- 《你不知道的`Javascript`》中卷
- 《`Javascript`高级程序设计》
- 《编写可维护的`Javascript`》
- [ECMA5-262标准](http://www.ecma-international.org/ecma-262/)

