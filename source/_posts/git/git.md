---
title: Git 学习笔记
author: 剑大瑞
post: git
category: git
tag:
  - git
date: 2020-04-27 16:51:16
---

## `Git`基本概念

`Git`维护两个主要的数据结构：对象库（`object store`）和索引（`index`）

### 对象库

​		对象库包含原始数据文件、日志消息、作者信息、日期，以及其他用来重建项目任意版本或者分支的信息。

4种数据类型：

- 块(`blob`)
  - 文件的每一个版本标识为一个块(`blob`)
  -  处于数据结构的低端，什么也不引用而且只能被树对象引用
- 目录树(`tree`)
  - 一个目录树对象代表一层目录信息
  - 指向若干`blob`对象，或者其他`tree`对象
  - 记录`blob`标识符、路径名和一个目录里所有文件的一些元数据
  - 可以递归引用其他目录树和子树对象
- 提交(`commit`)
  - 保存版本库中每一次变化的元数据，包括作者、提交者、提交日期和日志消息
  - 指向一个特定的`tree`对象，及一个或多个父提交对象。并且这个`tree`对象是由`commit`对象引入版本库的
  - 数据流从父提交流向子提交（这也是版本库的状态箭头反画的原因）
- 标签(`tag`)
  - 分配一个任意的且我们可读的名字给一个特定对象
  - 本质就是一个被标记的`commit`对象
  - 轻量标签只是一个提交对象的索引，通常被版本库视为是私有的
  - 附注标签会创建一个`tag`对象

### 索引

​		索引是一个临时的、动态的二进制文件，用以描述整个版本库的目录结构。实质用以捕获项目在某一个时刻的整体结构的一个版本。通常用以暂存变更，比如添加、删除或者变基某个文件或某些文件。

​		索引不包含任何文件内容，它仅仅是追踪想要提交的内容。当执行`git commit`命令的时候，`Git`会通过检查索引而不是工作目录来找到提交的内容。

- 每次提交之前可以通过`git status` 明确暂存（索引）中的内容和它的状态。

- `git diff` 显示仍留在工作目录中且未暂存的变更；

- `git diff --cached`显示已经暂存并且因此要有助于下次提交的变更。

​		`Git`本质是一个内容寻址文件系统。核心部分是一个简单的键值对数据库（`key-value data store`）。 可以向 `Git` 仓库中插入任意类型的内容，它会返回一个唯一的键（SHA-1值），通过该键可以在任意时刻再次取回该内容。特点：

- 基于追踪文件内容，而不是文件名称、目录名
- 存储文件快照，保存文件版本，而不是差异



​		当使用`git add`命令时，`Git`会给添加的每个文件的内容创建一个对象，但它并不会马上为`tree`创建一个对象。相反，索引更新了，索引位于`.git/index`中，他跟踪文件的路径名和相应的`blob`。每次执行命令（例  `git add`、`git rm` 或者 `git mv`）的时候，git会用新的路径名和blob信息更新索引。

​		切换分支时要留意你的工作目录和暂存区里那些还没有被提交的修改， 它可能会和你即将检出的分支产生冲突从而阻止 Git 切换到该分支。 最好的方法是，在你切换分支之前，保持好一个干净的状态。

### 提交

在`Git`中可以通过显示或隐式引用来指代每一个提交

- 显示引用
  - 唯一的40位十六进制`SHA1`提交ID
- 隐式引用
  - 始终指向最新提交的`HEAD`

> 一次提交其实是两个两步的过程：暂存变更和提交变更。在工作目录下而不再索引中的变更是没暂存的，因此也不会提交。



> 提交图：
>
> 在计算机科学领域中，图表示的是一组节点和节点之间的一组边。根据不同的属性将图分为几种类型，`Git`使用的是一种有向无环图（`DAG`）。这种图有两个重要特质：
>
> - 图中的每条边都从一个节点指向另一个节点，称为又向
> - 从图中的任意一个节点开始，沿着有向边走，不存在可以回到起始点的路径，称为无环



文件分类：

- 已追踪的（`Tracked`）
  - 指已在版本库中的文件，或者是一暂存到索引中的文件
- 被忽略的（`Ignored`）
  - 在版本库中被明确声明为不可见或者被忽略(`.gitignore`)的文件，即使他已经出现在工作目录中。
