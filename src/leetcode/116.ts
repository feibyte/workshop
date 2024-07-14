class _Node {
  val: number;
  left: _Node | null;
  right: _Node | null;
  next: _Node | null;
  constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

function connect_v1(root: _Node | null): _Node | null {
  if (root === null) {
    return null;
  }
  let nextQueue: _Node[] = [root];

  while (nextQueue.length > 0) {
    const queue = nextQueue;
    nextQueue = [];

    let last = null;
    for (const node of queue) {
      if (last) {
        last.next = node;
      }
      last = node;

      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);
      }
    }
  }

  return root;
}

/**
 * 前序遍历
 */

function connect(root: _Node | null): _Node | null {
  if (root === null) {
    return null;
  }
  if (root.left === null || root.right === null) {
    return root;
  }

  root.left.next = root.right;
  root.right.next = root.next?.left ?? null;

  connect(root.left);
  connect(root.right);
  return root;
}
