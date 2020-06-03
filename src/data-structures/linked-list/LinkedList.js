// Here's a singly link list

const defaultEquals = (elementA, elementB) => elementA === elementB;

class LinkedList {
  constructor(equals = defaultEquals) {
    this.head = null;
    this.length = 0;
    this.equals = equals;
  }

  search(element) {
    let currentNode = this.head;
    while (currentNode) {
      if (this.equals(currentNode.element, element)) {
        return currentNode.element;
      }
      currentNode = currentNode.next;
    }
    return undefined;
  }

  // Here insert first position of the link
  insert(element) {
    this.head = {
      element,
      next: this.head,
    };
    this.length++;
  }

  delete(element) {
    if (!this.head) {
      throw Error('List is empty');
    }
    if (this.equals(this.head.element, element)) {
      this.head = this.head.next;
      return;
    }
    let pre = this.head;
    while (pre.next) {
      if (this.equals(pre.next.element, element)) {
        pre.next = pre.next.next;
        this.length--;
        return;
      }
      pre = pre.next;
    }
  }

  size() {
    return this.length;
  }

  // 单向链表反转，只使用固定空间
  reverse() {
    const reverseRecursive = (node) => {
      if (!node || !node.next) {
        return node;
      }
      const tail = node.next;
      const head = reverseRecursive(node.next);
      node.next = null;
      tail.next = node;
      return head;
    };
    this.head = reverseRecursive(this.head);
  }

  toArray() {
    const result = [];
    let currentNode = this.head;
    while (currentNode) {
      result.push(currentNode.element);
      currentNode = currentNode.next;
    }
    return result;
  }
}

export default LinkedList;
