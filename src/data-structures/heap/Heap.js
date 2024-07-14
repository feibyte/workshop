class Heap {
  constructor(array = []) {
    this.array = array;
  }

  build() {
    const lastParentNodeIndex = Math.floor(this.array.length / 2 - 1);
    for (let i = lastParentNodeIndex; i >= 0; i--) {
      this.heapify(i);
    }
  }

  isInRightPosition() {
    throw new Error('isInRightPosition() should be override');
  }

  heapify(i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let maxIndex = i;
    const len = this.array.length;
    if (
      left < len &&
      this.isInRightPosition(this.array[left], this.array[maxIndex])
    ) {
      maxIndex = left;
    }
    if (
      right < len &&
      this.isInRightPosition(this.array[right], this.array[maxIndex])
    ) {
      maxIndex = right;
    }
    if (maxIndex !== i) {
      this.exchange(i, maxIndex);
      this.heapify(maxIndex);
    }
  }

  exchange(i, j) {
    const temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  }

  add(num) {
    this.array.push(num);
    this.swim(this.array.length - 1);
  }

  swim(i) {
    const parent = Math.floor((i + 1) / 2 - 1);
    if (
      parent >= 0 &&
      this.isInRightPosition(this.array[i], this.array[parent])
    ) {
      this.exchange(i, parent);
      this.swim(parent);
    }
  }

  extract() {
    if (this.array.length === 0) {
      throw new Error('The heap is empty');
    }
    const first = this.array[0];
    this.array[0] = this.array[this.array.length - 1];
    this.array.pop();
    this.heapify(0);
    return first;
  }

  sort() {
    const sortedArray = [];
    while (this.array.length !== 0) {
      const first = this.extract();
      sortedArray.unshift(first);
    }
    return sortedArray;
  }

  delete(i) {
    if (i >= this.array.length) {
      throw Error('index out of heap bound');
    }
    const tail = this.array.pop();
    if (this.isInRightPosition(this.array[i], tail)) {
      this.array[i] = tail;
      this.heapify(i);
    } else {
      this.array[i] = tail;
      this.swim(i);
    }
  }

  isEmpty() {
    return this.array.length === 0;
  }
}

export default Heap;
