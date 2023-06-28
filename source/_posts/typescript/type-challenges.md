---
title: type-challenges
author: 剑大瑞
date: 2023-06-05 22:29:54
category:
tag:
---

## Easy

- Pick

```typescript
type MyPick<T, Keys extends keyof T> = {
  [Key in Keys]: T[Key]
}
```

- Readonly

```typescript
type MyReadonly<T> = {
  readonly[Key in keyof T]: T[Key]
}
```

- Tuple to Object

```typescript
type TupleToObject<T extends readonly any[]> =  {
   -readonly [P in T[number]]: P
}
```

- First

```typescript
type First<T extends any[]> = T extends [infer P, ...any[]] ? P : never
```

- Length

```typescript
type Length<T extends readonly any []> = T['length'] 
```

- Exclude

```typescript
type MyExclude<T, Key> = T extends Key ? never : T
```

- Awaited

```typescript
type Thenable<T> = {
  then: (onfulfilled: (arg: T) => unknown) => unknown;
}

type MyAwaited<T extends Thenable<any> | Promise<any>> = T extends Promise<infer Inner>
? Inner extends Promise<any> ? MyAwaited<Inner> : Inner
: T extends Thenable<infer U> ? U : false
```

- If

```typescript
type If<T extends boolean, W, U> = T extends true ? W : U
```

- Concat

```typescript
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U]
```

- Includes

```typescript

Original:

Maps the array from { [index]: [itemValue] } to { [itemValue]: true } and returns whether the expected item value, U, is true. This only allows U, to be a PropertyKey, so it won't pass all test cases.

type Includes<T extends readonly any[], U> = {
  [P in T[number]]: true
}[U] extends true ? true : false;

Revised:

Recursive type that checks if the first item is the item. It returns true if so, or else it just rerunning the type on the rest of the items.

/**
Returns a boolean for whether given two types are equal.
@link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
*/
type IsEqual<T, U> =
	(<G>() => G extends T ? 1 : 2) extends
	(<G>() => G extends U ? 1 : 2)
		? true
		: false;

type Includes<Value extends any[], Item> =
	IsEqual<Value[0], Item> extends true
		? true
		: Value extends [Value[0], ...infer rest]
			? Includes<rest, Item>
			: false;

```

- Push

```typescript
type Push<T extends any[], U> = [...T, U]
```

- Unshift

```typescript
type Unshift<T extends unknown[], U> = [U, ...T]
```

- Parameters

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
```

## Medium

- ReturnType

```typescript
type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : never
```

- Omit

```typescript
type MyExclude<T, U> = T extends U ? never : T
type MyOmit<T, U> = {
  [key in MyExclude<keyof T, U>]: T[key] 
}
// 2
type MyOmit<T, K extends keyof T> = {[P in keyof T as P extends K ? never: P] :T[P]}
```

- Readonly2

```typescript
type Readonly2<T, K> = {
  readonly [key in K]: T[k]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}
```

- Deep Readonly
- https://github.com/type-challenges/type-challenges/issues/52

```typescript
type DeepReadonly<T> = keyof T extends never ? T : {
  readonly [Key in keyof T]: DeepReadonly<T[Key]> : T[Key]
} 
```

- Tuple To Union

```typescript
type TupleToUnion<T extends readonly any[]> =  T[number]
type TupleToUnion<T> = T extends (infer Item)[] ? Item : never  

```

- Chainable Options

- https://github.com/type-challenges/type-challenges/issues/13951

- ```typescript
  type Chainable<T = {}> = {
    option: <K extends string, V>(key: K extends keyof T ?
      V extends T[K] ? never : K
      : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
    get: () => T
  }
  ```

- Last of Array

```typescript
type Last<T extends any[]> = [unknown, ...T][T['length']]
```

- Pop

```typescript
type Pop<T extends any[]> = T extends [...infer Rest, infer L] ? Rest : T
```

- Promise.all

```typescript
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T

declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [P in keyof T]: Awaited<T[P]>
}>
```

- LookUp

```typescript
type LookUp< T, U > =  T extends { type: U } ? T : never
```

- TrimLeft

```typescript
type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S
```

- Trim

```typescript
type Space = ' ' | '\n' | '\t'
type Trim<S extends string> = S extends `${Space}${infer T}` | `${infer T}${Space} ? Trim<R> : S
```

