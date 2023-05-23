# 你必须掌握的 Typescript 常见类型操作

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

在已经声明 Person 类型的情况下，直接使用  keyof 生成 Keys 对动态 key 进行类型约束会更加安全。

## typeof 操作符

在 js 中我们可以通过 typeof 判断一个值的类型：

```javascript
typeof 'darui' // string
```

ts 中也添加了 typeof，主要用于对类型上下文进行判断，可以使用 typeof 创建一个新的类型：

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

上面我们使用 typeof 创建了一个新的类型 Person。Person 类型相当于：

```typescript
type Person = {
  name: string;
  age: number;
}
```

从上面示例来看，typeof 的操作和 keyof 的操作都非常简单。但是当你将这两个结合起来或者与其他工具类型结合起来时，可以产生很多种模式。

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

注意在 ts 中并不支持直接通过 typeof 去推测一个函数的返回类型：

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

在 ts 在可以通过 extends 关键字，判断一个类型是否继承于另一个类型，并基于此判断去返回一个新的类型。

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

上面对 createLabel 函数进行了重载，createLabel 函数重载的主要目的是可以根据输入的参数类型，返回对应的 Label 类型。上面的重载处理思路可能会有以下问题：

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

在 ts 中，提供了 infer 关键字，支持你显示的声明一个泛型类型变量，可以代替上面手动访问的方式，可以避免我们必须去了解目标类型的结构。

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

## 模板类型



参考：

- https://www.typescriptlang.org/docs/handbook

