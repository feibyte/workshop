class MaxHeap {
  constructor(array) {
    this.array = array;
    this.build();
  }

  build() {
    const lastParentNodeIndex = Math.floor(this.array.length / 2 - 1);
    for (let i = lastParentNodeIndex; i >= 0; i--) {
      this.heapify(i);
    }
  }

  heapify(i) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let maxIndex = i;
    const len = this.array.length;
    if (left < len && this.array[left] > this.array[maxIndex]) {
      maxIndex = left;
    }
    if (right < len && this.array[right] > this.array[maxIndex]) {
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
    if (parent >= 0 && this.array[i] > this.array[parent]) {
      this.exchange(i, parent);
      this.swim(parent);
    }
  }

  extractMax() {
    if (this.array.length === 0) {
      throw new Error('The heap is empty');
    }
    const max = this.array[0];
    this.array[0] = this.array[this.array.length - 1];
    this.array.pop();
    this.heapify(0);
    return max;
  }

  sort() {
    const sortedArray = [];
    while (this.array.length !== 0) {
      const max = this.extractMax();
      sortedArray.unshift(max);
    }
    return sortedArray;
  }
}

export default MaxHeap;
