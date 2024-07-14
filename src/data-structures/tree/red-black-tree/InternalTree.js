import RedBlackTree from './RedBlackTree';

const compare = (internalA, internalB) => {
  if (internalA[1] < internalB[0]) {
    return -1;
  }
  if (internalA[0] > internalB[1]) {
    return 1;
  }
  return 0;
};

class InternalTree extends RedBlackTree {
  constructor() {
    super(compare);
    this.NIL.meta.max = 0;
    this.NIL.key = [0, 0];
  }

  calculateMax(node) {
    node.meta.max = Math.max(
      node.key[1],
      node.left.meta.max,
      node.right.meta.max,
    );
  }

  insertCallBack(newNode) {
    this.calculateMax(newNode);
    let node = newNode.parent;
    while (!this.isNil(node)) {
      this.calculateMax(node);
      node = node.parent;
    }
  }

  deleteCallback(parent) {
    while (!this.isNil(parent)) {
      this.calculateMax(parent);
      parent = parent.parent;
    }
  }

  recalculateOnRotation(oldParent, newParent) {
    this.calculateMax(oldParent);
    this.calculateMax(newParent);
  }

  search(key) {
    let node = this.root;
    while (!this.isNil(node) && this.compare(node.key, key) !== 0) {
      if (!this.isNil(node.left) && node.left.meta.max >= key[0]) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return node;
  }
}

export default InternalTree;
