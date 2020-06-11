import RedBlackTree, { COLOR } from './RedBlackTree';


describe('RedBlackTree', () => {
  const makeTree = () => {
    const tree = new RedBlackTree();
    tree.insert(15);
    tree.insert(6);
    tree.insert(18);
    tree.insert(3);
    tree.insert(7);
    tree.insert(17);
    tree.insert(20);
    tree.insert(2);
    tree.insert(4);
    tree.insert(13);
    tree.insert(9);
    return tree;
  };

  const height = (node) => {
    if (!node) {
      return 0;
    }
    return 1 + Math.max(height(node.left), height(node.right));
  };

  const isBlack = (node) => node.meta.color === COLOR.BLACK;

  const isRed = (node) => node.meta.color === COLOR.RED;

  const isBalance = (node) => {
    if (!node) {
      return [true, 1];
    }
    // 根节点非黑色
    if (!node.parent && !isBlack(node)) {
      return [false, 0];
    }

    let blacks = 0;
    if (isRed(node)) {
      if ((node.left && isRed(node.left)) || (node.right && isRed(node.right))) {
        return [false, 0];
      }
    } else {
      blacks = 1;
    }

    const leftResult = isBalance(node.left);
    const rightResult = isBalance(node.right);
    const isValid = leftResult[0] && rightResult[0] && leftResult[1] === rightResult[1];

    return [isValid, leftResult[1] + blacks];
  };

  it('should be valid when build a tree by inserting nodes', () => {
    const tree = makeTree();
    expect(isBalance(tree.root)[0]).toBe(true);
  });
});
