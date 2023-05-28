---
title: 你必须掌握的 Typescript 常见类型操作
author: 剑大瑞
post: typescript
date: 2023-05-27 16:51:16
---

Typescript 的类型系统非常强大，它可以让你通过**类型操作符**基于现有的类型创建出新的类型。在面对复杂的类型需求的时候，可以通过下面的常见类型操作使类型创建更加简单、代码更加容易维护。

## 泛型

泛型主要是为了解决类型复用的问题。可以说泛型给了你在使用 ts 类型检测的体验同时，又提供了很好的类型扩展性、可维护性。

在使用泛型类型时，可以将泛型视为参数传给类型对象。在 ts 中 Array 就是一个非常常见的泛型类型。

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

通过上面泛型遍历函数的示例，可以知道，泛型就是一个类型可以接受另一个类型作为参数使用，只有在调用函数或者类型的时候才需要确定下具体的类型。在 ts 中，需要使用 `<>` 括号，作为泛型参数的承接对象。

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
  function: ['搬运', '说话']
  weigh: 100,
  price: 100,
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

当你使用泛型类型的时候，你会发现你可以将泛型视为任何类型。这就会导致有些超出预期的错误。

例如想写一个可以读取任意类型数组 length 属性的泛型函数：

```typescript
function arrayLength<T>(array: T): number {
  return array.length
}
```

你会发现编译器会提示出错。我们在写的时候，内心假定的 array 是一个数组。但是 ts 编译器会将 T 泛型视为任意类型。这就意味具体调用 arrayLength时， array 可能是非数组类型，并没有 length 属性。这时你可以这么写：

```typescript
function arrayLength<T>(array: T[]): number {
  return array.length
}
```

或者说声明一个接口类型，通过接口类型描述我们对泛型的属性约束，并使用 extends 关键字对泛型进行约束。

```typescript
interface List {
  length: number;
}
function arrayLength<T extends List>(array: T[]): number {
  return array.length
}
```

extends 关键字在 ES6 中，可以用于类之间的继承。而在 ts 中 extends 关键字不仅可以作用于类之间的继承，还可以：

- 作用于接口类型之间的继承

```typescript
interface Animal {
  name: string;
  heigh: number;
  weigh: number;
}

interface Person extends Animal {
  language: string
}
```

这时 Person 类型会拥有 Animal 类型的所有属性。

- 结合接口类型，对泛型进行约束

```typescript
interface Animal {
  name: string;
  heigh: number;
  weigh: number;
}

function animalName<T extends Animal>(animal: T): string {
  return animal.name
}
```

- 结合三元运算符，进行类型判断

```typescript
interface Animal {
  name: string;
  heigh: number;
  weigh: number;
}

interface Person extends Animal {
  language: string
}

type isPerson = Person extends Animal ? true : false // true
```

### 使用类型参数对泛型进行约束

在 ts 中你可以使用泛型参数对另一个泛型进行约束。

```typescript
function getKey2ValueMap<T, Key extends keyof T>(obj: T, key: Key): T[keyof T] {
  return obj[key]
}

interface Animal {
  name: string;
  heigh?: number;
  weigh?: number;
}

const dog: Animal = {
  name: '八公'
}

getKey2ValueMap(dog, 'name') // Ok
getKey2ValueMap(dog, 'heigh') // Ok
getKey2ValueMap(dog, 'age') // Error
```

上面示例中，我们通过 `Key extends keyof T` 对泛型 Key ，进行了类型约束。keyof T 操作会返回所有 T 类型的属性的联合类型，这会将 key 约束在 T 的属性类型范围之中。

### 在泛型描述 class 类型

当你使用工厂模式时，需要使用泛型函数接受一个泛型类来实现。

- 使用匿名类型：

```typescript
function createFactory<Type>(c: { new(): Type }): Type {
  return new c();
}
```

- 使用类型别名创建泛型类：

```typescript
type Animal = {
  new<T>(): T
}

function createFactory<Type>(c: Animal): Type {
  return new c();
}
```

- 使用接口创建泛型类：

```typescript
interface Animal {
  new<T>(): T
}

function createFactory<Type>(c: Animal): Type {
  return new c();
}
```

在 ts 中使用 class 关键字创建的类，也是一种类型对象，可以直接当做类型对象，对实例对象进行约束。

