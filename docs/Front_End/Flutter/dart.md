<!--
 * @Author: your name
 * @Date: 2020-09-12 15:41:52
 * @LastEditTime: 2020-09-14 20:23:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JDR_Blog\docs\Front_End\Flutter\dart.md
-->
# Dart 学习流水账
语言特点: 
## 变量
- var 声明变量,通过var声明的变量,会对变量进行类型推断,如果变量储存的是数字类型,则只能设置数字类型

```dart
var name = "daRio"
```
- const 声明常量,常量一旦声明便不可更改
```dart
const gender = "男"
```
- final声明的变量只能被设置一次.
```dart
final name = 'DaRio'; // 没有声明变量类型
final String nickname = 'Bobby';
```
- 类型 + 变量名
```dart
String name="daRio"
int age=18
```
- 默认值,如果一个变量声明了但是并没有赋值,则为null

> 使用过程中从来不会被修改的变量， 可以使用 final 或 const, 而不是 var 或者其他类型， Final 变量的值只能被设置一次； Const 变量在编译时就已经固定 (Const 变量 是隐式 Final 的类型.) 最高级 final 变量或类变量在第一次使用时被初始化。

## 内置数据类型
- **Number**
 - int 正数数值不大于64位
 - double 64位（双精度）浮点数，依据 IEEE 754 标准

```dart
int age=18
double salary=20.20 // 小目标

// 字符串转数字
// String -> int
var age = int.parse('18');
// String -> double
var salary = double.parse('20.20');
assert(salary == 20.20);
```

- `String` 通过单引号或者双引号创建
 - `${expression}` 模板字符串,类似于JS的模板字符串
 - '''或者""", 可实现多行字符串创建,省区Js(+)的麻烦
 - 使用 r 前缀，可以创建 “原始 raw” 字符串

```dart
// int -> String
String age = 18.toString();
assert(age == '18');

// double -> String
String salary = 20.209999.toStringAsFixed(2);
assert(salary == '20.20');

// $ 与 ${}
String aboutMe='剑大瑞永远 $age 岁'

String aboutMeAgain='剑大瑞永远 ${int.parse(age)} 岁'

String  famousRemark = '''
                        故天将降大任于是人也，
                        必先苦其心志，
                        劳其筋骨，
                        饿其体肤，
                        空乏其身，
                        行拂乱其所为，
                        所以动心忍性，
                        曾益其所不能。
                      '''
```
- **Boolean**. 只有字面量 `true` and `false` 是布尔类型

```dart
// 检查空字符串。
var myName = '';
assert(fullName.isEmpty);

// 检查 0 值。
var hitPoints = 0;
assert(hitPoints <= 0);

// 检查 null 值。
var unicorn;
assert(unicorn == null);

// 检查 NaN 。
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);

```
- **List**. 相当于Js的Array. 既然是数组就少不了*添加 / 修改 / 删除 / 遍历* .
 - 属性
  1. length,返回list长度
  2. isEmpty,判断数组是否是空
  3. isNotEmpty, 判断数组是否非空
  4. first, 返回数组第一个元素
  5. last, 返回数组最后一个元素
  6. reversed, 翻转数组
  7. runtimeType, 返回数组元素类型
 - 方法
  1. add, 将一个元素放进数组,
  2. addAll, 将一个可迭代对象放进数组
  3. any, 
  4. clear, 清空数组
  5. every, 遍历数组中的每一个元素, 判断其是否满足传入的函数
  6. expand, 
  7. contains, 判断数组是否包含某个元素
  8. forEach, 遍历数组
  9. sort, 排序
  10. removeRange, 移除指定范围内的元素
  11. removeLast, 移除数组中的最后一个元素
  12. reduce, 遍历并压缩数组
  13. map, 遍历数组,并返回一个新的数组
  14. sublist, 返回指定范围内的元素组成的数组
  ... 
 

- **Set**

- **Map**

- **Rune**

- **Symbol**

- 字典
```dart
var name = 123
```