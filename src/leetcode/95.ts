/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const cachedTrees = new Map<string, Array<TreeNode | null>>();

/**
 * 递归生产子树
 * @param start
 * @param end
 */
const generateRangeTrees = (
  start: number,
  end: number,
): Array<TreeNode | null> => {
  if (start > end) {
    return [null];
  }
  if (start === end) {
    return [new TreeNode(start)];
  }

  const cacheKey = `${start}#${end}`;
  const cached = cachedTrees.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  const result: TreeNode[] = [];
  for (let i = start; i <= end; i++) {
    const leftTrees = generateRangeTrees(start, i - 1);
    const rightTrees = generateRangeTrees(i + 1, end);

    for (const leftTree of leftTrees) {
      for (const rightTree of rightTrees) {
        const root = new TreeNode(i, leftTree, rightTree);
        result.push(root);
      }
    }
  }
  cachedTrees.set(cacheKey, result);
  return result;
};

export function generateTrees(n: number): Array<TreeNode | null> {
  return generateRangeTrees(1, n);
}
