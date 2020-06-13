import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

class AvlTree extends BinarySearchTree {
  height(node) {
    if (!node) {
      return 0;
    }
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  balanceFactor(node) {
    return this.height(node.left) - this.height(node.right);
  }

  insert(value) {
    let node = super.insert(value);
    while (!this.isNil(node)) {
      this.balance(node);
      node = node.parent;
    }
  }

  balance(node) {
    const factor = this.balanceFactor(node);
    if (factor > 1) {
      if (this.balanceFactor(node.left) <= 0) {
        this.leftRotate(node.left);
      }
      this.rightRotate(node);
    } else if (factor < -1) {
      if (this.balanceFactor(node.right) >= 0) {
        this.rightRotate(node.right);
      }
      this.leftRotate(node);
    }
  }

  delete(node) {
    const toDelete = node;
    node = node.parent;
    super.delete(toDelete);
    while (!this.isNil(node)) {
      this.balance(node);
      node = node.parent;
    }
  }

  toArray() {
    const result = [];
    this.traverse((node) => {
      if (node) {
        result.push(node.key);
      }
    });
    return result;
  }

  toString() {
    return this.toArray().join(',');
  }
}

export default AvlTree;
