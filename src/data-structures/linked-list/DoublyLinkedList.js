// eslint-disable-next-line max-classes-per-file
class Node {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.nil = new Node();
    this.nil.prev = this.nil;
    this.nil.next = this.nil;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  insert(val) {
    const node = new Node(val);
    node.next = this.nil.next;
    node.prev = this.nil;
    this.nil.next.prev = node;
    this.nil.next = node;
    this.length++;
    return node;
  }

  search(val) {
    let currentNode = this.nil.next;
    while (currentNode !== this.nil) {
      if (currentNode.val === val) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  delete(val) {
    const node = this.search(val);
    if (node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      this.length--;
    }
  }

  moveToFirst(node) {
    if (this.nil.next === node) {
      return;
    }
    if (node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    node.next = this.nil.next;
    node.prev = this.nil;
    this.nil.next.prev = node;
    this.nil.next = node;
  }

  deleteLast() {
    if (this.size() > 0) {
      const toDelete = this.nil.prev;
      toDelete.prev.next = this.nil;
      this.nil.prev = toDelete.prev;
      return toDelete;
    }
    return null;
  }
}

export default DoublyLinkedList;
