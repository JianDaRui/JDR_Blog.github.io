# React —— Class Component(还有必要学习类组件吗？)

## 类组件的特点

### 硬性书写要求：

- 组件的名称必须是大写字符开头
- 类组件需要继承自 React.Component 或者 PureComponent
  - PureComponent 组件通过对 props、state 进行浅层比较，跳过重复渲染，用于性能优化
  - 其本质与在类组件中通过 [`shouldComponentUpdate`](https://beta.reactjs.org/reference/react/Component#shouldcomponentupdate)  方法实现优化的原理一样
  - 可以与 React.memo(FunctionComponent) 实现平替，但是没函数组件简洁
  - 对于引用频繁变化的 props 、state 不推荐，多适用于展示类组件
- 类组件必须实现 render 函数，render 函数可以返回的类型
  - React 元素，JSX
  - 数组或者 fragments
  - Portals
  - 字符串或者数字类型
  - boolean 与 null 类型不会渲染内容

```js
import { Component, PureComponent } from 'react'

class DemoComponent extends Component {
  render() {
    return (
    	<div>
        Context
      <div>
    )
  }
}
        
class DemoComponent2 extends PureComponent {
  render() {
    return (
    	<div>
        Context
      <div>
    )
  }
}
```

### state 注意事项

- state 字段必须是一个 object 类型
- **不可变**，同函数组件类型，需要通过 this.setState 进行更新
  - 本质是通过 Object.assign({}, prevState, partialState) 对状态进行合并更新，每次更新不会影响无关状态
  - 在组件生命周期或者 React 合成事件中，setState 是异步批量合并更新 state
  - 在 setTimeout 或者原生 dom 事件中， setState 是同步更新
  - 可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
- 可以在类顶层初始化（主推），也可在 constructor 函数中初始化
  - constructor 函数主要用于声明 state & 绑定类方法 this 指向

### this 绑定问题

- 

### 生命周期

![新版声明周期](images/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%96%B0).png)

#### 分为三个阶段：

挂载阶段：

## 类组件与函数组件



