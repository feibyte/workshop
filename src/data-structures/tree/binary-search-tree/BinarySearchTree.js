import TreeNode from '../TreeNode';

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  inorderTraverse(node, callback) {
    if (node) {
      this.inorderTraverse(node.left, callback);
      callback(node);
      this.inorderTraverse(node.right, callback);
    }
  }

  traverse(callback) {
    this.inorderTraverse(this.root, callback);
  }

  search(key) {
    let node = this.root;
    while (node && node.key !== key) {
      if (key > node.key) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return node;
  }

  getMinimum(node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  minimum() {
    return this.getMinimum(this.root);
  }

  getMaximum(node) {
    while (node && node.right) {
      node = node.right;
    }
    return node;
  }

  maximum() {
    return this.getMaximum(this.root);
  }

  insert(key) {
    const newNode = new TreeNode(key);
    let node = this.root;
    let parent = null;
    while (node) {
      parent = node;
      if (key > node.key) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    newNode.parent = parent;
    if (!parent) {
      this.root = newNode;
    } else if (key > parent.key) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    return newNode;
  }

  predecessor(node) {
    if (node.left) {
      return this.getMaximum(node.left);
    }
    let { parent } = node;
    while (parent && parent.left === node) {
      node = parent;
      parent = node.parent;
    }
    return parent;
  }

  successor(node) {
    if (node.right) {
      return this.getMinimum(node.right);
    }
    let { parent } = node;
    while (parent && parent.right === node) {
      node = parent;
      parent = node.parent;
    }
    return parent;
  }

  transplant(nodeU, nodeV) {
    const { parent } = nodeU;
    if (!parent) {
      this.root = nodeV;
      return;
    }
    if (nodeU === nodeU.parent.left) {
      nodeU.parent.left = nodeV;
    } else {
      nodeU.parent.right = nodeV;
    }
    if (nodeV) {
      nodeV.parent = nodeU.parent;
    }
  }

  delete(node) {
    if (!node.left) {
      this.transplant(node, node.right);
      return;
    }
    if (!node.right) {
      this.transplant(node, node.left);
      return;
    }
    const pivot = this.getMinimum(node.right);
    if (pivot.parent !== node) {
      this.transplant(pivot, pivot.right);
      pivot.right = node.right;
      pivot.right.parent = pivot;
    }
    this.transplant(node, pivot);
    pivot.left = node.left;
    node.left.parent = pivot;
  }
}

export default BinarySearchTree;
