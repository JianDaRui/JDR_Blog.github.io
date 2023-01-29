原型链继承，
  将父类的实例作为子类的原型，他的特点是实例是子类的实例也是父类的实例，
  父类新增的原型方法/属性，子类都能够访问，并且原型链继承简单易于实现，
  缺点是来自原型对象的所有属性被所有实例共享，无法实现多继承，无法向父类构造函数传参。
构造继承，
  使用父类的构造函数来增强子类实例，即复制父类的实例属性给子类，
  构造继承可以向父类传递参数，可以实现多继承，通过call多个父类对象。
  但是构造继承只能继承父类的实例属性和方法，不能继承原型属性和方法，
  无法实现函数服用，每个子类都有父类实例函数的副本，影响性能
实例继承，
  为父类实例添加新特性，作为子类实例返回，实例继承的特点是不限制调用方法，
  不管是new 子类（）还是子类（）返回的对象具有相同的效果，缺点是实例是父类的实例，
  不是子类的实例，不支持多继承
拷贝继承：
  特点：支持多继承，缺点：效率较低，内存占用高（因为要拷贝父类的属性）无法获取父类不可枚举的方
  法（不可枚举方法，不能使用for in访问到）
组合继承：
  通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
寄生组合继承：
  砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

// 组合继承
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // t

// 计生组合继承
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true

// 借助call
function Parent1(){
  this.name = 'parent1';
}
function Child1(){
  Parent1.call(this);
  this.type = 'child1'
}
console.log(new Child1);

// 原型链继承， 
function Parent2() {
  this.name = 'parent2';
  this.play = [1, 2, 3]
}
function Child2() {
  this.type = 'child2';
}
Child2.prototype = new Parent2();

console.log(new Child2());

// 组合继承 
function Parent3 () {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}
function Child3() {
  Parent3.call(this);
  this.type = 'child3';
}
Child3.prototype = new Parent3();
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);

// 组合继承优化
function Parent4 () {
  this.name = 'parent4';
  this.play = [1, 2, 3];
}
function Child4() {
  Parent4.call(this);
  this.type = 'child4';
}
Child4.prototype = Parent4.prototype;

// 组合继承优化2
function Parent5 () {
  this.name = 'parent5';
  this.play = [1, 2, 3];
}
function Child5() {
  Parent5.call(this);
  this.type = 'child5';
}
Child5.prototype = Object.create(Parent5.prototype);
Child5.prototype.constructor = Child5;

// Object.create 实现
function myCreate(o){
  function F(){};
  F.prototype = o;
  o = new F();
  return o;
}

// 计生组合式 继承
function inheritPrototype(subType, superType){
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance2.colors.push("3"); // ["red", "blue", "green", "3"]