```typescript
class Animal {
  count: number = 10
}
const animal: Animal = new Animal()
```

在处理类之间的继承关系时，则可以通过类类型对类实例进行约束：

```typescript
class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal {
  numLegs: number = 4;
}
 
class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```



## keyof 操作符

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

对于对象类型 key 是 数字或者字符串的情况，`keyof` 会返回下面的情况：

```typescript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // type A = number
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // type M = string | number
```

为什么会有 `keyof` ?

在 js 中我们经常需要通过 `obj[key]` 的形式去动态访问对象的某个属性。这个时候如果没有对象上并不存在某个 key，并且没有对 key 做类型约束，很可能导致 bug 的产生。

比如：

```typescript
console.log(person['gender'])
```

Person 类型并不存在 gender 属性。

在已经声明 Person 类型的情况下，直接使用  keyof 生成 Keys 对动态 key 进行类型约束会更加安全。

## typeof 操作符

在 js 中我们可以通过 `typeof` 判断一个值的类型：

```javascript
typeof 'darui' // string
```

ts 中也添加了 `typeof`，主要用于对类型上下文进行判断，可以使用 `typeof` 创建一个新的类型：

```typescript
const name: string = 'darui'
const name2: typeof name = 'person2' // 相当于 const name2: string = 'person2'

const person = {
  name: name,
  age: 18
}
type Person = typeof person

const person2: Person = {
  name: name2,
  age: 18
}


```

上面我们使用 `typeof` 创建了一个新的类型 Person。Person 类型相当于：

```typescript
type Person = {
  name: string;
  age: number;
}
```

从上面示例来看，`typeof` 的操作和 `keyof` 的操作都非常简单。但是当你将这两个结合起来或者与其他工具类型结合起来时，可以产生很多种模式。

获取 person 的 key 的联合类型：

```typescript
type Keys = keyof typeof person;
```

相当于：

```typescript
// 相当于
type Keys = 'name' | 'age'
```

类型系统会从右到左进行计算，首先是：

```typescript
type Person = typeof person
```

最后是：

```typescript
type Keys = keyof Person
```

创建一个函数类型：

```typescript
function f() {
  return { x: 10, y: 3 };
}
type Fn = typeof f // 相当于 () => { x: number; y: number; }
```

注意在 ts 中并不支持直接通过 `typeof` 去推测一个函数的返回类型：

```typescript
function f() {
  return { x: 10, y: 3 };
}
type Fn = typeof f() // Error
```

这是为了避免产生误导，当你想这么写的时候，无法确定这是一次函数执行操作函数还是类型返回操作。

## 下标操作符

在 js 中我们可以通过动态的 key 访问对象类型的属性值，例如：

```javascript
const person = {
  name: 'darui',
  age: 18,
  high: 180,
}
Object.keys(person).forEach(key => {
  // 动态访问属性值
  console.log(person[key])
})
```

ts 也实现了这一操作，使其可以作用于类型系统中，例如：

```typescript
type Person = {
  name: string;
  age: number;
  isMan: boolean;
}

type Name = Person['name'] // string

type NameAndAge = Person['name' | 'age'] // string | number
```

通过示例可以知道，**可以通过给类型对象传递一个属性字符串或者属性联合类型，从而获取其属性值类型或者其属性值联合类型。**

结合 keyof，一次性获取其所有属性值的类型：

```typescript
type ValueType = Person[keyof Person] // string | number | boolean
```

## 条件类型

在 ts 在可以通过 `extends` 关键字，判断一个类型是否继承于另一个类型，并基于此判断去返回一个新的类型。

```typescript
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
 
type Example1 = Dog extends Animal ? number : string;
        
type Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;
```

可以抽象为：

```typescript
type ResultType = SomeType extends OtherType ? TrueType : FalseType
```

条件类型结合泛型可以实现根据输入类型的情况动态的进行类型判断。

```typescript
function fn<T, T extends Animal ? number : string>(a: T, b: T) {
  //...
}
```

以 createLabel 函数为例

```typescript
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
 
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```

上面对 createLabel 函数进行了重载，createLabel 函数重载的主要目的是*可以根据输入的参数类型，返回对应的 Label 类型*。上面的重载处理思路可能会有以下问题：

