let a: number = 1
let b: number = 2

interface NodeConstraints {
	val: number
  children?: NodeConstraints[]
  left?: NodeConstraints
  right?: NodeConstraints
}

type Node_1 = {
  val: number,
  children?: Node_1[]
}

const tree_1: Node_1 = {
  val: 1,
  children: [
    {
      val: 2,
      children: [{ val: 3, children: [{ val: 4 }]}]
    },
    {
      val: 5,
      children: [{ val: 6, children: [{ val: 7 }]}]
    },
    {
      val: 8,
      children: [{ val: 9, children: [{ val: 10 }]}]
    }
  ]
}


type Node_2 = {
  val: number,
  left?: Node_2,
  right?: Node_2
}

const tree_2: Node_2 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      right: {
        val: 5,
      },
    },
    right: {
      val: 6,
    },
  },
  right: {
    val: 3,
    left: {
      val: 8,
    },
    right: {
      val: 7,
    },
  }
}

function preOrder<T extends NodeConstraints>(root: T): number[] {
  // if(root === null) return []
  // const result: number = []
  // const stack: T[] = [root]
  // while(stack.length) {
  //     let node = stack.pop()
  //     result.push(node.val)
  //     if('length' in node) {
  //       for (let i: number = node.children.length - 1; i >= 0; i--) {
  //           stack.push(node.children[i])
  //       }
  //     } else {
  //       node.left && stack.push(node.left)
  //       node.right && stack.push(node.right)
  //     }
  // }
  // return result
}
const ans = preOrder<Node_1>(tree_1)
console.log();

console.log(preOrder<Node_2>(tree_2))