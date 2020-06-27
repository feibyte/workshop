class UnionFind {
  constructor() {
    this.id = {};
    this.count = 0;
    this.sz = {};
  }

  addItem(p) {
    if (this.id[p] === undefined) {
      this.id[p] = p;
      this.sz[p] = 1;
      this.count++;
    }
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  find(p) {
    if (this.id[p] === undefined) {
      throw new Error('item is not in sets');
    }
    while (p !== this.id[p]) {
      p = this.id[p];
    }
    return p;
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot !== qRoot) {
      if (this.sz[pRoot] > this.sz[qRoot]) {
        this.id[qRoot] = pRoot;
        this.sz[pRoot] += this.sz[qRoot];
      } else {
        this.id[pRoot] = qRoot;
        this.sz[qRoot] += this.sz[pRoot];
      }
      this.count--;
    }
  }
}

export default UnionFind;