- 在这里 createLabel 函数已经重载了三次，如果 createLabel 函数需要再处理一种新增类型，按这个思路还需再次增加重载声明。

如果使用条件类型 & 泛型实现，思路：需要根据执行函数 createLable 时传入的类型判断其是否是 number 类型，如果是 number 类型则输出类型为 IdLabel，否则为 NameLabel。

手写写一个可以根据泛型获取返回类型的类型。

```typescript
typeof NameOrId<T> = T extends number ? IdLabel : NameLabel
```

上面的判断还有些安全问题。

其实 createLabel 函数需要处理的只有 number、string 类型，这意味着在给 NameOrId 传入泛型的时候就需要对其进行约束处理。

```typescript
type NumOrStr = number | string

typeof NameOrId<T extends NumOrStr> = T extends number ? IdLabel : NameLabel
```

改写 createLabel 函数为泛型函数：

```typescript
function createLabel<T extends NumOrStr>(nameOrId: T): NameOrId<T> {
  throw "unimplemented";
}
```

### **约束条件类型**

通常，通过类型检测我们可以知道一个类型上已有的信息，向我们常见的一些类型守卫可以做到类型收窄，让我们获取到的类型更加具体。在条件类型中，也可以通过为 true 的分支进一步帮我们做到类型收窄。

我想写一个 Message 类型，Message 可以接受一个泛型，其主要作用是从泛型上读取泛型的 "message" 属性的类型。

你可能这么写：

```typescript
type Message<T> = T['message']
```

但是这种情况会导致 ts 报错。这时可以通过泛型约束解决这个问题：

```typescript
type Message<T extends { message: unknown }> = T['message']
```

然而我们的预期是 Message 类型可以接受任意类型的泛型信息，当泛型上没有 message 属性时，则返回 never。我们可以将约束条件移动到条件判断中：

```typescript
type Message<T> = T extends { message: unknown } ? T['message'] : never

type Person = { 
	message: string
}
type Dog = {
  woofo: string
}
// 使用
type PersonMessage = Message<Person> // string
type DogMessage = Message<Dog> // never
```

当  `T extends { message: unknown }` 为 true 时，ts 可以明确判断到 T 上存在 message 属性。

我们再以一个  Flattern 类型为例，Flattern 类型可以获取数组类型的元素类型，并对于非数组类型的直接返回其本身。

```typescript
type Flatten<T> = T extends any[] ? T[number] : T;
 
// Extracts out the element type.
type Str = Flatten<string[]>; // string
     
// Leaves the type alone.
type Num = Flatten<number>; // number
```

在上面代码示例中，通过给 Flatten 一个数组类型，它使用 number 索引来获取 string[] 的元素类型。否则对于其他类型，它只返回其本身。

### 在条件类型中使用 infer 关键字进行类型推断操作

在上面的示例中我们通过 T[number] 的形式，直接手动的通过索引去访问元素类型。

在 ts 中，提供了 infer 关键字，支持显示声明一个泛型类型变量，可以代替上面手动访问的方式，可以避免我们必须去了解目标类型的结构。

```typescript
type Flatten<T> = T extends Array<infer Item> ? Item : T;
```

使用 infer 获取函数的返回类型：

```typescript
type GetReturnType<T> = T extends (...args: never[]) => infer Return ? Return : never 

type Num = GetReturnType<() => number> // string

type Str = GetReturnType<(x: string) => string> // string

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]> // boolean[]
```

Infer 关键字在针对多次声明的类型签名时，比如函数重载，总是会按照最全面的情况进行推断。

```typescript
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
 
type T1 = ReturnType<typeof stringOrNum>;
```

### 条件类型的分配问题

条件类型和泛型一起使用的时候，当给定的泛型是一个联合类型，则会发生类型分配。我们声明这么一个类型，可以将传入的泛型类型转为数组类型。

```typescript
type ToArray<T> = T extends any ? T[] : never

type NumberArray = ToArray<number> // number[]
type StringArray = ToArray<string> // string[]
```

如果我们给 ToArray 传入一个联合类型的时候:

```typescript
type StrArrOrNumArr = ToArray<number | string> // string[] | number[]
```

