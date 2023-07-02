---
title: Typescript IIMT
author: 剑大瑞
date: 2023-07-02 17:36:29
category: typescript
tag: gittypescript
---

今天学习我们学习 TypeScript 的一种新的转换类型操作：索引映射类型——`IIMT(Immediately Indexed Mapped Type)`。

这个类型特别有意思，我们先看一个示例：

```typescript
type Tuple = [1, true, 'false']

type List = Tuple[number]
```

- 上面代码先创建了一个元组 Tuple。
- 然后通过 number 进行索引访问

得到的 List 为：

```typescript
type List = 1 | true | 'false'
```

可以发现上面操作 **通过索引映射，将操作类型转为了联合类型**。

如果是对象类型呢？

```typescript
type Person = {
	name: string
  age: number
}

type GetValueType = {
  [K in keyof Person]: Person[K]
}[keyof Person]
```

通过上面的转换，我们得到一个新的类型：

```typescript
type GetValueType = string | number
```

如果说我们想根据 Person 类型创建一个新的类型，其结构为：

```typescript
/**
 * | {
 *     key: string;
 *   } | {
 *     key: number;
 *   }
 * 
 */
```

修改 GetValueType：

```typescript
type GetValueType = {
  [K in keyof Person]: {
		key: Person[K]
  }
}[keyof Person]
```

上面的过程，可以分解为：

1. 先创建一个下列结构的类型

```typescript
/**
 * {
 *   name: {
 *     key: string;
 *   },
 *   age: {
 *     key: number;
 *   }
 * }
 */
type Temp = {
  [K in keyof Person]: {
		key: Person[K]
  }
}
```

2. 通过 IIMT 创建目标类型

```typescript
type GetValueType = Temp[keyof Person]
```

通过上面两个示例，可以发现所谓的 IIMT ，就是**通过索引访问类型操作去迭代目标类型的 key 并为每个 key 创建一个新的类型。**

## 通过 IIMT 遍历联合类型

IIMT 的特点在于，当你遍历联合类型的所有成员时，同时可以为你保留整个联合类型的上下文，不至于在遍历过程中丢失。下面我们基于一个联合类型创建一个新的联合类型

```typescript
type Fruit = "apple" | "banana" | "orange";
/**
 * | {
 *   thisFruit: 'apple';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'banana';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'orange';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 */
export type FruitInfo = {
  [F in Fruit]: {
    thisFruit: F;
    allFruit: Fruit;
  };
}[Fruit];
```

如果不使用 IIMT ，则上面会创建一个新的 对象类型。

我们可以看到新创建的 FruitInfo 类型是三个对象的联合类型，每个对象都有一个 thisFruit 属性和一个 allFruit 属性。thisFruit 属性是联合类型的特定成员，而 allFruit 属性是整个联合类型。

如果再加入其他工具类型，则又可以玩出许多花活，比如我们现在要实现在 allFruit 属性中，剔除 thisFruit，就可以这么写：

```typescript
/**
 * | {
 *   thisFruit: 'apple';
 *   allFruit: 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'banana';
 *   allFruit: 'apple' | 'orange';
 * }
 * | {
 *   thisFruit: 'orange';
 *   allFruit: 'apple' | 'banana';
 * }
 */
export type FruitInfo = {
  [F in Fruit]: {
    thisFruit: F;
    allFruit: Exclude<Fruit, F>;
  };
}[Fruit];
```

上面的代码在迭代 Fruit 的时候，每次都会传入一个完整的 Fruit 类型，也就是说每次 F 每次所能感知到的 Fruit 都是独立的、互不干扰的，所以可以使用 Exclude 从联合类型中删除当前的 F。 

## 转换对象类型的联合类型

IIMT 经常用于操作对象类型的联合类型，比如需要对联合类型中的每个对象的属性进行修改。

比如需要对 Event 类型的每个对象类型的 type 属性加个前缀。

```typescript
type Event =
  | {
      type: "click";
      x: number;
      y: number;
    }
  | {
      type: "hover";
      element: HTMLElement;
    };
```

如果说想直接通过遍历去修改联合类型中的对象类型，那么 ts 编译器会提示报错，比如说像下面这样：

```typescript
type Example = {
  // Type 'Event' is not assignable to
  // type 'string | number | symbol'.
  [E in Event]: {};
};
```

因为你通过 E in Event 遍历得到的其实是 每个对象类型，并不是 'string | number | symbol'。

这里我们可以通过 as 关键字在映射类型中操作类型 

```typescript
// 通过 Omit 剔除 type 类型，对 type 属性单独操作
// 通过 交叉类型实现 更改 type 属性
type PrefixType<E extends { type: string }> = {
  type: `PREFIX_${E["type"]}`;
} & Omit<E, "type">;
/**
 * | {
 *   type: 'PREFIX_click';
 *   x: number;
 *   y: number;
 * }
 * | {
 *   type: 'PREFIX_hover';
 *   element: HTMLElement;
 * }
 */
type Example = {
  [E in Event as E["type"]]: PrefixType<E>;
}[Event["type"]];
```

在这里，我们插入 as E['type'] 将键重新映射为我们想要的类型。然后使用 PrefixType 为每个对象的 type 属性添加前缀。

最后，我们 使用Event['type'] 索引到映射类型，也就是click | hover——这样我们就得到了带前缀的对象的联合。

再看一些例子：

- 转 css 单位为联合对象类型

```typescript
type CSSUnits = "px" | "em" | "rem" | "vw" | "vh";
/**
 * | {
 *   length: number;
 *   unit: 'px';
 * }
 * | {
 *   length: number;
 *   unit: 'em';
 * }
 * | {
 *   length: number;
 *   unit: 'rem';
 * }
 * | {
 *   length: number;
 *   unit: 'vw';
 * }
 * | {
 *   length: number;
 *   unit: 'vh';
 * }
 */
export type CSSLength = {
  [U in CSSUnits]: {
    length: number;
    unit: U;
  };
}[CSSUnits];
```

- 转 http 响应码与状态为联合类型

```typescript
type SuccessResponseCode = 200;
type ErrorResponseCode = 400 | 500;
type ResponseCode =
  | SuccessResponseCode
  | ErrorResponseCode;
/**
 * | {
 *   code: 200;
 *   body: {
 *     success: true;
 *   };
 * }
 * | {
 *   code: 400;
 *   body: {
 *     success: false;
 *     error: string;
 *   };
 * }
 * | {
 *   code: 500;
 *   body: {
 *     success: false;
 *     error: string;
 *   };
 * }
 */
type ResponseShape = {
  [C in ResponseCode]: {
    code: C;
    body: C extends SuccessResponseCode
      ? { success: true }
      : { success: false; error: string };
  };
}[ResponseCode];
—

```

## 总结

在 ts 中如果相对联合类型进行遍历操作，相较于官方文档中提到的基础操作，并不能很好的实现。但是 IIMT 就可以解决这个问题，相当于 typscript 通过 IIMT 提供了一个对联合类型遍历的能力，通过 IIMT 可以实现对联合类型的单个类型进行操作，再结合其他类型体操基础动作，又可以玩出许多花样来。

参考：

- Indexed Access Types: https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
- Key Remapping via`as`：https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
- Transform Any Union in TypeScript with the IIMT：https://www.totaltypescript.com/immediately-indexed-mapped-type

