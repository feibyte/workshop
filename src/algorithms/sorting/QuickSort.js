const defaultComparator = (pre, next) => pre - next;

class QuickSort {
  constructor(compare = defaultComparator) {
    this.compare = compare;
  }

  exchange(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  partition(array, p, r) {
    const pivot = array[r];
    let i = p - 1;
    for (let j = p; j < r; j++) {
      if (this.compare(array[j], pivot) <= 0) {
        i += 1;
        this.exchange(array, i, j);
      }
    }
    this.exchange(array, i + 1, r);
    return i + 1;
  }

  doSort(array, p, r) {
    if (p < r) {
      const q = this.partition(array, p, r);
      this.doSort(array, p, q - 1);
      this.doSort(array, q + 1, r);
    }
  }

  sort(array) {
    this.doSort(array, 0, array.length - 1);
    return array;
  }

  partitionWithSameElements(array, p, r) {
    const pivot = array[r];
    let i = p - 1;
    let t = i;
    for (let j = p; j < r; j++) {
      if (this.compare(array[j], pivot) <= 0) {
        i += 1;
        this.exchange(array, i, j);
        if (this.compare(array[i], pivot) < 0) { // as we changed it with j
          t += 1;
          this.exchange(array, t, i);
        }
      }
    }
    this.exchange(array, i + 1, r);
    return [t + 1, i + 1];
  }

  doSortInThreeParts(array, p, r) {
    if (p < r) {
      const [q, t] = this.partitionWithSameElements(array, p, r);
      this.doSortInThreeParts(array, p, q - 1);
      this.doSortInThreeParts(array, t + 1, r);
    }
  }

  sortInThreeParts(array) {
    this.doSortInThreeParts(array, 0, array.length - 1);
    return array;
  }

  // Bear in mind: the split is always nontrivial Since p <= j < r
  // So here's difference when do sorting
  // this.doSort(array, p, q); // q instead of q - 1
  // this.doSort(array, q + 1, r);
  hoarePartition(array, p, r) {
    const pivot = array[p];
    let i = p - 1;
    let j = r + 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      do {
        j -= 1;
      } while (array[j] > pivot);

      do {
        i += 1;
      } while (array[i] < pivot);

      if (i < j) {
        this.exchange(array, i, j);
      } else {
        return j;
      }
    }
  }

  doHoareSort(array, p, r) {
    if (p < r) {
      const q = this.hoarePartition(array, p, r);
      this.doHoareSort(array, p, q);
      this.doHoareSort(array, q + 1, r);
    }
  }

  hoareSort(array) {
    this.doHoareSort(array, 0, array.length - 1);
    return array;
  }
}

export default QuickSort;
