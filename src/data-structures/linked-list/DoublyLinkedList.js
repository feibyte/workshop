
// eslint-disable-next-line max-classes-per-file
class Node {
  constructor(element) {
    this.element = element;
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

  insert(element) {
    const node = new Node(element);
    node.next = this.nil.next;
    node.prev = this.nil;
    this.nil.next.prev = node;
    this.nil.next = node;
    this.length++;
  }

  search(element) {
    let currentNode = this.nil.next;
    while (currentNode !== this.nil) {
      if (currentNode.element === element) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  delete(element) {
    const node = this.search(element);
    if (node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      this.length--;
    }
  }
}

export default DoublyLinkedList;