返回的 StrArrOrNumArr 是 `string[] | number[]` 类型。本质上相当于，我们传递给 ToArray 的 `number | string 的执行操作是： `ToArray<number>  |  ToArray<string>`，最总返回给我们的结果自然是 `string[] | number[]`

如果想要避免分配操作，获取 `(string | number) []`。需要使用方括号将 extends 关键字两端的类型包裹起来:

```typescript
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

type StrArrOrNumArr = ToArrayNonDist<string | number>; //  (string | number)[]
```

## 映射类型

映射类型可以在声明类型时，避免进行一些重复性工作。

```typescript
type OnlyBoolean = {
  [key: string]: boolean
}

const Authority: OnlyBoolean = {
  home: true,
  preview: false,
  detail: true
}
```

示例代码通过类型的下标签名声明了一个 key 为字符串，值为 boolean 的类型。避免了需要声明所有 Authority 对象属性都为 boolean 的情况。

- 结合泛型，实现一个可以将一个类型的所有 key 转为 boolean 类型的工具类型：

```typescript
type TurnBoolean<T> = {
  [Key in keyof T]: boolean
}

type Person = {
  name: string;
  age: number;
  heigh: number;
}

type PersonToBoolean = TurnBoolean<Person>

// 相当于
type PersonToBoolean =  {
  name: boolean;
  age: boolean;
  heigh: boolean;
}
```

- keyof 关键字可以获取类型所有属性的联合类型，以 Person 为例 `keyof T` 操作，得到的是 `name | age | heigh`。
- 在下标签名中，通过显示的声明一个泛型 `Key` 并结合 `in` 操作符，对上面获取的属性联合类型进行遍历迭代，从而获取到目标类型。
- 从上面的过程其实可以看出，映射类型其实是一种泛型，它基于获取到的所有属性的联合类型，进行遍历操作，从而实现创建新的类型

```typescript
type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
type FeaturesToBoolean = TurnBoolean<Features>
// 相当于
type FeatureOptions = {
    darkMode: boolean;
    newUserProfile: boolean;
}
```

### 通过映射修饰符修改原类型

首先要知道:

- `readonly` 修饰符关键字，可以设置类型属性为只读。
- `?` 修饰符，可以设置类型属性是否可选

```typescript
type Person = {
  id: string
  readonly name: string
  readonly age: number
  heigh?: number
}

const person: Person = {
  id: '001',
  name: 'Joy',
  age: 18,
}

const person2: Person = { // Error Property 'id' is missing in type 
  name: 'Joy',
  age: 18,
}

person.name = 'joey' // Error Cannot assign to 'name' because it is a read-only property.
```

- 在属性修饰符前添加 `-` 或者 `+` 前缀，再结合映射类型，可以实现对类型属性修饰符的修改操作。
- `-` 操作符可以移除属性修饰符、`+` 操作符可以实现添加属性修饰符操作

下面实现一个 CreateMutable 类型，可以移除泛型的所有属性的 `readonly` 修饰符

```typescript
type CreateMutable<T> = {
  -readonly [Property in keyof T]: T[Property];
};
 
type LockedAccount = {
  readonly id: string;
  readonly name: string;
};
 
type UnlockedAccount = CreateMutable<LockedAccount>;

