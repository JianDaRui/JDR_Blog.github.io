# 你必须掌握的 Typescript 常见类型操作

Typescript 的类型系统非常强大，它可以让你通过**类型操作符**基于现有的类型创建出新的类型。在面对复杂的类型需求的时候，可以通过下面的常见类型操作使类型创建更加简单、代码更加容易维护。

## 泛型

泛型主要是为了解决类型复用的问题。可以说泛型给了你在使用 ts 类型检测的体验时，又提供了很好的类型扩展性，、可维护性。在使用泛型类型时，可以将泛型视为参数传给类型对象。在 ts 中 Array 就是一个非常常见的泛型类型。

声明一个字符串数组：

```typescript
let stringList: string[] = ['a', 'b']
```

使用泛型声明：

```typescript
let stringList: Array<string> = ['a', 'b']
```

泛型可以被使用在类型别名、接口、函数、类中。

### 泛型函数

使用  ts 写一个可以处理各种类型数组遍历的函数，如果不使用泛型，你可能需要单独多个类型的数组遍历操作。或者通过函数重载来实现，想想都麻烦~。如果使用泛型的话，如下。

```typescript
function forEach<T>(array: T[]): void {
  for(let i = 0; i < array.length; i++) {
    console.log(array[i])
  }
}
// number 类型
forEach<number>([1,2,3,4,5])
// string 类型
forEach<string>(['a','b','c','d','e'])
```

通过上面泛型遍历函数的示例，可以知道，泛型就是一个类型可以接受另一个类型作为参数使用。在 ts 中，需要使用 <> 括号，作为泛型参数的承接对象。

### 泛型类型推断

还是以上面的函数法为例：

```typescript
forEach([false, true, false]) // ok
```

在调用 forEach 的时候并没有传递泛型类型。但是 ts 编译结果正常通过。这是因为 ts 会根据参数的类型推断出一个类型作为泛型使用。这个特性使我们的代码更加简洁。

### 泛型类型

- 声明一个泛型类型

```typescript
type Robot<T> = {
  function: T[],
  weigh: number,
  price: number
}

const wali: Robot<string> = {
  weigh: 100,
  price: 100,
  function: ['搬运', '说话']
}
```

- 声明一个泛型接口

```typescript
interface Robot<T> {
  function: T[],
  weigh: number,
  price: number
}
const wali: Robot<string> = {
  weigh: 100,
  price: 100,
  function: ['搬运', '说话']
}
```

- 改写上面的 forEach 函数：

```typescript
function forEach<T>(array: T[]): void {
  for(let i = 0; i < array.length; i++) {
    console.log(array[i])
  }
}

// 使用匿名类型
const myForeach: <T>(array: T[]) => void= forEach
```

- 使用匿名类型：

```typescript
// 使用匿名类型
const myForeach: { <T>(array: T[]): void } = forEach
```

- 使用类型别名：

```typescript
type Foreach = {
  <T>(array: T[]): void
}
const myForeach: Foreach = forEach
```

- 使用 interface：

```typescript
interface Foreach {
  <T>(array: T[]): void
} 
const myForeach: Foreach = forEach
```

注意上面通过 type、interface 创建的函数类型并没有在类型名称旁边通过 `<>` 传递泛型。

通过上面几个示例，可以知道泛型在函数或者对象中的使用方式

- 传递多个泛型

```typescript
function forEach<T, R>(array: T[], handle: (item: T) => R): void {
  for(let i = 0; i < array.length; i++) {
    handle(array[i])
  }
}
```

### 泛型类

使用泛型创建一个泛型类。

```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

### 泛型约束

### 在类型参数中使用泛型约束

### 在泛型描述 class 类型

### 给泛型参数设置默认值

## Keyof 操作符

使用 keyof 操作符可以获取一个对象类型的所有 key 或 数字字面量组合的联合类型。比如

```typescript
type Person = {
  name: string
  age: number
  heigh: number
  weigh: number
}

type Keys = keyof Person // 'name' | 'age' | 'heigh' | 'weigh'
```

获取的 Keys 和 `'name' | 'age' | 'heigh' | 'weigh'` 等价。通常在代码中需要通过 key 遍历对象或者判断属性时，可以使用。

```typescript
function print(obj: Person, key: Keys) {
  console.log(obj[key])
}
```

对于对象类型 key 是 数字或者字符串的情况，keyof 会返回下面的情况：

```typescript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // type A = number
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // type M = string | number
```

为什么会有 keyof ?

在 js 中我们经常需要通过 obj[key] 的形式去动态访问对象的某个属性。这个时候如果没有对象上并不存在某个 key，并且没有对 key 做类型约束，很可能导致 bug 的产生。

比如：

```typescript
console.log(person['gender'])
```

Person 类型并不存在 gender 属性。

在已经声明 Person 类型的情况下，直接使用  keyof 生成 Keys 对动态 key 进行类型约束会更加高效简洁。

## Typeof 操作符

在

## 下标操作符

## 条件类型

## 映射类型

## 模板类型



参考：

- https://www.typescriptlang.org/docs/handbook

