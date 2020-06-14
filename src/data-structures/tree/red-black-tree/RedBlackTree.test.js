import RedBlackTree from './RedBlackTree';


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

  it('should be valid when build a tree by inserting nodes', () => {
    const tree = makeTree();
    expect(tree.isBalanceTree()).toBe(true);
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
    expect(tree.isBalanceTree()).toBe(true);
    tree.delete(tree.search(8));
    expect(tree.isBalanceTree()).toBe(true);
    tree.delete(tree.search(12));
    expect(tree.isBalanceTree()).toBe(true);
    tree.delete(tree.search(19));
    expect(tree.isBalanceTree()).toBe(true);
    tree.delete(tree.search(31));
    tree.delete(tree.search(38));
    expect(tree.isBalanceTree()).toBe(true);
    tree.delete(tree.search(41));
    expect(tree.isBalanceTree()).toBe(true);
  });
});
