import { TreeNode } from './shared';

function buildTree_v1(preorder: number[], inorder: number[]): TreeNode | null {
  // num = preorder[0]; get first from preorder as root
  // split inorder, left right with num
  // filter preorder for left and right, // don't need to filter, just count as we have index
  // leftPreorder , rightPreorder
  // buildLeft and right
  // To improve use array index instead of slicing a new array.

  if (preorder.length === 0) {
    return null;
  }

  const num = preorder[0];
  const index = inorder.indexOf(num); // also is the number of left tree nodes
  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  const leftPreOrder = preorder.slice(1, 1 + index);
  const rightPreOrder = preorder.slice(index + 1);

  const left = buildTree(leftPreOrder, leftInorder);
  const right = buildTree(rightPreOrder, rightInorder);
  return new TreeNode(num, left, right);
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // To improve use array index instead of slicing a new array.

  const buildSubTree = (
    preStart: number,
    preEnd: number,
    inStart: number,
    inEnd: number,
  ): TreeNode | null => {
    if (preStart < preEnd) {
      return null;
    }
    const num = preorder[preStart];
    const index = inorder.indexOf(num);
    const count = index - preStart;

    const left = buildSubTree(
      preStart + 1,
      preStart + 1 + count,
      inStart,
      inStart + count,
    );
    const right = buildSubTree(
      preStart + count + 1,
      preEnd,
      inStart + count,
      inEnd,
    );

    return new TreeNode(num, left, right);
  };

  return buildSubTree(0, preorder.length - 1, 0, inorder.length - 1);
}
