import type { TreeNode } from './shared';

export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const result: number[][] = [];

  const traverse = (
    node: TreeNode | null,
    remain: number,
    pathNumbers: number[],
  ) => {
    if (node === null) {
      return;
    }
    pathNumbers.push(node.val);
    if (node.left === null && node.right === null && remain === node.val) {
      result.push([...pathNumbers]);
    }
    traverse(node.left, remain - node.val, pathNumbers);
    traverse(node.right, remain - node.val, pathNumbers);
    pathNumbers.pop();
  };
  traverse(root, targetSum, []);

  return result;
}