- Capitalize

```typescript
type Capitalize<T extends string> = T extends `${infer F}${infer R}` ? `${UpperCase<F>}${R}` ? T
```

- Replace

```typescript
type Replace<S extends string, From extends string, To extends string> = S extends '' ? S : 
S extends `${infer V}${From}${infer R}` ? `${V}${To}${R}` : S
```

- ReplaceAll

```typescript
type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer R1}${From}${infer R2}` ? `${infer R1}${From}${ReplaceAll<R2, From, To>}` : S
```

- Append Argument

```typescript
type AppendArgument<F extends (...args: any[]) => any, T> = Fn extends (...args: infer P[]) => infer R ? (...args: [...P, T]) => R : never 
```

- Permutation

- Length of String

```typescript
type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length'];
```

- Flatten

In this challenge, you would need to write a type that takes an array and emitted the flatten array type.

For example:

```typescript
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

```typescript
type Flatten<S extends any[], T extends any[] = []> =  S extends [infer X, ...infer Y] ? 
  X extends any[] ?
   Flatten<[...X, ...Y], T> : Flatten<[...Y], [...T, X]> 
  : T
```

- Append To object

Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field.

For example

```
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
```

```typescript
type AppendToObject<T, U extends keyof any, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};
```

- Absolute

Implement the `Absolute` type. A type that take string, number or bigint. The output should be a positive number string

For example

```
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

```typescript
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`
```

- String to Union

Implement the String to Union type. Type take string argument. The output should be a union of input letters

For example

```typescript
type Test = '123';
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

```typescript
type StrintToUnion<T extends string> = T extends `${infer Letter}${infer Rest}`
  ? Letter | StrintToUnion<Rest>
  : never;
```

- Merge

Merge two types into a new type. Keys of the second type overrides keys of the first type.

For example

```
type foo = {
  name: string;
  age: string;
}
type coo = {
  age: number;
  sex: string
}

type Result = Merge<foo,coo>;  // expected to be {name: string, age: number, sex: string}
```

```typescript
type Merge<W, V> = {
  [k in keyof W | keyof V]: k extends keyof W ? W[k] : k extends keyof V ? V[k] : never
}
```

- KebabCase

Replace the `camelCase` or `PascalCase` string with `kebab-case`.

```
FooBarBaz` -> `foo-bar-baz
```

For example

```
type FooBarBaz = KebabCase<"FooBarBaz">;
const foobarbaz: FooBarBaz = "foo-bar-baz";

type DoNothing = KebabCase<"do-nothing">;
const doNothing: DoNothing = "do-nothing";
```

```typescript
type KebabCase<T extends string> = T extends `${infer F}${infer R}` ? R extends Uncapitalize<R> ?  `${Uncapitalize<F>}${KebabCase<R>}`
  : `${Uncapitalize<F>}-${KebabCase<R>}`
  : T;

```

- Diff 

Get an `Object` that is the difference between `O` & `O1`

```typescript
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>
```

- Anyof

```typescript
type AnyOf<T> = T[number] extends 0 | '' | 'false' | [] | {{key: string}: never} ? false : true
```

- IsNever

```typescript
type IsNever<T> = Equal<T, never>
```

- ReplaceKeys

```typescript
type ReplaceKeys<U, T, Y> = {
  [K in keyof U]: K extends T ? K extends keyof Y ? Y[K] : never : U[K] 
}
```

- RemoveIndexSignature

```typescript
type RemoveIndexSignature<T> = {
  [k in keyof T as string extends k ? never : number extends k? never : symbol extends k ? never : k]: T[k]
}

