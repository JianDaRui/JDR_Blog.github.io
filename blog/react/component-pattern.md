# React 组件设计模式

在 React 中组件是实现代码复用的最小单元。

## HOC 高阶组件设计模式

高阶组件常用于实现组件状态逻辑复用。其是基于 React 组件组合特性与 JavaScript 中函数特性的自然实现。本质也是利用了函数闭包的特性：返回的新组件访问了高阶组件的参数。

高阶组件的实现：一个函数接受一个组件作为参数，并返回一个新的组件。

在 React 中，高阶组件的出现解决了 react Mixins 在使用引入过程中给组件造成的：代码执行顺序冲突、调试复杂性增大、组件与 mixin 间依赖关系复杂的问题。

适用场景：

- 增强 props，利用高阶组件顶层的函数空间，可以再定义 state、对 props 进行加工处理后，在传递给目标组件，实现增强 props。
- 组件相似部分复用，在高阶组件返回的新组件中，重组 UI，比如说实现布局复用、交互复用，类似装饰器模式。
- 进行控制渲染，利用高阶组件可以劫持组件渲染的特性，实现条件渲染、懒加载、用户角色鉴权、数据埋点等功能。
- 进行生命周期劫持，如果是 class 类型高阶组件，可以劫持 class 提供的生命周期。



**类组件写法**

```jsx
function getDisplayName(WrappedComponent) {
   return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function higherOrderComponent(WrappedComponent) {
  class NewComponent extends PureComponent {
    state = {
      state1: {},
      state2: []
    }
    render() {
      const newProps = this.state.state2.filter(Boolean)
      
      return <WrappedComponent {...this.props} {...newProps}/>
    }
  }

  // 解决组件调试名称显示问题
  NewComponent.displayName = `HOC${getDisplayName(WrappedComponent)}`;
  return NewComponent;
}
```

**函数组件写法(推荐)**

```jsx
function higherOrderComponent(WrappedComponent, otherParams) {
  // 可以对 otherParams 进行在处理
  
  function NewComponent(props) {
    // 这里可以与正常的函数组件写法一样
		// a. 使用各种 hooks 
    // b. 增强 props
    // c. 重组 ui
    // d. 条件渲染

    return <WrappedComponent {...props}/>
  }
	// 解决组件调试名称显示问题
  NewComponent.displayName = `HOC${getDisplayName(WrappedComponent)}`;
  return React.useMemo(() => NewComponent, [deps]);
  // 或者
  // return React.memo(NewComponent)
}
// 使用
<div>
	{
    higherOrderComponent(WrappedComponent)
  }
</div>
```

在实际开发中，HOC 组件设计模式已经证明了其灵活性。在 React-Redux、React-Router 中都能找到其身影。

## Render Props 组件设计模式

Render Props 组件也是实现状态、逻辑或者 UI 复用的一种组件实现方式，可以说是与 与 HOC 模式非常相似的一种设计模式。通常情况下使用 HOC 实现的复用都可以转为 render props 组件。

render props 组件的实现：当你给组件传递的 props 是一个函数的时候，其实就是在使用 render props 了。多数情况下我们传递的函数为一些状态处理的 function，这些 function 并没有返回值。但是我们可以使用这个 prop function 接受一些参数并返回 JSX。

本质上 render props 就是一个通过 props 向下传递的回调函数。



**类组件写法**

```jsx
class RenderPropsComponent extends React.Component {
  // 这里可以定义 state 等等
  render() {
    const { render } = this.props
    return (
      <div>
      	{ render(this.state) }  
      <div>
    )
  }
}
        
class App extends React.Component {
  render() {
    return <RenderPropsComponent render={
        (someState) => {
          return <DemoComponent someState={someState}>
        }
      }>
  }
}
```

**函数组件写法(推荐)**

```jsx
function RenderPropsComponent(props) {
  // 省略一些代码
  const { render } = props                 	             
  return (
  	<div>
      { render(this.state) }  
    <div>
  )
}
      
function App() {
  const WrappedDemoComponent = useCallback((someState) => {
          return <DemoComponent someState={someState} />
        }, [])
      
  return (
    <div>
      <RenderPropsComponent render={WrappedDemoComponent} />
    </div>
	)
} 
```

注意这里使用 useCallback 钩子包裹 DemoComponent 组件的是为了避免 App 组件每次渲染，都会更新 render 的值。这会造成 RenderPropsComponent 的无畏更新。

或者

```jsx
function RenderPropsComponent(props) {
  // 省略一些代码
  const { children } = props                 	             
  return (
  	<div>
      { children(state) }  
    <div>
  )
}
      
function App() {
  return (
    <RenderPropsComponent>
    	{
        (someState) => {
          return <DemoComponent someState={someState}>
        }
      }
    </RenderPropsComponent>
	)
}   
```

