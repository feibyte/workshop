import AvlTree from './AvlTree';

describe('AvlTree', () => {
  it('should keep balance by rotation', () => {
    const tree = new AvlTree();

    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(10);
    tree.insert(1);

    expect(tree.root.key).toBe(30);
    expect(tree.height(tree.root)).toBe(3);
  });
});