- 未追踪的（`Untracked`）
  - 指不在前面两类中的文件

文件所处状态：

- **已提交（`committed`）**。已提交表示数据已经安全地保存在本地数据库中。
- **已修改（`modified`）** 。已修改表示修改了文件，但还没保存到数据库中。
- **已暂存（`staged`）**。已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。
- 已追踪
- 未追踪



### 分支

使用分支的原因：

- 一个分支可以代表一个单独的客户发布版。
- 一个分支可以封装一个开发阶段，比如原型、测试、稳定或者临近发布
- 一个分支可以隔离一个特性的开发或者研究特别复杂的bug
- 每一个分支可以代表单个贡献者的工作

分支命名规则：

- 可以使用斜杠(/)创建一个分层的命名方案。但是分支名不能以斜线结尾
- 分支名不能以减号(-)开头
- 以斜杠分割的组件不能以点(.)开头。栗子`dev/.new`这样的分支名是无效的
- 分支名的任何地方都不能包含两个连续的点(..)
- 分支名中不能包含一下内容
  - 任何空白或其他空白字符
  - 在`Git`中具有特殊含义的字符，包括波浪线(~)、插入符(^)、冒号(:)、问号(?)、星号(*)、左方括号([)
  - `ASXII`码控制字符

改变分支的影响：

- 在要被检出的分支中但不在当前分支中的文件和目录，会从对象库中检出并放置到工作树中
- 在当前分支中但不在要被检出的分支中的文件和目录，会从工作树中删除
- 这两个分支都有的文件会被修改为要检出的分支的内容

删除分支

- `Git`会阻止删除当前分支
- 会阻止删除一个包含不存在与当前分支中的提交的分支
  - 意思是如果删除的分支不是以当前分支的某个提交节点开始的，那就不能删除
- 不会保持任何形式的关于分支名创建、移动、操纵、合并或删除的历史记录

### 指令

- `git`
  - 获取git选项和最常用的子命令
- `git help`
  - 获取常用`Git`子命令表
- `git help --all`
  - 获取完整git子命令表（多的吓人😂）
- `git --version`
  - 显示`Git`版本号
- `git init`
  - 初始化版本库
- `git config`
  - 获取git配置选项
- `git config --list`
  - 获取本地git配置信息
- `git config --global user.name "剑大瑞"`
  - 配置提交作者名称
- `git config --global user.email johndoe@example.com`
  - 配置提交作者邮箱
- `git add -h`
- `git add `
- 开始跟踪新文件
  - 把已跟踪的文件放到暂存区
  - 用于合并时把有冲突的文件标记为已解决状态
  - 运行了 `git add` 之后又作了修订的文件，需要重新运行 `git add` 把最新版本重新暂存起来

>  在任何编辑修改之后，`commit`(提交)变更之前，请执行`git add` 命令，用最新版本的文件去更新索引。如果不这么做，会产生两个不同的版本：一个时在对象库例被捕获并被索引引用的，两一个则是在工作目录下的。而Git在`commit`的时候会使用索引中的文件版本

- `git commit -m <message>`。
  
  - 将暂存中的内容进行提交。
- `git commit -a / git commit --all `。
  
  - `Git` 会在提交之前自动暂存所有为暂存的和未追踪的文件变化，包括冲工作副本中删除已追踪的文件。
- `git rm`
  
  - 从版本库和工作目录中同时删除文件。这个文件必须已经存在与暂存区中。
  - 但是不会删除文件在版本库中的历史记录
- `git rm --cached`
  
  - 将一个文件由已暂存的转化未为暂存的。只是删除索引中的文件，而不是工作目录中的。
- `git mv <file_from> <file_to>`
  
  - 将文件进行移动或者重命名
  - 相当于先对旧文件进行`git rm`，再用`git add`添加新文件
- `git log --follow <file_to>` 可以回溯并找到内容相关联的整个历史记录
  
- `git clone  <url>`

- `git status`

  - `git status -s / git status --short`
  -  新添加的未跟踪文件前面有 `??` 标记
  - 新添加到暂存区中的文件前面有 `A` 标记
  - 修改过的文件前面有 `M` 标记。

  ```console
  $ git status -s
   M README
  MM Rakefile
  A  lib/git.rb
  M  lib/simplegit.rb
  ?? LICENSE.txt
  ```

- `.gitignore` 文件  的格式规范如下：
  - 所有空行或者以 `#` 开头的行都会被 Git 忽略，视为注释。
  - 一个简单的字面置文件名匹配任何目录中的同名文件+
  - 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。
  - 匹配模式可以以（`/`）开头防止递归。
  - 匹配模式可以以（`/`）结尾指定目录。
  - 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（`!`）取反。

```
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

- `git diff`
  
  - 会显示工作目录和索引(暂存区)之间的差异
  
- `git diff commit `
  
  - 会显示工作目录和给定提交间的差异、
  
- `git diff --cached commit`
  
  - 显示索引中的变更中和给定提交中的变更之间的差异。
  - 如果省略commit，则默认为HEAD
  
- `git diff commit1 commit2`
  
  - 会显示指定的两个提交之间的差异
  - 这条命令会忽略索引和工作目录
  
- `git diff --staged`

  - 将比对已暂存文件与最后一次提交的文件差异。

- `git diff --cached` 

  - 查看已经暂存起来的变化

- `git commit`

- `git commit -a / git commit --all `。

  - Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤。

- `git blame -L <num>, <filename>`
  
- 获取目标文件中每一行最后是谁修改和哪次提交做出了变更
  
- `git rm <filename>`

  - 将某个文件从已跟踪文件清单中移除（确切地说，是从暂存区域移除）

- `git rm -f <filename>`

  - 删除之前修改过或已经放到暂存区的文件，强制删除

- `git log`

  - 查看提交历史

- `git log -p`

  - 显示每次提交所引入的差异（按 **补丁** 的格式输出）

- `git log -p -2`

  - 可以限制显示的日志条目数量，例如使用 `-2` 选项来只显示最近的两次提交

- `git log --stat`

  - 看到每次提交的**简略统计信息**

- `git log --pretty=format`

  - 可以使用不同于默认格式的方式展示提交历史， `format` 可以定制记录的显示格式

- `git log --since=2.weeks`。 

  - 限制输出长度。`--since` 和 `--until` 这种按照时间作限制的选项很有用

- 在 [限制 `git log` 输出的选项](https://git-scm.com/book/zh/v2/ch00/limit_options) 中列出了常用的选项

  | 选项                  | 说明                                       |
  | :-------------------- | :----------------------------------------- |
  | `-<n>`                | 仅显示最近的 n 条提交。                    |
  | `--since`, `--after`  | 仅显示指定时间之后的提交。                 |
  | `--until`, `--before` | 仅显示指定时间之前的提交。                 |
  | `--author`            | 仅显示作者匹配指定字符串的提交。           |
  | `--committer`         | 仅显示提交者匹配指定字符串的提交。         |
  | `--grep`              | 仅显示提交说明中包含指定字符串的提交。     |
  | `-S`                  | 仅显示添加或删除内容匹配指定字符串的提交。 |
  | --no-merges           | 去掉合并的信息                             |

- `git reset HEAD <file>`

  - 取消暂存

- `git checkout -- CONTRIBUTING.md`

  - 撤消对文件的修改。
  - **请务必记得 `git checkout -- <file>` 是一个危险的命令。 你对那个文件在本地的任何修改都会消失——Git 会用最近提交的版本覆盖掉它。 除非你确实清楚不想要对那个文件的本地修改了，否则请不要使用这个命令。**

- `git remote -v`

  - 会显示需要读写远程仓库使用的 `Git `保存的简写与其对应的 URL。

- `git remote add <shortname> <url>`

  - 添加一个新的远程`Git` 仓库，同时指定一个方便使用的简写：

- `git fetch <remote>`

  - 从远程仓库中抓取与拉取。这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

> 如果你使用 `clone` 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，`git fetch origin` 会抓取克隆（或上一次抓取）后新推送的所有工作。 必须注意 `git fetch` 命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。
>
> 如果你的当前分支设置了跟踪远程分支（阅读下一节和 [Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching) 了解更多信息）， 那么可以用 `git pull` 命令来自动抓取后合并该远程分支到当前分支。 这或许是个更加简单舒服的工作流程。默认情况下，`git clone` 命令会自动设置本地 master 分支跟踪克隆的远程仓库的 `master` 分支（或其它名字的默认分支）。 运行 `git pull` 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。

- `git push <remote> <branch>`
  - ]推送到远程仓库。
- `git remote show <remote>`
  - 查看某一个远程仓库的更多信息。
- `git remote rename <oldname> <newname>`
  - 修改一个远程仓库的简写名。
  - 注意的是这同样也会修改你所有远程跟踪的分支名字。
- `git remote remove <repName>`
  - 移除一个远程仓库
  - 所有和这个远程仓库相关的远程跟踪分支以及配置信息也会一起被删除
- `git tag`
  - 列出标签
  - `git tag -l "v1.8.5*"`： 如果只列出1.8.5 系列的标签。
- 创建标签
  - 轻量标签：轻量标签很像一个不会改变的分支——它只是某个特定提交的引用。
  - 附注标签：是存储在 Git 数据库中的一个完整对象， 它们是可以被校验的，其中包含打标签者的名字、电子邮件地址、日期时间， 此外还有一个标签信息，并且可以使用 `GNU Privacy Guard （GPG）`签名并验证。
- 附注标签

在 `Git` 中创建附注标签十分简单。 最简单的方式是当你在运行 `tag` 命令时指定 `-a` 选项：

```console
$ git tag -a v1.4 -m "my version 1.4"
$ git tag
v0.1
v1.3
v1.4
```

`-m` 选项指定了一条将会存储在标签中的信息。 如果没有为附注标签指定一条信息，Git 会启动编辑器要求你输入信息。

通过使用 `git show` 命令可以看到标签信息和与之对应的提交信息：

```console
$ git show v1.4
tag v1.4
Tagger: Ben Straub <ben@straub.cc>
Date:   Sat May 3 20:19:12 2014 -0700

my version 1.4

commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```

输出显示了打标签者的信息、打标签的日期时间、附注信息，然后显示具体的提交信息。

- 轻量标签

另一种给提交打标签的方式是使用轻量标签。 轻量标签本质上是将提交校验和存储到一个文件中——没有保存任何其他信息。 创建轻量标签，不需要使用 `-a`、`-s` 或 `-m` 选项，只需要提供标签名字：

```console
$ git tag v1.4-lw
$ git tag
v0.1
v1.3
v1.4
v1.4-lw
v1.5
```

这时，如果在标签上运行 `git show`，你不会看到额外的标签信息。 命令只会显示出提交信息：

```console
$ git show v1.4-lw
commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```

- `git tag -d <tagname>`
- 删除标签
  - 上述命令并不会从任何远程仓库中移除这个标签，
- `git push <remote> :refs/tags/<tagname>`
  - 更新远程仓库标签
- `git push origin --delete <tagname>`
  - 删除远程仓库标签
- `git checkout <tagname>`
  - 检出标签。 这会使你的仓库处于“分离头指针（detached HEAD）”的状态。这个状态下不建议进行修改操作。
  - `git branch <branchname>`  创建分支
- `git checkout  <branchname>`
  - 切换分支
- `git checkout -b <branchname>`
  - 创建并切换到新的分支
- `git checkout -m <branchname>`
  - 合并并检出目标分支
- `git merge <branchname>`
  - 合并分支
- `git branch -v`
  -  查看每一个分支的最后一次提交，
- `git branch --merged`   
  - 要查看哪些分支已经合并到当前分支
- `git branch --no-merged`
  -  看所有包含未合并工作的分支
- `git branch -d <branchname>`
  - 删除某一个分支
- `git remote show <remote>` 
  - 获得远程分支的更多信息
- `git fetch <remote>`
  - 与给定的远程仓库同步数据  。从中抓取本地没有的数据，并且更新本地数据库，移动 `origin/master` 指针到更新之后的位置。当 `git fetch` 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容。 它只会获取数据然后让你自己合并
- 有一个命令叫作 `git pull` 在大多数情况下它的含义是一个 `git fetch` 紧接着一个 `git merge` 命令
- `git push origin --delete  <branchname>`
  -  删除远程分支
- `git rebase <branchname>`:
  - 变基。提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。
  - 变基使得提交历史更加整洁
  - 该项目的维护者就不再需要进行整合工作，只需要快进合并便可。
  - **如果提交存在于你的仓库之外，而别人可能基于这些提交进行开发，那么不要执行变基。**
- `git rebase --onto master server client`
- `git reflog` 
  - 来查看引用日志
- `git add -i`。
  - 交互式暂存。当你在修改了大量文件后，希望这些改动能拆分为若干提交而不是混杂在一起成为一个提交时，这几个工具会非常有用。 通过这种方式，可以确保提交是逻辑上独立的变更集，同时也会使其他开发者在与你工作时很容易地审核。
- 贮藏（`stash`）会处理工作目录的脏的状态——即跟踪文件的修改与暂存的改动——然后将未完成的修改保存到一个栈上， 而你可以在任何时候重新应用这些改动（甚至在不同的分支上）。
- `git stash --keep-index`
  - ``Git` 不仅要贮藏所有已暂存的内容，同时还要将它们保留在索引中。
- `git stash --patch`
  - `Git` 不会贮藏所有修改过的任何东西， 但是会交互式地提示哪些改动想要贮藏、哪些改动需要保存在工作目录中。
- `git stash branch <new branchname>`。
- `git clean`。
  - 清理工作目录
- 使用 `git clean -f -d` 命令来移除工作目录中所有未追踪的文件以及空的子目录。 `-f` 意味着“强制（force）”或“确定要移除”，使用它需要 Git 配置变量 `clean.requireForce` 没有显式设置为 `false`。
- `git grep`
  - `Git` 提供了一个 `grep` 命令，你可以很方便地从提交历史、工作目录、甚至索引中查找一个字符串或者正则表达式。 我们用 Git 本身源代码的查找作为例子。
- `git commit --amend`
  - 这条命令会将最后一次的提交信息载入到编辑器中供你修改。 当保存并关闭编辑器后，编辑器会将更新后的提交信息写入新提交中，它会成为新的最后一次提交。
  - `git commit --amend` 以新的改进后的提交来 **替换** 掉旧有的最后一次提交，
- `git rebase -i HEAD~3`
  - 通过变基修改多个提交信息。
- `git filter-branch`
  - 会用来擦洗整个提交历史的工具
- `git reset --soft HEAD~`
  - 撤销了上一次``git commit` 命令。
- `git reset [--mixed] HEAD~`
  - 更新索引。
- `git reset --hard HEAD~`。
  - 中止或重新启动合并任务，立即把工作目录还原到`git merge`命令之前
  - 更新工作目录
- `git reset --hard ORIG_HEAD`
  - 中止或在它已经结束（已经引进一个新的合并提交）后放弃
  - 这时因为在开始合并操作前，Git把原始分支的`HEAD`保存在`ORIG_HEAD`中
  - 注意保持目录中没有任何未提交的修改，因为此操作会丢失脏内容
- `git cherry-pick`
  - 在当前分支上应用给定提交引入的变更
- `git revert`
  - 用于引入一个新的提交来抵消给定提交的影响
- [Git重置揭秘](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86)
- `git checkout [branch]`。
- `git merge --abort`
  - 退出合并
- `git merge-base`
  - 找到两个或两个以上分支之间的合并基础。一组分支等效的合并基础可能不止一个。
- `git submodule add <URL> `
  - 添加子模块
- `git reflog` 
  - 命令来了解你曾经做过什么
- `git log -g`
  - 这个命令会以标准日志的格式输出引用日志。
- `git log --graph`
  - 使用提交图查看工具
- 如果想知道什么时候、为什么、如何和有谁把冲突的内容添加到文件中的可以使用
  - `git log --merge`：只显示跟产生冲突的文件相关的提交
  - `git log --left-right`：如果提交来自合并的"左"边则显示<（"我们的"版本，就是你开始的版本），如果提交来自合并的"右"边则显示>（"他们的"版本，就是你要合并到的版本）
  - `git log -p`：显示提交消息和每个提交相关联的补丁
- `git ls-files -u`
  - 显示工作树中仍然未合并的一组文件
- `git ls-files -s `
  - 显示所有文件的各个阶段
- `git diff --ours === git diff HEAD`
- `git diff theirs === git diffMERGE_HEAD`


推荐阅读：
 - 《Git版本控制管理》
 - [《Git Book》](https://git-scm.com/book/en/v2)
 - [Git Magic](http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/index.html) (未读)
 - [Git内部原理揭秘！](https://zhuanlan.zhihu.com/p/96631135)