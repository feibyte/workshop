import RedBlackTreeWithSize from './RedBlackTreeWithSize';

describe('RedBlackTreeWithSize', () => {
  const makeTree = () => {
    const tree = new RedBlackTreeWithSize();
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
  it('should has correct size', () => {
    const tree = makeTree();
    expect(tree.root.meta.size).toBe(11);
    expect(tree.root.left.meta.size).toBe(7);
    expect(tree.root.right.meta.size).toBe(3);
  });

  it('should select node by index', () => {
    const tree = makeTree();
    expect(tree.select(0).key).toBe(undefined);
    expect(tree.select(1).key).toBe(2);
    expect(tree.select(10).key).toBe(18);
    expect(tree.select(5).key).toBe(7);
    expect(tree.select(20).key).toBe(undefined);
  });

  it('should return rank given a node', () => {
    const tree = makeTree();
    expect(tree.rank(tree.search(9))).toBe(6);
    expect(tree.rank(tree.search(2))).toBe(1);
    expect(tree.rank(tree.search(20))).toBe(11);
  });
});