```

- PercentageParser

```typescript
type CheckPrefix<T> = T extends '+' | '-' ? T : never;
type CheckSuffix<T> =  T extends `${infer P}%` ? [P, '%'] : [T, ''];
type PercentageParser<A extends string> = A extends `${CheckPrefix<infer L>}${infer R}` ? [L, ...CheckSuffix<R>] : ['', ...CheckSuffix<A>];
```

- DropChar

```typescript
type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}` ? DropChar<`${L}${R}`, C> : S;
```

- MinusOne

```typescript
```

- PickByType

```typescript
type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] }
```

- StartWith

```typescript
type StartsWith<T extends string, U extends string> = T extends `${U}${string}`?true:false
```

- EndWith

```typescript
type EndsWith<T,U extends string> = T extends `${infer f}${U}`? true : false
```

- PartialByKeys

```typescript
type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}

type PartialByKeys<T , K = any> = IntersectionToObj<{
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}>
```

- RequiredByKeys

```typescript
type RequiredByKeys<T, K extends keyof T> = Omit<T & Required<Pick<T, K & keyof T>>, never>
```

- Mutable

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}
```

- OmitByType

```typescript
type OmitByType<T, R> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}
```

- ObjectEntries

```typescript
type ObjectEntries<T, U = Required<T>> = {
  [K in keyof U]: [K, U[K] extends never ? undefined : U[K]]
}[keyof U]

// 方法2
type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>

type ObjectEntries<T> = RemoveUndefined<{
  [K in keyof T]: {} extends Pick<T, K> ? [K, RemoveUndefined<T[K]>] : [K, T[K]]
}[keyof T]>

// 方法3
type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>
type ObjectEntries<T> = {
  [K in keyof T]-?: [K, RemoveUndefined<T[K]>]
}[keyof T]
```

- Shift

```typescript
type  Shift<T extends unknow[]> = T extends [any, ...infer R] ? [...R] : T;
```

- TupleToNestedObject

```typescript
type TupleToNestedObject<T extends unknown[], U> = T extends [infer F,...infer R] ?
  {
    [K in F & string]: TupleToNestedObject<R, U>
  } : U
```

- Reverse

```typescript
type Reverse<T extends any[]> = T extends [infer F, ...infer Rest] ? [...Reverse<Rest>, F] : T;
```

- Flip Arguments

```typescript
type Reverse<T extends unknown[]> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : [];

type FlipArguments<T extends (...args: any[]) => any> = T extends (...args: infer P) => infer U 
? (...args: Reverse<P>) => U
: never;
```

- [FlattenDepth](https://github.com/type-challenges/type-challenges/issues/15373)

```typescript
type FlattenDepth<
  T extends any[],
  S extends number = 1,
  U extends any[] = []
> = U['length'] extends S
  ? T
  : T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...FlattenDepth<F, S, [...U, 1]>, ...FlattenDepth<R, S, U>]
    : [F, ...FlattenDepth<R, S, U>]
  : T
```

- BEM

```typescript
type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<U> = IsNever<U> extends true ? "" : U
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${IsUnion<`__${E[number]}`>}${IsUnion<`--${M[number]}`>}`
```

- InorderTraversal

```typescript
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type InorderTraversal<T extends TreeNode | null, NT extends TreeNode = NonNullable<T>> = T extends null
  ? []
  : [...InorderTraversal<NT['left']>, NT['val'], ...InorderTraversal<NT['right']>]
```

- Flip

```typescript
type Flip<T extends Record<string, string | number | boolean>> = {
  [P in keyof T as `${T[P]}`]: P
}
```

- Fibonacci

```typescript
type Fibonacci<T extends number, CurrentIndex extends any[] = [1], Prev extends any[] = [], Current extends any[] = [1]> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>
```



## Hard