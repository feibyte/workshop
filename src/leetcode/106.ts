import { TreeNode } from './shared';

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  // num = preorder[0]; get first from preorder as root
  // split inorder, left right with num
  // filter preorder for left and right, // don't need to filter, just count as we have index
  // leftPreorder , rightPreorder
  // buildLeft and right
  // To improve use array index instead of slicing a new array.

  if (postorder.length === 0) {
    return null;
  }

  const num = postorder[postorder.length - 1];
  const index = inorder.indexOf(num); // also is the number of left tree nodes
  const leftInorder = inorder.slice(0, index);
  const rightInorder = inorder.slice(index + 1);

  const leftPostOrder = postorder.slice(0, index);
  const rightPostOrder = postorder.slice(index, -1);

  const left = buildTree(leftInorder, leftPostOrder);
  const right = buildTree(rightInorder, rightPostOrder);
  return new TreeNode(num, left, right);
}
