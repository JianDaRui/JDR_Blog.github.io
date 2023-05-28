---
title: TypeScript 类型体操
author: 剑大瑞
category: TypeScript
tag: 
  - typescript
date: 2023-05-28 08:46:31
---



## `Exclude<UniType, ExcludeMembers>`

### 功能：

可以通过 UnionType 去除与 ExcludedMembers 中匹配的联合类型来构造类型。

代码示例：

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // T0 = "b" | "c"
     
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // T1 = "c"
     
type T2 = Exclude<string | number | (() => void), Function>; // T2 = string | number

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T3 = Exclude<Shape, { kind: "circle" }>

// 相当于
type T3 = {
    kind: "square";
    x: number;
} | {
    kind: "triangle";
    x: number;
    y: number;
}
```

### 基本体操动作：

- 联合类型与交叉类型的区别

- 泛型，通过泛型参数接受要处理的类型

- ###### `extends`关键字结合**条件判断**

- `never` 关键字

### 实现 `MyExclude`，前置基础与思路分析：

1. 两个不想交的基本类型进行相交操作为 never 

   ```typescript
   type Str = "a" & "c" // Str = never
   ```

2. 两个相同的基本类型进行相交操作为其本身

   ```typescript
   type Str = "a" & "a" // Str = "a"
   ```

3. 两个相同的基本类型进行联合操作为其本身

   ```typescript
   type Str = "a" | "a" // Str = "a"
   ```

4. never 为其他类型的子类型，任何类型与 never 进行联合操作，返回其本身

   ```typescript
   type Str = "a" | never // Str = "a"
   ```

5. 需要知道**[条件类型在处理处理泛型时，如果传递的泛型为一个联合类型，则会触发类型分配](https://juejin.cn/post/7236670795061297209#heading-3)**

   ```typescript
   type ToArray<Type> = Type extends any ? Type[] : never;
   
   type ToArray<Type> = Type extends any ? Type[] : never;
    
   type StrArrOrNumArr = ToArray<string | number>; // StrArrOrNumArr = string[] | number[]
   ```

   相当于在泛型为联合类型时，条件类型对联合类型中的每个类型做了遍历操作。

6. `MyExclude` 接受两个泛型参数，使用 `extends ` 关键字进行判断，因为需要保留的是 `U` 中的类型， E extends U  必为真，所以需要进行  U extends E 的判断。因为

```typescript
type A = "a" | "b" | "c"
type B = "a"

type MyExclude<U, E> =  U extends E ？never : U

type C = MyExclude<A, B> // C = 'b' | 'c'

type T0 = MyExclude<"a" | "b" | "c", "a">; // T0 = "b" | "c"
     
type T1 = MyExclude<"a" | "b" | "c", "a" | "b">; // T1 = "c"
     
type T2 = MyExclude<string | number | (() => void), Function>; // T2 = string | number

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T3 = MyExclude<Shape, { kind: "circle" }>
```

## `Extract<Type, Union>`

### 功能：

与 `Exclude` 相反，保留两个联合类型中的交集部分。

代码示例：

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>; // type T1 = () => void
 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T2 = Extract<Shape, { kind: "circle" }>

// 相当于
type T2 = {
    kind: "circle";
    radius: number;
}
```

### 基本体操动作：

- 联合类型与交叉类型的区别

- 泛型，通过泛型参数接受要处理的类型

- ###### `extends`关键字结合**条件判断**

- `never` 关键字

### 实现 `MyExtract`：

- 思路与 `MyExclude` 相似，不同之处在于 extends 关键字进行判断时，是谁在前谁在后的问题。

```typescript
type MyExtract<T, U> = T extends U ? T : never

type T = MyExtract<"a" | "b" | "c", "a">; // T0 = "b" | "c"
     
type T1 = MyExtract<"a" | "b" | "c", "a" | "b">; // T1 = "c"
     
type T2 = MyExtract<string | number | (() => void), Function>; // T2 = string | number

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T3 = MyExtract<Shape, { kind: "circle" }>
```

## `Partial<Type>`

### 功能：

通过将一个类型对象的所有属性设置为可选状态来构造一个新的类型对象。

代码示例：

