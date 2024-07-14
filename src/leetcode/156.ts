import type { TreeNode } from './shared';

/**
 * 递归的思路，只需要处理左孩子，先处理左孩子，再根据规则调整当前的节点，从左孩子获取跟节点
 *
 * 可以改为迭代
 */
function upsideDownBinaryTree(root: TreeNode | null): TreeNode | null {
  if (root === null) {
    return null;
  }
  if (root.left === null) {
    return root;
  }

  const { left, right } = root;

  const newRoot = upsideDownBinaryTree(root.left);

  left.right = root;
  left.left = right;
  root.left = null;
  root.right = null;

  return newRoot;
}
