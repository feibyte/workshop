import InternalTree from './InternalTree';

describe('RedBlackTreeWithSize', () => {
  const makeTree = () => {
    const tree = new InternalTree();
    tree.insert([16, 20]);
    tree.insert([8, 9]);
    tree.insert([15, 23]);
    tree.insert([17, 19]);
    tree.insert([0, 3]);
    tree.insert([19, 20]);
    tree.insert([6, 10]);
    tree.insert([25, 30]);
    tree.insert([26, 26]);
    tree.insert([5, 8]);
    return tree;
  };
  it('should has correct max', () => {
    const tree = makeTree();
    expect(tree.root.meta.max).toBe(30);
    expect(tree.root.left.meta.max).toBe(20);
    expect(tree.root.right.meta.max).toBe(30);
  });

  it('should search internal', () => {
    const tree = makeTree();
    expect(tree.search([22, 25]).key).toEqual([15, 23]);
    expect(tree.search([26, 26]).key).toEqual([26, 26]);
  });
});
