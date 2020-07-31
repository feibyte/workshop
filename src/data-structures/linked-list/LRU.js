import DoublyLinkedList from './DoublyLinkedList';

class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.link = new DoublyLinkedList();
    this.map = {};
  }

  get(key) {
    const node = this.map[key];
    if (node) {
      this.link.moveToFirst(node);
      return node.val;
    }
    return -1;
  }

  put(key, value) {
    if (this.map[key]) {
      this.map[key].val = value;
      this.link.moveToFirst(this.map[key]);
    } else {
      this.map[key] = this.link.insert(value);
      this.map[key].key = key;
      if (this.link.size() > this.capacity) {
        const deleted = this.link.deleteLast();
        if (deleted) {
          delete this.map[deleted.key];
        }
      }
    }
  }
}

export default LRU;
