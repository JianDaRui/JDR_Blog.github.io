---
title: TypeScript infer 关键字
author: 剑大瑞
category: TypeScript
tag: 
  - typescript
date: 2023-07-01 12:46:31
---
今天我们介绍一个 `TypeScript` 非常强大的关键字 infer。

最近在练习 [type-challenges](https://github.com/type-challenges/type-challenges/tree/main)。虽然在先前的博文中有介绍过 `infer` 关键字的使用，但是直到我在 `type-challenges` 中使用的时候，才体会到这个关键字的强大之处。这个的感觉有多强大，打个比喻：

好比你在做体操比赛的时候，人已经飞到半空了，但是不知道接下来该做什么动作？该用头着地还是用脚着地？这个时候你要是知道 `infer` 关键字怎么用，那么它会给你答案！就是这么神奇！

## 接下来说正事。

首先 `infer` 关键字必须结合 `TypeScript` 中的**条件类型**进行操作，然后结合条件分支进行类型推导。

一个简单示例：

```typescript
type ArrayElement<T extends any[]> = T extends (infer Element)[] ? Element : never
```

`ArrayElement` 类型可以接受一个数组类型，然后获取数组的元素类型。比如：

```typescript
type NumList = number[]
type StrList = string[]

type NumEle = ArrayElement<NumList> // number
type StrEle = ArrayElement<StrList> // string
```

就像上面这么操作就可以获取到数组的元素类型。

通过上面的示例，让我们梳理下，`infer` 关键字做了什么？

- `infer` 这个单词本意是 推断、推论 的意思。
- 当在条件类型中使用 `infer` 关键字的时候，显示的声明了一个新的类型变量 `Element`
- 而 `ts` 结合条件操作将推断出泛型的元素类型*赋值*给了 `Element`

整个过程就是这么简单。

## `infer` 关键字不同情况下的使用

### 对字符串进行解构推断。

在 js 中 `string` 也是可迭代，解构的。利用这一特性，我们可以使用 `infer` 关键字获取到 `string` 类型的不同位置的字符串类型。

比如我们需要一个可以获取字符串类型的首个字符的类型工具类型 `GetFirstStr`。

```typescript
type Name = 'Da Rui'

type Result = GetFirstStr<Name> // 期望获取 D
```

期望 `Result = 'D'`。则使用 infer 结合条件类型操作可以实现为：

```typescript
type GetFirstStr<T extends string> = T extends `${infer R}${infer O}` ? R : never

type Result = GetFirstStr<Name> // D
```

利用此特性，我们可以轻松实现一个**可以将字符串类型转为首字母大写的工具类型 `Capitalize<T>`** ：

```typescript
type Darui = Capitalize<'da Rui'> // 期望得到的结果 Da Rui
```

我们只需将面的 `GetFirstStr` 稍作修改就可以，在推断获取到第一个字符后，对字符使用工具类型 `Uppercase<T>` 即可：

```typescript
type Capitalize<T extends string> = T extends `${infer F}${infer O}` ? `${Uppercase<F>}${O}` : S;
type Darui = Capitalize<'da Rui'> // Da Rui
```

你可以在 [playground](https://www.typescriptlang.org/play) 中试一试。就是这么巧妙。

类似的 [type-challenges](https://github.com/type-challenges/type-challenges/tree/main)：

- [TrimLeft](https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md)：https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md
- [Tirm]( https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md): https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md
- [Replace](https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/README.md): https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/README.md
- [StartWith](https://github.com/type-challenges/type-challenges/blob/main/questions/02688-medium-startswith/README.md): https://github.com/type-challenges/type-challenges/blob/main/questions/02688-medium-startswith/README.md
- [EndWith](https://github.com/type-challenges/type-challenges/blob/main/questions/02693-medium-endswith/README.md): https://github.com/type-challenges/type-challenges/blob/main/questions/02693-medium-endswith/README.md

### 对数组进行推断

在刚开始的时候我们通过 `ArrayElement<T>` 来获取数组元素类型。

`infer` 的强大之处在于可以让你获取数组类型任意索引位置的元素类型。

实现一个 `FirstEle` 获取第一个索引位置的元素类型：

```typescript
type FirstEle<T extends unknown[]> = T extends [infer F, ...unknown[]] ? typeof F : never

type Result = FirstEle<[1, 2, 3]> // 1

type Result2 = FirstEle<[true, 1, 'darui']> // true
```

同样的实现 `LastEle`

```typescript
type LastEle<T extends unknown[]> = T extends [...unknown[], infer L] ? typeof L : never
```

实现一个去头去尾 `MiddleEles`

```typescript
type MiddleEles<T extends unknown[]> = T extends [infer F, ...infer M, infer L] ? M: never

type Result = MiddleEles<[1, 2, 3, 4, 5]> // [2, 3, 4]
type Result2 = MiddleEles<[true, 1, 2, 3, 'darui']> // [1, 2, 3]
```

有了三个基础的思路，我们可以再结合递归，玩出更多花样来：

比如 `type-challenges` 中的 `Flatten` 类型，可以实现将嵌套数组类型拍平：

```typescript
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

实现 `Flatten`：

```typescript
type Flatten<S extends unknown[], T extends unknown[] = []> =  S extends [infer X, ...infer Y] ? 
  X extends unknown[] ?
   Flatten<[...X, ...Y], T> : Flatten<[...Y], [...T, X]> 
  : T
```

类似的  [type-challenges](https://github.com/type-challenges/type-challenges/tree/main)：

- [Last of Array](https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md): https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md
- [Pop](https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md): https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md
- [Shift](https://github.com/type-challenges/type-challenges/blob/main/questions/03062-medium-shift/README.md): https://github.com/type-challenges/type-challenges/blob/main/questions/03062-medium-shift/README.md
- [Reverse](https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md)：https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md

### 对函数进行类型推断

在官网中有一个工具类型 `ReturnType` 可以用于获取函数的返回值类型。

```typescript
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // unknown
```

其实它的实现也非常简单：

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```

另外我们还可以对函数的参数进行类型推断，实现一个 `Parameters` 获取函数参数类型

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never

const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

我们知道通过 `...` 操作符，可以将函数参数转为一个数组类型。如果结合我们上面数组部分的操作，又可以玩出很多花样来，比如实现一个对函数参数类型进行扩展的工具类型：

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// expected be (a: number, b: string, x: boolean) => number
```

实现：

```typescript
type AppendArgument<F extends (...args: any[]) => any, T> = Fn extends (...args: infer P[]) => infer R ? (...args: [...P, T]) => R : never 
```

类似的  [type-challenges](https://github.com/type-challenges/type-challenges/tree/main)：

- [Flip Arguments](https://github.com/type-challenges/type-challenges/blob/main/questions/03196-medium-flip-arguments/README.md)：https://github.com/type-challenges/type-challenges/blob/main/questions/03196-medium-flip-arguments/README.md

## 总结

在我看来，`infer` 关键字给了用户一个类型操作窗口，这个窗口可以在进行类型操作时，通过 `infer` 基于条件类型操作，去动态声明一个新的类型变量。而剩下的工作交给了 `ts` 编译器，有 `ts` 编译器去推断出类型变量的类型，然后给用户使用。

最后期望有收获的朋友可以去练一练  [type-challenges](https://github.com/type-challenges/type-challenges/tree/main)，并给个 `star`，这个仓库确实挺好玩。



![wx: coder 狂想曲](/images/wx/qrcode.png)


- type-challenges: https://github.com/type-challenges/type-challenges
