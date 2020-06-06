import LinkedList from '../linked-list/LinkedList';

class ChainingHashTable {
  constructor() {
    this.bucketSize = 11; // 一般为素数
    this.bucket = [];
  }

  // 下面这个算法来自 JDK 的 hashcode，它相当于借助了整数的溢出，也就是自动取模 2^32
  // 但是 JS 采用的是双精度浮点数，所以不能利用这个性质
  hashCode(key) {
    let hashCode = 0;
    let base = 1;
    for (let i = key.length - 1; i >= 0; i--) {
      hashCode += base * key.charCodeAt(i);
      base *= 31;
    }
    return hashCode;
  }

  hash(key) {
    let hashCode = 7; // 随机选择的初始值
    for (let i = 0; i < key.length; i++) {
      hashCode = ((hashCode * 31) + key.charCodeAt(i)) % this.bucketSize;
    }
    return hashCode;
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
