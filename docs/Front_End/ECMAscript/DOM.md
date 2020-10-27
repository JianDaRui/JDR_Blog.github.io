<!--
 * @Author: your name
 * @Date: 2020-08-29 18:41:57
 * @LastEditTime: 2020-10-21 17:31:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JDR_Blog\docs\Front_End\ECMAscript\DOM.md
-->
#《<JavaScript DOM 编程艺术》总结

> DOM是什么？
>
> 全称 Document Object Model，是一套对文档内容进行抽象和概念化的方法。

## 节点

- 元素节点，HTML元素
- 文本节点，HTML元素内的文本
- 属性节点，用以对元素做出更具体的描述
- CSS，用以设计浏览器中文档的显示样式
  - class属性，一类，可以有多个
  - id属性，独一无二

## 获取元素

主要方法：通过Id获取、通过class获取、通过标签获取

- `document.getElementById()`，返回对应元素Id节点对象
- `document.getElementsByTagName()`，返回一个对象数组，每个对象分别对应这文档里有着给定标签的一个元素
- `document.getElementsByClassName()`，通过class属性中的类名来访问元素，返回所有指定类的对象数组

## 获取属性&设置属性&节点属性

- `Object.getAttribute()`，只能通过元素节点对象调用，用于查询属性的名字
- `Object.setAttribute()`，用于对属性节点的值进行修改
- `element.childNodes`，用来获取任何一个元素的所有子元素，是一个包含这个元素全部子元素的数组
- `nodeType`属性，用以明确节点类型
  - 元素节点的`nodeType`属性值是1
  - 属性节点的`nodeType`属性值是2
  - 文本节点的`nodeType`属性值是2
- `nodeValue`属性，用来得到一个节点的值
- `node.firstChild`和`node.lastChild`属性，分别用来获取一个节点的第一个或者最后一个子节点
                                                                