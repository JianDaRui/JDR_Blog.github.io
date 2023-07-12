---
title: Typescript 协变、逆变、双向协变及不变性
author: 剑大瑞
date: 2023-07-05 07:42:27
category:
tag:
---

最近在搬砖的时候，遇到一个场景，需要根据已存在的联合类型，将其转为交叉类型。就像这样：

```typescript
type Preson = {  
  name: string
} | {
  age: number
} | {
  needMoney: boolean
}

type Result = Uinon2Intersection<Preson>
```

期望通过 `Uinon2Intersection` 转换后，是这样：

```typescript
type Result = {  
  name: string
} & {
  age: number
} & {
  needMoney: boolean
}
```

刚开始感觉很简单啊。我想已经会了[类型体操基本动作四件套](https://zhuanlan.zhihu.com/p/640499290)了，刚开始我是这么想的：遍历联合类型，然后遍历的时候通过 key 读取属性值就行了啊，我啪啪啪就写出来了，就像这样：

```typescript
type U2I<T> = {
  [key in keyof T]: T[key]
}

type Result = U2I<Preson>
```

实际得到的是这样:

```typescript
type Result = U2I<{
    name: string;
}> | U2I<{
    age: number;
}> | U2I<{
    needMoney: boolean;
}>
```

Mmm，这完全不是我期望的样子啊，然后又想了想基础四件套，感觉遇到坑了，好像仅靠四件套并不能解决啊。

先说下，上面这种情况是因为**[对于联合类型，在遍历操作或者进行条件类型判断的时候，会发生类型分配](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)**。就像下面：

```typescript
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;
```

其实得到：

```typescript
type StrArrOrNumArr = string[] | number[]
```

如果想得到:  `(string | number)[]`。你需要这么写：

```typescript
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
```



## 协变

## 逆变

## 双向协变

## 不变性

## 请解答


参考： 
- https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
- https://dmitripavlutin.com/typescript-covariance-contravariance/
- https://stackoverflow.com/questions/66410115/difference-between-variance-covariance-contravariance-and-bivariance-in-typesc
- https://www.jihadwaspada.com/post/covariance-and-contravariance-in-typescript/
- https://javascript.plainenglish.io/never-fear-ts-covariant-contravariant-bivariant-and-invariant-7535f03e9d77