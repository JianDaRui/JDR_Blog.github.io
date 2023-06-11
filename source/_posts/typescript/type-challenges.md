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





## Hard