import TreeNode from '../TreeNode';
import BinarySearchTree from '../binary-search-tree/BinarySearchTree';

export const COLOR = { RED: 'RED', BLACK: 'BLACK' };
// 在插入操作中，不需要 NIL 也能处理。在红黑树删除的过程中，需要借助哨兵节点 NIL.
const NIL = new TreeNode();
NIL.meta.color = COLOR.BLACK;

class RedBlackTree extends BinarySearchTree {
  constructor(compare) {
    super(compare);
    this.root = NIL;
    this.bh = 1;
    this.NIL = NIL;
  }

  isNil(node) {
    return node === this.NIL;
  }

  createNewNode(key) {
    const newNode = new TreeNode(key);
    newNode.left = NIL;
    newNode.right = NIL;
    newNode.parent = NIL;
    this.markRed(newNode);
    return newNode;
  }

  insertCallBack() {}

  insert(key) {
    const newNode = super.insert(key);
    this.insertCallBack(newNode);
    this.markRed(newNode);
    this.insertFixup(newNode);
  }

  getSibling(node) {
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

  insertFixup(node) {
    if (this.isNil(node.parent)) {
      if (this.isRed(node)) {
        this.bh++;
      }
      this.markBlack(node);
      return;
    }
    if (this.isBlack(node.parent)) {
      return;
    }
    // otherwise, isRed(node.parent) && node.parent.parent !== null
    const uncle = this.getSibling(node.parent);

    if (!this.isNil(uncle) && this.isRed(uncle)) {
      this.markBlack(node.parent);
      this.markBlack(uncle);
      this.markRed(node.parent.parent);
      this.insertFixup(node.parent.parent);
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
    } else {
      // node === node.parent.left
      this.rightRotate(grandParent);
    }
  }

  deleteCallback() {}

  delete(node) {
    let originalColor = node.meta.color;
    let deletedNode;
    if (this.isNil(node.left)) {
      deletedNode = node.right;
      this.transplant(node, node.right);
    } else if (this.isNil(node.right)) {
      deletedNode = node.left;
      this.transplant(node, node.left);
    } else {
      const pivot = this.getMinimum(node.right);
      deletedNode = pivot.right;
      originalColor = pivot.meta.color;
      if (pivot.parent === node) {
        deletedNode.parent = pivot; // Here, just in case the deleteNode is NIL
      } else {
        this.transplant(pivot, pivot.right);
        pivot.right = node.right;
        pivot.right.parent = pivot;
      }
      this.transplant(node, pivot);
      pivot.left = node.left;
      node.left.parent = pivot;
      pivot.meta.color = node.meta.color;
    }
    this.deleteCallback(deletedNode.parent);
    if (originalColor === COLOR.BLACK) {
      if (this.isRed(deletedNode)) {
        this.markBlack(deletedNode);
      } else {
        this.deleteFixUp(deletedNode);
      }
    }
  }

  deleteFixUp(node) {
    // node is root
    if (this.isNil(node.parent)) {
      this.bh--;
      return;
    }

    let sibling = this.getSibling(node);
    //      P(Black)
    // N(Black)     S(Red)
    // 旋转 P 节点，P 与 S 交换颜色，这一步只是将兄弟节点调整为黑色情况，并没有修复黑色节点数问题。
    if (this.isRed(sibling)) {
      this.markRed(node.parent);
      this.markBlack(sibling);
      if (node.parent.left === node) {
        this.leftRotate(node.parent);
      } else {
        this.rightRotate(node.parent);
      }
    }

    //      P(Black)
    // N(Black)     S(Black) S 有两个黑色子节点
    sibling = this.getSibling(node);
    if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
      this.markRed(sibling);
      if (this.isRed(node.parent)) {
        this.markBlack(node.parent);
      } else {
        this.deleteFixUp(node.parent); // N 和 S 黑高平衡，但是 P 树黑高少 1 需要继续调整
      }
      return;
    }

    sibling = this.getSibling(node);
    // S is black, node is left node, but left child is red.
    if (node === node.parent.left && this.isBlack(sibling.right)) {
      this.markBlack(sibling.left);
      this.markRed(sibling);
      this.rightRotate(sibling);
    } else if (node === node.parent.right && this.isBlack(sibling.left)) {
      this.markBlack(sibling.right);
      this.markRed(sibling);
      this.leftRotate(sibling);
    }

    sibling = this.getSibling(node);
    sibling.meta.color = node.parent.meta.color;
    this.markBlack(node.parent);

    if (node === node.parent.left) {
      this.markBlack(sibling.right);
      this.leftRotate(node.parent);
    } else {
      this.markBlack(sibling.left);
      this.rightRotate(node.parent);
    }
  }

  findBlackNode(bh) {
    // Assert(bh <= this.bh);
    let node = this.root;
    let i = 0;
    while (!this.isNil(node)) {
      if (this.bh - i === bh) {
        break;
      }
      if (this.isBlack(node)) {
        i++;
      }
      node = node.right;
    }
    return node;
  }

  isBalanceTree() {
    const isBalance = (node) => {
      if (this.isNil(node)) {
        return [true, 1];
      }
      // 根节点非黑色
      if (this.isNil(node.parent) && !this.isBlack(node)) {
        return [false, 0];
      }

      let blacks = 0;
      if (this.isRed(node)) {
        if (
          (node.left && this.isRed(node.left)) ||
          (node.right && this.isRed(node.right))
        ) {
          return [false, 0];
        }
      } else {
        blacks = 1;
      }

      const leftResult = isBalance(node.left);
      const rightResult = isBalance(node.right);
      const isValid =
        leftResult[0] && rightResult[0] && leftResult[1] === rightResult[1];

      return [isValid, leftResult[1] + blacks];
    };
    return isBalance(this.root)[0];
  }
}

export default RedBlackTree;
