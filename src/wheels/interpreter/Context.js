class Context {
  constructor(outer = null) {
    this.outer = outer;
    this.map = {};
  }

  add(key, value) {
    this.map[key] = value;
  }

  lookup(key) {
    if (this.map[key] !== undefined) {
      return this.map[key];
    }
    if (this.outer !== null) {
      return this.outer.lookup(key);
    }
    return undefined;
  }
}

export default Context;
