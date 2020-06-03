import LinkedList from '../linked-list/LinkedList';

class ChainingHashTable {
  constructor() {
    this.bucketSize = 11;
    this.bucket = [];
  }

  hash(key) {
    let hashCode = 0;
    let base = 1;
    for (let i = 0; i < key.length; i++) {
      hashCode += base * key.charCodeAt(i);
      base *= 31;
    }
    return hashCode % this.bucketSize;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.bucket[index]) {
      this.bucket[index] = new LinkedList((objA, objB) => objA.key === objB.key);
    }
    this.bucket[index].insert({ key, value });
  }

  get(key) {
    const index = this.hash(key);
    if (this.bucket[index]) {
      const node = this.bucket[index].search({ key });
      if (node) {
        return node.value;
      }
    }
    return undefined;
  }

  delete(key) {
    const index = this.hash(key);
    if (this.bucket[index]) {
      this.bucket[index].delete({ key });
    }
  }
}

export default ChainingHashTable;