以渲染一个 List 组件为例：

```jsx
export default function BookList({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {
        items.map((item, index) => {
          const isHighlighted = index === selectedIndex;
          return renderItem(item, isHighlighted);
        })
      }
    </div>
  )
}
```

在 BookList 通过 props.renderItem 实现 item 的渲染。相当于将渲染权利上移。

在 App 组件中引用。

```jsx
function App() {
  const [booklist, setBookList] = useState([
    {
      name: 'Javascript 高级程序设计',
      id: 'js'
    },
     {
      name: 'Tavascript 实战',
      id: 'ts'
    },
    {
      name: 'Java 编程思想',
      id: 'java'
    }
  ])
  
  const renderItem = useCallback((book, isHighlighted) =>{
    return (
      <span
        key={book.id}
        style={{ color: isHighlighted ? 'pink' : 'white' }}
      >{book.name}</span>
    )
  }, [])
  
  return (
    <BookList
      items={booklist}
      renderItem={renderItem}
    />
  )
}
```

可以看出 render props 组件模式为用户提供了更多对底层子组件的操作空间。随着需求的负责程度变高或者组件状态的变化，render props 实现了 renderItem 与 BookList 状态与逻辑的共享，减少了 props 在组件层级间的传递。

在我看来 render props 组件设计模式与 HOC 模式两者都用到了 JavaScript 中的函数为一等公民的特性。render props 中是以 回调函数的方式实现代码的复用，而 HOC 这里利用了闭包特性。

## 复合组件设计模式

复合组件设计模式是由两个或者多个组件组合在一起来完成 UI 的展示和交互任务，通常由一个父组件，一个子组件组合完成，可以提供更具灵活性和表现力的 API。复合组件本质是高阶的 React 容器组件，你可以在父组件中进行 状态派发。

在实际开发中经常遇到的比如 antd 中的 Select 与 Option 组件、Menu 与 MenuItem 组件、Form 与 FormItem 组件等等都是采用的复合组件设计模式。

解决问题：

- 降低父组件 API 复杂度
- 为用户提供了更高的结构灵活度，UI 更加可控，用户有了更大的 UI 控制权
- 最底层子组件重复更新的问题
- 解决多层组件嵌套情况下状态层级传递问题

我们以通过复合组件的方式实现 Select & Option 为例，定义父组件 Context:

```jsx
import React, { useContext } from 'react'

const SelectContext = React.createContext()
// 定义 SelectContext 钩子
export const useSelectContext = () => {
  const context = useContext(SelectContext)
  if(!context) {
    throw new Error('Context is undefined, Option should be used within the scope of a Select Component!')
    return (
      <p>Option should be used within the scope of a Select Component!</p>
    )
  }
  return context
}
// 定义派发器组件
export function SelectContextProvider({children, value}) {
  return (
    <SelectContext.Provider value={value}>
    	{children}
    </SelectContext.Provider>
 	)
}


```

定义 Select 组件 & Option 组件

```jsx
import React, { useState, useContext } from 'react'
import { SelectContextProvider, useSelectContext } from './select-context'

export function Select({children}) {
  const [activeOption, setActiveOption] = useState(null)
  
  return (
    <SelectContextProvider value={{ activeOption, setActiveOption }}>
    	{ children }
    </SelectContextProvider>
  )
}

export function Option({ key, children }) {
  const { activeOption, setActiveOption } = useSelectContext()
  return (
    <div style={
			 activeOption ? {
         color: 'grey'
       } : {
         color: 'white'
       }
      }
      onClick={() => setActiveOption(key)}
      >
    	{children}
    </div>
  )
}

Select.Option = Option
```

引入使用

```jsx
import React from 'react'
import { Select } from './Select'

export default function App() {
 	// 省略一些 状态 & 交互逻辑处理
  return (
    <Select>
      <Select.Option key="java">Java</Select.Option>
      <Select.Option key="js">JavaScript</Select.Option>
      <Select.Option key="ts">TypeScript</Select.Option>
    </Select>
  )
}
```

上面我通过复合组件设计模式实现了 Select & Option 组件。

试想一下如果是普通的书写方式，我们直接在 Select 组件中写定 Option 组件。就会有两个问题存在：

1. 需要将 App 组件中传递的 props，通过层层传递才能到达 Option 组件。
2. 如果用户需要存在很多定制化的需求，比如对某个 Option 选项进行一些高度定制化的处理，会导致使用起来不方便，因为  Select & Option 组件是耦合的。

而当采用复合组件的时候这些问题都被解决了。并且  Select & Option 组件会共享 App 组件的状态与逻辑。

## Control Props Pattern

## Custom Hook Pattern

## 状态派发组件设计模式



