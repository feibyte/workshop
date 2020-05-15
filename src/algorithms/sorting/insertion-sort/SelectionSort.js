const defaultComparator = (pre, next) => pre - next;

class SelectionSort {
  static exchange(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  static sort(array, compare = defaultComparator) {
    for (let i = 0; i < array.length; i++) {
      let min = i;
      for (let j = i + 1; j < array.length; j++) {
        if (compare(array[j], array[min]) < 0) {
          min = j;
        }
      }
      if (min !== i) {
        this.exchange(array, min, i);
      }
    }
    return array;
  }
}

export default SelectionSort;
