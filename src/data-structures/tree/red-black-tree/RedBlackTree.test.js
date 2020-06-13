import RedBlackTree, { COLOR, isNil } from './RedBlackTree';


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

  const isBlack = (node) => node.meta.color === COLOR.BLACK;

  const isRed = (node) => node.meta.color === COLOR.RED;

  const isBalance = (node) => {
    if (isNil(node)) {
      return [true, 1];
    }
    // 根节点非黑色
    if (isNil(node.parent) && !isBlack(node)) {
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

  it('should find it after inserting a number', () => {
    const tree = new RedBlackTree();
    tree.insert(41);
    tree.insert(38);
    tree.insert(31);
    tree.insert(12);
    tree.insert(19);
    tree.insert(8);
    expect(tree.search(12).key).toBe(12);
    expect(tree.search(38).key).toBe(38);
    expect(tree.search(8).key).toBe(8);
  });

  it('should return return min node when calling minimum', () => {
    const tree = makeTree();
    expect(tree.minimum().key).toBe(2);
  });

  it('should return return max node when calling maximum', () => {
    const tree = makeTree();
    expect(tree.maximum().key).toBe(20);
  });

  it('should be valid after deleting an node', () => {
    const tree = new RedBlackTree();
    tree.insert(41);
    tree.insert(38);
    tree.insert(31);
    tree.insert(12);
    tree.insert(19);
    tree.insert(8);
    expect(isBalance(tree.root)[0]).toBe(true);
    tree.delete(tree.search(8));
    expect(isBalance(tree.root)[0]).toBe(true);
    tree.delete(tree.search(12));
    expect(isBalance(tree.root)[0]).toBe(true);
    tree.delete(tree.search(19));
    expect(isBalance(tree.root)[0]).toBe(true);
    tree.delete(tree.search(31));
    tree.delete(tree.search(38));
    expect(isBalance(tree.root)[0]).toBe(true);
    tree.delete(tree.search(41));
    expect(isBalance(tree.root)[0]).toBe(true);
  });
});
