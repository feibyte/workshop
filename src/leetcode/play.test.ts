import { isValidBST } from './98';

import { recoverTree } from './99';
import { pathSum } from './113';
import { TreeNode } from './shared';

describe('play', () => {
  it('98', () => {
    const result = isValidBST(
      new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    );
    expect(result).toBe(true);
  });

  it('99', () => {
    // const root = new TreeNode(1, new TreeNode(3, null, new TreeNode(2)));
    // const root = new TreeNode(1, new TreeNode(3, null, new TreeNode(2)))
    // const root= new TreeNode(3, new TreeNode(1), new TreeNode(4, new TreeNode(2), null));
    const root = new TreeNode(2, new TreeNode(3), new TreeNode(1));
    expect(isValidBST(root)).toBe(false);
    recoverTree(root);
    expect(isValidBST(root)).toBe(true);
  });
  it('113', () => {
    const root = new TreeNode(5, new TreeNode(4), new TreeNode(8));
    const result = pathSum(root, 9);
    expect(result).toEqual([[5, 4]]);
  });
});
