import type { TreeNode } from './shared';

/**
 Do not return anything, modify root in-place instead.

 首先想到的是中序遍历，可以得到一个数组，对数组进行排序，再次遍历比较与有序数组不同的节点，找到两个节点，交换两个节点的值

 接下来思考，得到的这个数组中只有两个数据需要交换，如何才能发现呢？必须是因为这两个数据与周边的数据不符合升序的规则，不符合规则的数字肯定是在两边
 所以可以通过中序遍历，找到这两个数据，然后交换
 */
export function recoverTree(root: TreeNode | null): void {
  let lastNode: TreeNode | null = null;

  let firstInvalidNode: TreeNode | null = null;
  let lastInvalidNode: TreeNode | null = null;

  const inorderTraverse = (node: TreeNode | null) => {
    if (node === null) {
      return;
    }
    inorderTraverse(node.left);
    if (lastNode !== null && node.val <= lastNode.val) {
      if (firstInvalidNode == null) {
        firstInvalidNode = lastNode;
      }
      lastInvalidNode = node;
    }
    lastNode = node;
    inorderTraverse(node.right);
  };

  const swap = (node1: TreeNode, node2: TreeNode) => {
    const temp = node1.val;
    node1.val = node2.val;
    node2.val = temp;
  };

  inorderTraverse(root);

  if (firstInvalidNode !== null && lastInvalidNode !== null) {
    swap(firstInvalidNode, lastInvalidNode);
  }
}
