import type { TreeNode } from './shared';

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  let last: TreeNode;
  const traverse = (node: TreeNode | null) => {
    if (node === null) {
      return;
    }

    if (last) {
      last.left = null;
      last.right = node;
    }
    last = node;

    const { left, right } = node;
    traverse(left);
    traverse(right);
  };

  traverse(root);
}
