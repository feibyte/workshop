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

function connect(root: _Node | null): _Node | null {
  if (root === null) {
    return null;
  }

  // find right one;
  let p = root.next ?? null;
  let next = null;
  while (p !== null && next === null) {
    next = p.left ?? p.right ?? null;
    p = p.next ?? null;
  }

  if (root.right) {
    root.right.next = next;
    next = root.right;
  }

  if (root.left) {
    root.left.next = next;
  }

  connect(root.left);
  connect(root.right);

  return root;
}