```jsx
import React, { useContext } from 'react'

const Demo1Context = React.createContext()
// 定义 SelectContext 钩子
export const useDemo1Context = () => {
  const context = useContext(Demo1Context)
  if(!context) {
    throw new Error('Context is undefined, Option should be used within the scope of a Select Component!')
    return (
      <p>Option should be used within the scope of a Select Component!</p>
    )
  }
  return context
}
// 定义派发器组件
export function Demo1ContextProvider({children, value}) {
  return (
    <Demo1Context.Provider value={value}>
    	{children}
    </SelectContext.Provider>
 	)
}
```



```jsx
function App() {
  return (
    <Demo1ContextProvider>
    	<ChildrenComponent />
    </Demo1ContextProvider>
  )
}
```



```jsx
function App() {
  return (
    <Demo1ContextProvider>
      <Demo2ContextProvider>
        <Demo3ContextProvider>
          <Demo4ContextProvider>
            <Demo5ContextProvider>		
              <ChildrenComponent />
            </Demo5ContextProvider>
          </Demo4ContextProvider>
        </Demo3ContextProvider>
      </Demo2ContextProvider>
    </Demo1ContextProvider>
  )
}
```



```jsx
function MutilProvider({
  providers,
  children
}) {
  const wrapped = providers.reduceRight((wrappedChildren, provider) => React.cloneElement(provider, undefined, wrappedChildren))
  
  return <>{wrapped}</>
}

function App() {
  const providers = [
    Demo1ContextProvider,
    Demo2ContextProvider,
    Demo3ContextProvider,
    Demo4ContextProvider,
    Demo5ContextProvider
  ]
  return (
    <MutilProvider providers={providers}>
      <ChildrenComponent />
    </MutilProvider>
  )
}
```



## Hook 聚合组件设计模式



```jsx
useComposeDemoHook() {
  const [state, setState] = useState()
  const [query, setQuery] = useState()
  
  useEffect(() => {
    fetchData(query).then(res => {
      setState(res.data)
    })
  }, [query]) 
  
  const UseForm = useCallback((props) => {
    return <Form {...props} />
  }, [])
  
  const UseTable = useCallback((props) => {
    return <Table {...props} />
  }, [state])
    
 	return {
        setQuery,
        UseForm,
        UseTable
     }
}
```



## 容器组件与展示组件设计模式

将组件分为容器组件与展示组件的概念，早期是由  [Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) 提出。但是现在由于 Hooks 组件的出现。这种设计模式将会逐渐淡出大家的视野。

如果你的项目中仍有使用 class 组件。那么该设计模式将会排上用场。容器组件与展示组件设计模式主要是为了解决组件关注点、降低复杂状态的的问题。

我们可以将负责 state 展示的组件设置为无状态的函数组件，仅仅关注如何将 props 数据渲染到视图上；将容器组件设计为 class 组件，用于处理 state 更新、业务逻辑、组件搭建。

举一个简单的例子：

```jsx
class App extends React.Component() {
  state = {
    bookList: ['Javascript 高级程序设计', 'Javascript 权威指南', 'Javascript 精粹']
  }
  
  // 这里可能会对 bookList 进行增删改
  changState = () => {
    // ...
  }
  
  fetchState = () => {
    // ...
  }
  render () {
    return (
      <div>
      	{
          bookList.map(item => {
            return (
              <div key={item}>{item}</div>
            )
          })
        }
      </div>
    )
  }
}
```

对于 bookList 的元素的渲染，我们可以将其单独抽离到一个 无状态函数组件中，实现关注点分离。

拆分 App 组件：

```jsx
// 
const BookList= ({ bookList }) => {
  return (
  	<div>
      	{
          bookList.map(item => {
            return (
              <div key={item}>{item}</div>
            )
          })
        }
      </div>
  )
}

class App extends React.Component() {
  // ...
  render () {
    return (
      <BookList bookList={bookList} />
    )
  }
}
```

可以看出 BookList 组件仅负责数据的展示渲染，不负责状态与具体交互逻辑的处理。



- https://beta.reactjs.org
- [](https://blog.logrocket.com/react-design-patterns/)
- https://www.robinwieruch.de/react-higher-order-components/
- https://www.robinwieruch.de/react-render-props/
- https://blog.openreplay.com/3-react-component-design-patterns-you-should-know-about/
- https://kentcdodds.com/blog/compound-components-with-react-hooks
- https://blog.logrocket.com/understanding-react-compound-components/
- https://aglowiditsolutions.com/blog/react-design-patterns/
- https://www.patterns.dev/posts/render-props-pattern/
- https://flexiple.com/react/render-props-an-advanced-react-pattern/
- https://blog.logrocket.com/react-reference-guide-render-props/
- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
- https://www.zhihu.com/question/531555960/answer/2552310734