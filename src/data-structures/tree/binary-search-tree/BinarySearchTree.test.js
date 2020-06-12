import BinarySearchTree from './BinarySearchTree';

describe('BinarySearchTree', () => {
  const makeTree = () => {
    const tree = new BinarySearchTree();
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

  const toArray = (tree) => {
    const result = [];
    tree.traverse((node) => {
      if (node) {
        result.push(node.key);
      }
    });
    return result;
  };

  it('should return a node when calling search with given in tree', () => {
    const tree = makeTree();
    expect(tree.search(6).key).toBe(6);
  });

  it('should return return min node when calling minimum', () => {
    const tree = makeTree();
    expect(tree.minimum().key).toBe(2);
  });

  it('should return return max node when calling maximum', () => {
    const tree = makeTree();
    expect(tree.maximum().key).toBe(20);
  });

  it('should return previous node when calling predecessor', () => {
    const tree = makeTree();
    const node6 = tree.search(6);
    expect(tree.predecessor(node6).key).toBe(4);

    const node17 = tree.search(17);
    expect(tree.predecessor(node17).key).toBe(15);
  });

  it('should return next node when calling successor', () => {
    const tree = makeTree();
    const node4 = tree.search(4);
    expect(tree.successor(node4).key).toBe(6);

    const node15 = tree.search(15);
    expect(tree.successor(node15).key).toBe(17);
  });

  it('should return sorted when traverse in order', () => {
    const tree = makeTree();
    expect(toArray(tree)).toEqual([2, 3, 4, 6, 7, 9, 13, 15, 17, 18, 20]);
  });

  it('should return null after deleting it', () => {
    const tree = makeTree();
    tree.delete(tree.search(6));
    expect(tree.search(6)).toBeFalsy();
    tree.delete(tree.search(15));
    tree.delete(tree.search(20));
    tree.delete(tree.search(2));
    expect(toArray(tree)).toEqual([3, 4, 7, 9, 13, 17, 18]);
  });

  it('should return a new tree when calling persistInsert', () => {
    const tree = makeTree();
    const secondTree = tree.persistInsert(50);
    const thirdTree = secondTree.persistInsert(1);
    expect(secondTree.search(50)).toBeTruthy();
    expect(thirdTree.search(1)).toBeTruthy();
    expect(thirdTree.search(6)).toBeTruthy();
    expect(thirdTree.search(18)).toBeTruthy();
    expect(secondTree.search(1)).toBeFalsy();
    expect(tree.search(50)).toBeFalsy();
    expect(tree.search(1)).toBeFalsy();
  });
});
