import TreeNode from '../TreeNode';

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  isNil(node) {
    return !node;
  }

  inorderTraverse(node, callback) {
    if (!this.isNil(node)) {
      this.inorderTraverse(node.left, callback);
      callback(node);
      this.inorderTraverse(node.right, callback);
    } else {
      callback(node);
    }
  }

  preOrderTraverse(node, callback) {
    callback(node);
    if (!this.isNil(node)) {
      this.preOrderTraverse(node.left, callback);
      this.preOrderTraverse(node.right, callback);
    }
  }

  traverse(callback) {
    this.inorderTraverse(this.root, callback);
  }

  search(key) {
    let node = this.root;
    while (!this.isNil(node) && node.key !== key) {
      if (key > node.key) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return node;
  }

  getMinimum(node) {
    while (!this.isNil(node) && !this.isNil(node.left)) {
      node = node.left;
    }
    return node;
  }

  minimum() {
    return this.getMinimum(this.root);
  }

  getMaximum(node) {
    while (!this.isNil(node) && !this.isNil(node.right)) {
      node = node.right;
    }
    return node;
  }

  maximum() {
    return this.getMaximum(this.root);
  }

  createNewNode(key) {
    return new TreeNode(key);
  }

  insert(key) {
    const newNode = this.createNewNode(key);
    let node = this.root;
    let parent;
    while (!this.isNil(node)) {
      parent = node;
      if (key > node.key) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    if (parent) {
      newNode.parent = parent;
    }
    if (this.isNil(newNode.parent)) {
      this.root = newNode;
    } else if (key > newNode.parent.key) {
      newNode.parent.right = newNode;
    } else {
      newNode.parent.left = newNode;
    }
    return newNode;
  }

  // 持久二叉树， 插入节点会返回一个新的根节点。
  persistInsert(key) {
    const insertInto = (node) => {
      if (this.isNil(node)) {
        return this.createNewNode(key);
      }
      if (key > node.key) {
        const child = insertInto(node.right);
        return { ...node, right: child };
      }
      const child = insertInto(node.left);
      return { ...node, left: child };
    };
    const newTree = new BinarySearchTree();
    newTree.root = insertInto(this.root);
    return newTree;
  }

  predecessor(node) {
    if (!this.isNil(node.left)) {
      return this.getMaximum(node.left);
    }
    let { parent } = node;
    while (!this.isNil(parent) && parent.left === node) {
      node = parent;
      parent = node.parent;
    }
    return parent;
  }

  successor(node) {
    if (!this.isNil(node.right)) {
      return this.getMinimum(node.right);
    }
    let { parent } = node;
    while (!this.isNil(parent) && parent.right === node) {
      node = parent;
      parent = node.parent;
    }
    return parent;
  }

  transplant(nodeU, nodeV) {
    const { parent } = nodeU;
    if (this.isNil(parent)) {
      this.root = nodeV;
    } else if (nodeU === nodeU.parent.left) {
      nodeU.parent.left = nodeV;
    } else {
      nodeU.parent.right = nodeV;
    }
    if (nodeV) {
      nodeV.parent = nodeU.parent;
    }
  }

  delete(node) {
    if (this.isNil(node.left)) {
      this.transplant(node, node.right);
      return;
    }
    if (this.isNil(node.right)) {
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

  printTree() {
    const result = [];
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (this.isNil(node)) {
        result.push(null);
      } else {
        queue.push(node.left);
        queue.push(node.right);
        result.push(node.key);
      }
    }
    return result;
  }
}

export default BinarySearchTree;
