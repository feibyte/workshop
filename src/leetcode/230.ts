import type { TreeNode } from './shared';

function kthSmallest(root: TreeNode | null, k: number): number {
  const stack = [];
  let current: TreeNode | null = root;
  let index = 1;

  while (stack.length || current) {
    let node: TreeNode | null = current;
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }

    current = stack.pop() ?? null;
    if (!current) {
      throw new Error('Assert current must not be null');
    }
    // inOrder traverse
    if (k === index) {
      return current.val;
    }
    index += 1;

    current = current.right;
  }

  return -1;
}
