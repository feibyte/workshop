import type { TreeNode } from './shared';

/*
  中序遍历
 */
export function isValidBST(root: TreeNode | null): boolean {
  let isValid = true;

  let lastValue = Number.MIN_SAFE_INTEGER;
  const inorderTraverse = (root: TreeNode | null) => {
    if (root === null) {
      return;
    }
    inorderTraverse(root.left);
    if (root.val <= lastValue) {
      isValid = false;
      console.log('lastValue', lastValue);
      return;
    }
    lastValue = root.val;
    inorderTraverse(root.right);
  };

  inorderTraverse(root);

  return isValid;
}