// 相当于
type UnlockedAccount = {
    id: string;
    name: string;
}
```

- 示例代码通过在工具类型 `CreateMutable` 的映射类型下标签名的 `readonly` 关键字前添加前缀 `-`，实现了移除泛型所有属性的只读修饰。

实现移除所有属性可选修饰符的类型 Concrete ：

```typescript
type Concrete<T> = {
  [Property in keyof T]-?: T[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
 
type User = Concrete<MaybeUser>;
// 相当于
type User = {
    id: string;
    name: string;
    age: number;
}
```

- 示例代码通过在工具类型 `Concrete` 的映射类型下标签名的 `?`修饰符前添加前缀 `-`，实现了移除泛型所有属性的可选性。

### 映射类型结合 `as` 关键字实现对属性重命名

通过上面的代码示例，可以知道：

- 在映射类型的属性签名中通过 `in` 关键字和 `keyof` 关键字，可以实现对泛型属性的遍历操作。

所以试想一下我们能否通过遍历操作，对属性进行重命名？

在 ts 4.1 版本之后就提供了对这一特定的支持。我们可以在映射类型的属性签名中使用 `as` 关键字实现对属性的重命名。

```typescript
type MappedTypeWithNewProperties<T> = {
    [Properties in keyof T as NewKeyType]: T[Properties]
}
```

上面示例代码，`MappedTypeWithNewProperties` 对传出的泛型进行处理后，产生的新的类型所有属性都会以 `NewKeyType` 进行命名。

这里结合模板字符串，基于泛型的先前属性名创建新的属性名：

```typescript
type GettersPrefix<T> = {
    [Property in keyof T as `get_${string & Property}`]: () => T[Property]
};
 
interface Person {
    name: string;
    age: number;
    location: string;
}
 
type LazyPerson = GettersPrefix<Person>;
// 相当于
type LazyPerson = {
    get_name: () => string;
    get_age: () => number;
    get_location: () => string;
}
```

### 映射类型结合条件类型操作符

映射类型可以结合条件类型实现一些更高阶的操作。下面 `ExtractPII` 实现了通过条件类型，更改特定属性值类型的操作：

```typescript
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
 
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
 
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
```

## 模板字符串类型

在 ts 中可以使用模板字符串声明类型。在使用模板字符串时，可以通过在字符串的插值位置插入其他类型，创建出其他类型。

我们声明一个 Group 类型，它的所有属性键都是 group + number 的形式：

```typescript
type Group = {
  group1: string;
  group2: string;
  group3: string;
}
```

如果说 Group 中的属性值可能会出现 `group1 => group100+` 的情况。显然我们直接在写 group1 到 group100 是不现实的。

这里我们可以使用模板字符串类型解决这个问题：

```typescript
type groupKey = `group${number}`

type Group = {
  [key: groupKey]: string;
}

const group: Group = { // Ok
  group1: '1',
  group2: '1',
  group3: '1',
  group4: '1',
  group5: '1',
  group6: '1'
}
```

示例代码中，在模板类型的插值括号中插入了 number 类型，从而实现了一个属性键 group 逐渐递增的类型对象。

### 在插值位置传入一个联合类型

当在插值位置传入一个联合类型的时候，可以获得一个经过拼接后的联合类型：

```typescript
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// 相当于
type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

`AllLocaleIDs` 类型是插值位置传入的两个联合类型的所有可能出现的字符串字面量集合。

当存在多个插值位置，每个位置都有联合类型的时候，产生的模板类型将是所有联合类型的交叉联合类型。

```typescript
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
 
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// 相当于
type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
```

### 在类型中使用字符串模板

当需要基于原有类型的内部信息重新定义一个新的字符串的时候，才能体会到模板字符串的强大之处。

考虑这么一种需求，有个 `makeWatchedObject` 函数可以给传入的对象添加 `on()` 函数的情况。使用时只需调用 `makeWatchedObject(baseObject)` 即可。

```typescript
const baseObject = {
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
}
```

`on` 函数可以接受两个参数：

- 一个是 string 类型的 eventName，`eventName` 的形式应该是 baseObject 的属性 key + "Changed"，例如，`firstNameChange` 从 baseObject 中的属性 firstName + "Changed" 派生而来。

- 一个是可以做逻辑处理的 callback function。

  - callback 函数接受的参数应该与 baseObject 的属性值类型相对应。例如，当触发 `firstNameChange` 时，

    应该传 string 类型。当触发 `ageChange` 时，应该传 number 类型

  - callback 返回 void 类型

正常情况下 `on()` 函数签名应该是：

```typescript
on(eventName: string, callback: (newValue: any) => void)
```

但是我们上面明确需要对 eventName 和 callback 接受的参数进行类型约束。期望最终的实现满足：

```typescript
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});
 
// makeWatchedObject has added `on` to the anonymous Object
person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});
```

过程分析：

- 首先 `makeWatchedObject` 函数接受一个类型，并在保留这个类型所有类型属性的前提下添加了一个新的属性 `on`

  `on` 是一个函数，返回 void 类型，不考虑约束的情况下，格式是 `(eventName: string, callback: (value: any) => void) => void`

```typescript
// 接受的类型
type BaseType = {
  firstName: string;
  lastName: string;
  age: number
}

// makeWatchedObject 返回的类型
type FinalType = {
  firstName: string;
  lastName: string;
  age: number;
  on: (eventName: string, callback: (value: any) => void) => void
}
```

我们可以声明一个带有 on 的类型，使用 `&` 交叉类型来创建返回的新类型：

```typescript
type PropEventSource<T> = {
  on(EventName: string, callback: (value: any) => void): void
}

type FinalType<T> = BaseType & PropEventSource<T>
```

`makeWatchedObject` 返回的就是 `FinalType<T>` 类型

- `PropEventSource<T>` 还需要进行类型约束。我们需要对 `on()` 函数的第一个参数和回调函数进行约束。使用模板字符串类型改写 on 函数参数类型：

```typescript
type PropEventSource<T> = {
  on(EventName: `${keyof T}Changed`, callback: (value: any) => void): void
}
```

发现上面 `${keyof T}Changed` 报错，这是因为 `keyof T ` 可能获取到任意类型，比如 `symbol`，`symbol`类型是不能被用于模板字符串的。需要将 `keyof T` 转为 string 类型。

```typescript
type ToString = string & (string | number | boolean | symbol | bigint | never | null | undefined) // string

type PropEventSource<T> = {
  on(EventName: `${string & keyof T}Changed`, callback: (value: any) => void): void
}
```

> 上面是对 `&` 交叉类型的补充。两个不相交的类型使用 `&` 为 `never`，never 为所有类型子类型；相同的两个类型使用 `&` 不变。所以上面，最终会保留下 string 类型。

- 完善 callback 类型约束。上面对 `callback` 参数 `value` 的类型使用的 `any` ，与需求不符。我们最终期望的是，当监听 `firstNameChange` 事件时，`callback` 接受的参数是 `string` 类型；当监听 `ageChange` 事件时，`callback` 接受的参数是 `number` 类型。
  - 这意味着 on 函数是一个泛型函数：`on<Key>(EventName: `${string & keyof T}Changed`, callback: (value: T[Key]) => void): void`
  - 但是我们需要对泛型 `Key` 进行约束， `Key` 必须存在于泛型 `T` 的所有属性集合中。
  - 因此可以使用 `keyof T` 获取所有泛型 `T` 的属性集合。
  - 使用 `extends`，对泛型 `Key` 进行约束：` Key extends <string & keyof T>`
- 改写类型 `PropEventSource` :

```typescript
type PropEventSource<T> = {
    on<Key extends string & keyof T>
        (eventName: `${Key}Changed`, callback: (newValue: T[Key]) => void): void;
};
```

最终代码：

```typescript
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};
 
type FinalType<T> = BaseType & PropEventSource<T>

declare function makeWatchedObject<Type>(obj: Type): FinalType<T>;
 
const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});
 
person.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
}); // Ok
 
person.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
}) // Ok

// Prevent easy human error (using the key instead of the event name)
person.on("firstName", (value: string) => {}); // Error

// It's typo-resistant
person.on("firstNameChanged", () => {}); // Error

person.on("ageChanged", (newAge: boolean) => { 
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
}) // Error
```

至此，我们完成了一个满足需求的类型 `FinalType`。

相信到这里你对模板字符串类型的强大功能又有了更深的理解。

### Ts 内置的模板字符串操作类型

Ts 内置了几种常见的字符串操作工具类型：

- Uppercase<StringType>：将字符串中的每个字母转大写格式

```typescript
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
// 相当于
type ShoutyGreeting = "HELLO, WORLD"

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// 相当于      
type MainID = "ID-MY_APP"
```

- Lowercase<StringType>：将字符串中的每个字母转为小写格式

```typescript
type QuietGreeting = Lowercase<ShoutyGreeting>
// 相当于
type QuietGreeting = "hello, world"
 
type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`
type MainID = ASCIICacheKey<"MY_APP">
// 相当于
type MainID = "id-my_app"
```

- Capitalize<StringType>：将字符串首字母转为大写格式

```typescript
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// 相当于
type Greeting = "Hello, world"
```

- Uncapitalize<StringType>：将字符串首字母转为小写格式

```typescript
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// 相当于
type UncomfortableGreeting = "hELLO WORLD"
```



完！

参考：

- https://www.typescriptlang.org/docs/handbook

