import type { TreeNode } from './shared';

function rightSideView(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }
  const result: number[] = [];

  const queue: TreeNode[] = [root];
  while (queue.length) {
    const size = queue.length;
    result.push(queue[queue.length - 1].val);
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (!node) {
        throw new Error('queue shift null');
      }
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return result;
}
