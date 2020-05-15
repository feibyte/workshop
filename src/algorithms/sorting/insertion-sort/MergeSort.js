const defaultComparator = (pre, next) => pre - next;

class MergeSort {
  constructor(compare = defaultComparator) {
    this.compare = compare;
  }

  merge(array, p, q, r) {
    const left = array.slice(p, q + 1);
    const right = array.slice(q + 1, r + 1);
    let i = 0;
    let j = 0;
    let k = p;
    while (i < left.length && j < right.length) {
      if (this.compare(left[i], right[j]) <= 0) {
        array[k++] = left[i++];
      } else {
        // Here we can count inversions
        // count += (left.length - i);
        array[k++] = right[j++];
      }
    }
    while (i < left.length) {
      array[k++] = left[i++];
    }
    while (j < right.length) {
      array[k++] = right[j++];
    }
    return array;
  }

  doSort(array, p, r) {
    if (p < r) {
      const q = Math.floor((p + r) / 2);
      this.doSort(array, p, q);
      this.doSort(array, q + 1, r);
      this.merge(array, p, q, r);
    }
  }

  sort(array) {
    this.doSort(array, 0, array.length - 1);
    return array;
  }
}

export default MergeSort;
