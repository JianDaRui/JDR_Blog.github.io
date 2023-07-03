---
title: Typescript extends 关键字的三个妙用
author: 剑大瑞
date: 2023-07-03 21:22:04
category: typescript
tag: typescript
---

今天插一段题外话，最近团队新增了一个 `HC`，面试候选人的过程中，看他简历，履历很牛逼，并且里面写的精通 `TypeScript`。

我想那我们就问一个很基础的问题吧，你了解 `Typscript` 的 `extends` 关键字吗？它都会在那几个场景下使用？

结果很失望，即使在我写出了 `extends` 的使用方式时，这位哥们还没想起怎么用，只能含糊其辞。

我赶紧换了一个问题，避免太尴尬：你了解 `ts` 工具类型 `Exclude` 与 `Omit` 的使用吗？及它们两个的区别？

这哥们还是不会~

不出意外的一面就挂了，说这个事的原因是，现在经济下行、市场上是狼多肉少，大家一定要珍惜面试机会，实事求是，平时多积累、多梳理，战时抓机会、少冷场啊。

好了下面说正事。

## `extends` 关键字实现继承

如果你有看过 `TypeScript` 官方文档，起码熟悉这两个：

1. `extends` 关键字可以实现 `interface` 类型的扩展，
   - 这个也是 `interface` 与 `type` 类型别名实现扩展的区别之一，类型别名通过 `&` 交叉类型来实现类型扩展
2. `extends` 关键字可用于 `class` 的继承

比如定义个 `Animal` 接口

```typescript
interface Animal {
  name: string
}

interface Person extends Animal {
  level: number
}

const person: Person = {
  name: 'Perter',
  level: 1
}

interface Dog extends Animal {
  leg: number
}

const dog: Dog = {
  name: 'BaGong',
  leg: 4
}

```

如果使用 `class`

```typescript
class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Person extends Animal {
  talk(info: string) {
    console.log(info)
  }
}

const person = new Person();
// Base class method
person.move();
// Derived class method
person.talk('hello world')

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
 
const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);

```

这种方式就是在践行 `extends` 单词的本意 `扩展`。

## `extends` 实现类型约束

很贴切的列子就是 `Typescript` 的工具类型 `Pick`，可以通过从一个 类型中选取一组属性集合来构造一个新的类型。

接下来让我们实现下：

```typescript
type MyPick<T, Keys> = {
  [key in Keys]: T[key] // error: Type 'key' cannot be used to index type 'T'.
}
```

如果你直接这么写，`ts` 编译器肯定是要报错的。因为用户传入的属性集合中很可能在 `T` 中不存在！

所以我们需要对属性集合 `Keys` **进行约束**，约束其必须为 `T` 的属性集合子集。

```typescript
type MyPick<T, Keys extends keyof T> = {
  [key in Keys]: T[key]
}

// 使用
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = MyPick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo; // ok
```

这是第二种方式，对泛型参数进行约束。

## `extends` 实现条件类型判断

在 `TypeScript` 类型体操基础动作中，有一种动作叫：**条件类型**，条件类型主要用于去判断两个类型之间的关系。

> 建议阅读 [类型体操基础动作](https://zhuanlan.zhihu.com/p/640499290)

比如工具类型 `Exclude` 的实现，就是基于条件类型：

```typescript
type MyExclude<T, Key> =  T extends Key ? never : T
```

可以实现基于联合类型 `Key` ，排除联合类型 `T` 中匹配的类型。

```typescript
type T0 = MyExclude<"a" | "b" | "c", "a">; // type T0 = "b" | "c"

type T1 = MyExclude<"a" | "b" | "c", "a" | "b">; // type T1 = "c"
```

在多数工具类型中，都用到了这个特性，最常见的就是递归类型。递归三要素之一就是要有终止条件，而我们就可以通过 `extends` 实现终止条件的判断。

比如

- 实现一个 [`DeepReadonly`](https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md) 工具类型，可以做到将对象类型的所有属性转为只读：

```typescript
type DeepReadonly<T> = keyof T extends never ? T : {
  readonly [Key in keyof T]: DeepReadonly<T[Key]> : T[Key]
} 
```

- 实现一个 [`TrimLeft`](https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md) ，可以实现移除字符串类型的左边空格：

```typescript
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S

type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
```

- 实现一个 [`KebabCase`](https://github.com/type-challenges/type-challenges/blob/main/questions/00612-medium-kebabcase/README.md) 类型，可以实现对字符串类型的驼峰转横杠：

```typescript
type KebabCase<T extends string> = T extends `${infer F}${infer R}` ? R extends Uncapitalize<R> ?  `${Uncapitalize<F>}${KebabCase<R>}`
  : `${Uncapitalize<F>}-${KebabCase<R>}`
  : T;

type FooBarBaz = KebabCase<"FooBarBaz">;
const foobarbaz: FooBarBaz = "foo-bar-baz";

type DoNothing = KebabCase<"do-nothing">;
const doNothing: DoNothing = "do-nothing";
```

是不是很有意思？

## 最后

恭喜你，通过短短几分钟，有进步了一丢丢。如果此时你正在找工作的话，欢迎联系我，我帮你内推，关于岗位的更多详细信息欢迎私信交流。

欢迎关注我的公众号：coder 狂想曲。

![coder 狂想曲](/images/wx/qrcode.png)

参考

- TypeScript：https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- DeepReadonly: https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md
- TrimLeft: https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md
- KebabCase：https://github.com/type-challenges/type-challenges/blob/main/questions/00612-medium-kebabcase/README.md
