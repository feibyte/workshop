import TreeNode from '../TreeNode';

const defaultComparator = (pre, next) => pre - next;

class BinarySearchTree {
  constructor(compare = defaultComparator) {
    this.root = null;
    this.compare = compare;
  }

  isNil(node) {
    return !node;
  }

  inorderTraverse(node, callback) {
    if (!this.isNil(node)) {
      this.inorderTraverse(node.left, callback);
      callback(node);
      this.inorderTraverse(node.right, callback);
    }
  }

  preOrderTraverse(node, callback) {
    callback(node);
    if (!this.isNil(node)) {
      this.preOrderTraverse(node.left, callback);
      this.preOrderTraverse(node.right, callback);
    }
  }

  postOrderTraverse(node, callback) {
    if (!this.isNil(node)) {
      this.postOrderTraverse(node.left, callback);
      this.postOrderTraverse(node.right, callback);
      callback(node);
    }
  }

  dfsPreOrder(callback) {
    let current = this.root;
    const stack = [];
    while (current || stack.length) {
      while (current) {
        callback(current);
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      // 转右
      current = current.right;
    }
  }

  dfsInOrder(callback) {
    let current = this.root;
    const stack = [];
    while (current || stack.length) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      callback(current);
      // 转右
      current = current.right;
    }
  }

  dfsPostOrder(callback) {
    let current = this.root;
    const stack = [];
    let last = null;
    while (current || stack.length) {
      while (current) {
        stack.push(current);
        current = current.left;
      }

      current = stack[stack.length - 1];
      // 右节点为空，或者已访问（必定是上个）
      if (current.right === null || current.right === last) {
        stack.pop();
        callback(current);
        last = current; // 标记上次访问节点
        current = null; // 该次遍历结束，从堆栈弹出
      } else {
        // 转右
        current = current.right;
      }
    }
  }

  traverse(callback) {
    this.postOrderTraverse(this.root, callback);
  }

  search(key) {
    let node = this.root;
    while (!this.isNil(node) && this.compare(node.key, key) !== 0) {
      if (this.compare(key, node.key) > 0) {
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
      if (this.compare(key, node.key) > 0) {
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
    } else if (this.compare(key, newNode.parent.key) > 0) {
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
      if (this.compare(key, node.key) > 0) {
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

  // calculate properties of oldParent, newParent
  recalculateOnRotation() {}

  leftRotate(node) {
    const grandNode = node.parent;
    const newParent = node.right;

    node.right = newParent.left;
    if (!this.isNil(newParent.left)) {
      newParent.left.parent = node;
    }

    newParent.left = node;
    node.parent = newParent;
    newParent.parent = grandNode;

    if (this.isNil(grandNode)) {
      this.root = newParent;
    } else if (grandNode.left === node) {
      grandNode.left = newParent;
    } else {
      grandNode.right = newParent;
    }
    this.recalculateOnRotation(node, newParent);
  }

  rightRotate(node) {
    const grandNode = node.parent;
    const newParent = node.left;

    node.left = newParent.right;
    if (!this.isNil(newParent.right)) {
      newParent.right.parent = node;
    }

    newParent.right = node;
    node.parent = newParent;
    newParent.parent = grandNode;

    if (this.isNil(grandNode)) {
      this.root = newParent;
    } else if (grandNode.left === node) {
      grandNode.left = newParent;
    } else {
      grandNode.right = newParent;
    }
    this.recalculateOnRotation(node, newParent);
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