```typescript
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

### 基本体操动作

- `?` 属性修饰符，可配置属性是否可选
- `keyof` 关键字，可以获取类型对象的所有属性键的联合类型
- `in` 关键字，可实现对联合类型的遍历
- 索引类型，可以获取类型对象的属性值类型

### 实现 `MyPartial`，前置基础与思路分析：

- 通过 `keyof` 获取泛型 `T` 的所有属性的联合类型
- 通过遍历联合类型并添加 `?` 操作符，将其转为可选状态
- 通过 `T[Key]` 的形式获取属性值类型

```typescript
type MyPartial<T> {
	[Key in keyof T]?: T[Key] | undefined;
}
function updateTodo(todo: Todo, fieldsToUpdate: MyPartial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## `Required<Type>`

### 功能：

与 `Partial<Type>` 功能相反，通过将一个存在可选属性的类型对象，全部转为必选属性来构造一个新类型对象。

代码示例：

```typescript
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: Required<Props> = { a: 5 }; // Error: Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.

```

### 基本体操动作：

- 要知道，在 ts 类型对象属性的 `?` 和 `readonly` 前添加 `-` 或 `+` 可实现对类型修饰符的去与留。
- 通过 `keyof` 获取泛型 `T` 的所有属性的联合类型
- 通过遍历联合类型并添加 `?` 操作符，将其转为可选状态
- 通过 `T[Key]` 的形式获取属性值类型

### 实现 `MyRequired<Type>`

- 实现思路与 `Partial<Type>` 相同，不同的是需要通过在属性修饰符前加 `-?` 移除属性的可选特性。

```typescript
type MyRequired<T> = {
  [Key in keyof T]-?: T[Key]
}

interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: MyRequired<Props> = { a: 5 }; // Error: Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.


```

## `Readonly<Type>`

### 功能：

通过将一个类型的所有属性设置为只读（`readonly`）来构造一个新的类型对象。

代码示例：

```typescript
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello"; // Cannot assign to 'title' because it is a read-only property.
```

### 基本体操动作：

- 与 `Required<Type>` 相同

### 实现 `MyReadonly<T>`

```typescript
type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key]
}
const todo: MyReadonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello"; // Error
```

## `Pick<Type, Keys>`

### 功能：

通过从类型对象中选取一组属性 Keys 来构造一个新的类型。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

### 基本体操动作

- 泛型，通过泛型接受类型对象和所需 key 的集合
- `keyof` 关键字，传入的 Keys 应该是 T 的所有属性的联合类型的子类型，需要通过 keyof 获取到 T 的所有属性联合类型
- `extends` 关键字，通过 extends 实现对 Keys 的约束。
- 下标类型 & `in` 关键字，通过 `in` 关键字实现对 Keys 的遍历构建 key 与属性值类型之间的映射。

### 实现 `MyPick<T, Keys>`

```typescript
type MyPick<T, Keys extends keyof T> = {
  [Key in Keys]: T[Key]
}

type TodoPreview = MyPick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

## `Omit<Type, Keys>`

### 功能：

通过从 Type 中选取所有属性的联合类型，然后移除与 Keys 相交的属性来构造类型。Pick 的反义词。

代码示例：

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

// 移除 description 属性
type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

// 移除 "completed" | "createdAt" 属性
type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
```

### 基本体操动作：

- 泛型，通过泛型接受类型参数
- `extends` 关键字，通过 `extends` 关键字实现对 Keys 的约束
- `in` 关键字，通过 `in` 关键字实现对 筛选出来的 符合需求的联合类型遍历
- `keyof` 关键字，通过 keyof 获取 T 的属性联合类型
- 下标类型，通过下标类型实现属性和值得读取操作

### 实现 `MyOmit<T, Keys>`

- 需要基于 `MyExclude<T, Keys>` 过滤出符合需求的属性联合类型
- 在基于符合需求的联合类型进行遍历操作，读取属性值类型

```typescript
type MyOmit<T, Keys extends keyof T> = {
  [Key in MyExclude<keyof T, Keys>]: T[Key]
}

// 移除 description 属性
type TodoPreview = MyOmit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

// 移除 "completed" | "createdAt" 属性
type TodoInfo = MyOmit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};
```

**补充：**

- 上面的 `MyOmit<T, Keys>` 基本符合了我的需求，我这里又看了下 `Ts` 内部是如何实现 `Omit<T, Keys>` 的：

```typescript
type Omit<T, Keys extends string | number | symbol> = {
  [Key in MyExclude<keyof T, Keys>]: T[Key]
}
```

注意到原生的  `Omit<T, Keys>` 对于 Keys 约束更加宽泛一些，我们自己实现的 `MyOmit<T, Keys>` 直接将 Keys 约束到 泛型 `T` 的属性联合类型中。

## `NonNullable<Type>`

### 功能：

实例代码

### 基本体操动作

### 实现
