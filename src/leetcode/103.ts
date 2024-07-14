import type { TreeNode } from './shared';

/**
 * 层序遍历，需要两个队列
 */
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }
  let nextQueue: TreeNode[] = [root];

  const result: number[][] = [];

  let reverseOrder = false;

  while (nextQueue.length > 0) {
    const queue = nextQueue;
    nextQueue = [];
    const levelNumber: number[] = [];

    for (const node of queue) {
      levelNumber.push(node.val);
      if (node.left) {
        nextQueue.push(node.left);
      }
      if (node.right) {
        nextQueue.push(node.right);
      }
    }
    if (reverseOrder) {
      levelNumber.reverse();
    }
    result.push(levelNumber);
    reverseOrder = !reverseOrder;
  }

  return result;
}
