# 如何用自定义 Hook 重构 React 组件(译)

有的人可能会说，随着 React 函数组件的引入，函数自然会变得更大更复杂。毕竟这些组件是通过函数实现的，因此代码层面肯定又有些膨胀。React 文档中提到：

**"Now that function components can do more, it’s likely that the average function component in your codebase will become longer."**

**既然函数组件可以做更多的事情，那么你的代码库中的函数组件的代码平均长度也会变大**。

文档中还提到，我们应该：

**"Try to resist adding abstraction too early."**

**尽量避免过早在代码中增加抽象概念。**

如果你的项目中有使用 CodeScene，你可能会意识到，如果你的函数变得越来越长，CodeScene 会发出警告。根据上述情况，你可能认为可以将 CodeScene 的配置宽松些。虽然完全可以这么做，但我认为我们可以不必那么做，我们不应该拒绝过多的添加抽象，因为这可能有很多好处，而且并不棘手。我们仍然可以维持代码的健壮性。

## 降低复杂度

我们应该认识到，尽管函数组件确实被写成 “一个函数”，但它们可以像其他函数一样，由其他函数组成。每个 useState、useEffect、其他钩子或者子组件本身也是个函数。因此我们能够以我们已经熟悉的方式处理复杂度：通过将常见的逻辑或者模式提取到一个新的函数，由这个新的函数来处理更复杂的行为。

将复杂组件拆分成更小的子组件是一种常见的方法。但有的情况会让人感觉不自然，或则很难找到正确的拆分边界。有时候，我们可以通过查看组件的钩子逻辑来找到新的抽象方式。

每当我们在组件中看到一连串 useState 或 useEffect 或其他初级钩子的时候，就有可能有机会将它们提取到自定义钩子中。自定义钩子就是使用其他钩子的另一个函数，而且它们的构建非常简单。

下列组件会渲染一个小的 DashBoard，它列出了用户的仓库。他并不是一个复杂的组件，但是可以作为以这种方式使用钩子的一个很好的示例：

```jsx
function Dashboard() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoadingRepos, setIsLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState<string | null>(null);

  useEffect(() => {
    fetchRepos()
      .then((p) => setRepos(p))
      .catch((err) => setRepoError(err))
      .finally(() => setIsLoadingRepos(false));
  }, []);

  return (
    <div className="flex gap-2 mb-8">
      {isLoadingRepos && <Spinner />}
      {repoError && <span>{repoError}</span>}
      {repos.map((r) => (
        <RepoCard key={i.name} item={r} />
      ))}
    </div>
  );
}
```

为了将组件中的钩子逻辑提取到一个自定义钩子中，我们仅将代码拷贝到一个以 use 开头的自定义函数中：

```jsx
/**
 * Hook for fetching the list of all repos for the current user.
 */
export function useRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRepos()
      .then((p) => setRepos(p))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  return [repos, isLoading, error] as const;
}
```

自定义钩子函数必须以 use 开始的原因是为了让 lint 检测到你正在调用的是一个钩子函数而不是一个普通函数，可以帮你检查你是否遵循了[自定义钩子的调用规则](https://reactjs.org/docs/hooks-rules.html)。

这里唯一新增的内容是 return 语句 和 as const。输入提示只是为了确保类型推断的类型与数组表达式的类型完全相同：一个包含 3 个元素的数组，类型分别为 Repo[]、boolean 和 string | null。但是，没有规则指出他必须是一个数组。你可以从钩子中返回任何你想要的东西。

将 useRepos 钩子引入组件：

```jsx
 function Dashboard() {
  const [repos, isLoadingRepos, repoError] = useRepos();

  return (
    <div className="flex gap-2 mb-8">
      {isLoadingRepos && <Spinner />}
      {repoError && <span>{repoError}</span>}
      {repos.map((i) => (
        <RepoCard key={i.name} item={i} />
      ))}
    </div>
  );
}
```

注意：我们的组件本身不再勇狗对任何 setter 函数的访问权限。它不需要它们，因为都封装在了 useRepos 钩子中。乳沟你确实需要它们，你可以将其部分或者全部返回出来。

这么做有什么好处？React 的官方文档中提到：

***"Building your own Hooks lets you extract component logic into reusable functions."***

***自定义钩子可以将组件逻辑提取到可复用的函数中。***

我们可以很容易的设想 App 中的其他组件也需要显示一个仓库 list。现在它们搜西安要做的就是导入 useRepos 钩子。如果钩子更新了——可能使用某种形式的缓存，或者通过轮询或者更复杂的方式进行持续更新——那么所有引入钩子的组件都将收益。

即使我们不会复用钩子，这样做仍有好处。虽然在我们的示例中，所有使用的 useState 和 useEffect 实现了一件事—— 获取 repo —— 但在一个组件中看到许多这些原始的集合（这里应该指多个相关的 state & setter 函数）都实现了不同的事情是很常见的，如果我们将“属于一起”的集合 打包到它们自己的钩子中，更新代码时候就更容易看到哪些状态必须保持同步。它还告诉我们:

- 更小的函数体积，更容易阅读
- 命名概念的能力（useRepos）
- 记录操作的本来位置（TSDoc，etc）

## 结论

我们已经了解到 React 钩子并不特别，并且和其他函数一样容易创建。我们可以创建自己的领域特定的钩子，然后在整个项目中复用。你可以在各种博客或“钩子库”中找到很多预先编写好的通用钩子。请记住，你可以在具体的情况中使用自定义钩子，就像我们熟悉的 useState 或 useEffect 钩子一样容易。Dan Abramov 的 [useInterval](https://overreacted.io/making-setinterval-declarative-with-react-hooks/) 钩子就是一个例子。也许你有一个类似于上面 useRepos 的用例，只是它必须不断地轮询更新?然后你可以在自定义钩子中使用 useInterval。

**原文**：

[Refactoring components in React with custom hooks](https://codescene.com/engineering-blog/refactoring-components-in-react-with-custom-hooks)


