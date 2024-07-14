class OpenAddressHashTable {
  constructor() {
    this.bucketSize = 11;
    this.bucket = [];
    this.size = 0;
  }

  hash(key) {
    let hashCode = 7; // 随机选择的初始值
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * 31 + key.charCodeAt(i)) % this.bucketSize;
    }
    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    while (this.bucket[index]) {
      index = (index + 1) % this.bucketSize;
    }
    this.bucket[index] = { key, value };
    this.size++;
    if (this.size / this.bucketSize > 0.5) {
      this.rehashing();
    }
  }

  rehashing() {
    const bucket = [...this.bucket];
    this.bucket = [];
    this.size = 0;
    this.bucketSize *= 2;
    // eslint-disable-next-line no-restricted-syntax
    for (const bucketElement of bucket) {
      if (bucketElement) {
        const { key, value } = bucketElement;
        this.set(key, value);
      }
    }
  }

  get(key) {
    let index = this.hash(key);
    while (this.bucket[index]) {
      if (this.bucket[index].key === key) {
        return this.bucket[index].value;
      }
      index = (index + 1) % this.bucketSize;
    }
    return undefined;
  }

  delete(key) {
    let index = this.hash(key);
    let isCleaning = false;
    while (this.bucket[index]) {
      if (isCleaning) {
        if (this.hash(this.bucket[index].key) !== index) {
          this.set(this.bucket[index].key, this.bucket[index].value);
          this.bucket[index] = undefined;
        }
      } else if (this.bucket[index].key === key) {
        this.bucket[index] = undefined;
        isCleaning = true;
        this.size--;
      }
      index = (index + 1) % this.bucketSize;
    }
  }
}

export default OpenAddressHashTable;
