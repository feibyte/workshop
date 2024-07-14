import type { TreeNode } from './shared';

/**
 * Basically, we can save all numbers in a queue by traversing tree first.
 * Also, we can change it to iterate with stack.
 */
class BSTIterator {
  private root: TreeNode | null;
  private stack: TreeNode[];

  constructor(root: TreeNode | null) {
    this.root = root;
    this.stack = [];
    this.pushToLeft(root);
  }

  pushToLeft(root: TreeNode | null) {
    let node = root;
    while (node !== null) {
      this.stack.push(node);
      node = node.left;
    }
  }

  next(): number {
    const current = this.stack.pop();
    if (!current) {
      throw new Error('No more element');
    }
    this.pushToLeft(current.right);
    return current.val;
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }
}
