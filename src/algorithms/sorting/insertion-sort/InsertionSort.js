const defaultComparator = (pre, next) => pre - next;

class InsertionSort {
  static sort(array, compare = defaultComparator) {
    for (let i = 1; i < array.length; i++) {
      let j = i - 1;
      const current = array[i];
      while (j >= 0 && compare(array[j], current) > 0) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = current;
    }
    return array;
  }
}

export default InsertionSort;
