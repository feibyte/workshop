import RedBlackTree from './RedBlackTree';

class RedBlackTreeWithSize extends RedBlackTree {
  constructor() {
    super();
    this.NIL.meta.size = 0;
  }

  insertCallBack(newNode) {
    newNode.meta.size = 1;
    let node = newNode.parent;
    while (!this.isNil(node)) {
      node.meta.size++;
      node = node.parent;
    }
  }

  deleteCallback(node) {
    while (!this.isNil(node)) {
      node.meta.size--;
      node = node.parent;
    }
  }

  recalculateOnRotation(oldParent, newParent) {
    oldParent.meta.size =
      oldParent.left.meta.size + oldParent.right.meta.size + 1;
    newParent.meta.size =
      newParent.left.meta.size + newParent.left.meta.size + 1;
  }

  select(i) {
    let node = this.root;
    while (!this.isNil(node)) {
      const r = node.left.meta.size + 1;
      if (i === r) {
        break;
      } else if (i > r) {
        i -= r;
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return node;
  }

  rank(node) {
    let r = node.left.meta.size + 1;
    while (!this.isNil(node)) {
      if (node === node.parent.right) {
        r += node.parent.left.meta.size + 1;
      }
      node = node.parent;
    }
    return r;
  }
}

export default RedBlackTreeWithSize;
