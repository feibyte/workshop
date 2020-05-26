class QuickSort {
  static exchange(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  static partition(array, p, r) {
    const pivot = array[r];
    let i = p - 1;
    for (let j = p; j < r; j++) {
      if (array[j] <= pivot) {
        i += 1;
        this.exchange(array, i, j);
      }
    }
    this.exchange(array, i + 1, r);
    return i + 1;
  }

  static doSort(array, p, r) {
    if (p < r) {
      const q = this.partition(array, p, r);
      this.doSort(array, p, q - 1);
      this.doSort(array, q + 1, r);
    }
  }

  static sort(array) {
    this.doSort(array, 0, array.length - 1);
    return array;
  }
}

export default QuickSort;
