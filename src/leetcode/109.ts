import { type ListNode, TreeNode } from './shared';

const findSize = (head: ListNode | null): number => {
  let size = 0;
  let p = head;
  while (p !== null) {
    size++;
    p = p.next;
  }
  return size;
};

/*
  中序构建树，按照链表顺序
 */
function sortedListToBST(head: ListNode | null): TreeNode | null {
  const size = findSize(head);

  let p = head;

  const formBST = (start: number, end: number): TreeNode | null => {
    if (start > end) {
      return null;
    }

    if (p === null) {
      return null;
    }
    const middle = Math.floor((start + end) / 2);
    const left = formBST(start, middle - 1);
    const node = new TreeNode(p.val);
    p = p.next;
    const right = formBST(middle + 1, end);

    node.left = left;
    node.right = right;

    return node;
  };

  return formBST(0, size - 1);
}
