// eslint-disable-next-line max-classes-per-file

import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

export const COLOR = { RED: 'RED', BLACK: 'BLACK' };
// class TreeNode {
//   constructor(key) {
//     this.key = key;
//     this.parent = null;
//     // Here, we're not setting NIL for leaves.
//     this.left = null;
//     this.right = null;
//     this.color = COLOR.RED;
//   }
// }

class RedBlackTree extends BinarySearchTree {
  leftRotate(node) {
    const grandNode = node.parent;
    const newParent = node.right;

    node.right = newParent.left;
    if (newParent.left) {
      newParent.left.parent = node;
    }

    newParent.left = node;
    node.parent = newParent;
    newParent.parent = grandNode;

    if (!grandNode) {
      this.root = newParent;
    } else if (grandNode.left === node) {
      grandNode.left = newParent;
    } else {
      grandNode.right = newParent;
    }
  }

  rightRotate(node) {
    const grandNode = node.parent;
    const newParent = node.left;

    node.left = newParent.right;
    if (newParent.right) {
      newParent.right.parent = node;
    }

    newParent.right = node;
    node.parent = newParent;
    newParent.parent = grandNode;

    if (!grandNode) {
      this.root = newParent;
    } else if (grandNode.left === node) {
      grandNode.left = newParent;
    } else {
      grandNode.right = newParent;
    }
  }

  insert(key) {
    const newNode = super.insert(key);
    this.markRed(newNode);
    this.balance(newNode);
  }

  getUncle(node) {
    if (node.parent.left === node) {
      return node.parent.right;
    }
    return node.parent.left;
  }

  markBlack(node) {
    node.meta.color = COLOR.BLACK;
  }

  markRed(node) {
    node.meta.color = COLOR.RED;
  }

  isBlack(node) {
    return node.meta.color === COLOR.BLACK;
  }

  isRed(node) {
    return node.meta.color === COLOR.RED;
  }

  balance(node) {
    if (!node.parent) {
      this.markBlack(node);
      return;
    }
    if (this.isBlack(node.parent)) {
      return;
    }
    // otherwise, isRed(node.parent) && node.parent.parent !== null
    const uncle = this.getUncle(node.parent);

    if (uncle && this.isRed(uncle)) {
      this.markBlack(node.parent);
      this.markBlack(uncle);
      this.markRed(node.parent.parent);
      this.balance(node.parent.parent);
      return;
    }
    // uncle is null or uncle is BLACK
    // node is right node.
    const grandParent = node.parent.parent;
    // 形如 < 旋转成 /
    if (node === node.parent.right && node.parent === grandParent.left) {
      this.leftRotate(node.parent);
      node = node.left; // The previous parent, but now node.parent === grandParent
    }
    // 形如 > 旋转成 \
    if (node === node.parent.left && node.parent === grandParent.right) {
      this.rightRotate(node.parent);
      node = node.right; // The previous parent, but now node.parent === grandParent
    }
    this.markBlack(node.parent);
    this.markRed(grandParent);
    if (node === node.parent.right) {
      this.leftRotate(grandParent);
    } else { // node === node.parent.left
      this.rightRotate(grandParent);
    }
  }
}

export default RedBlackTree;
