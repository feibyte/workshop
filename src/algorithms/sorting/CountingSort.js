class CountingSort {
  static sort(array, k) {
    const counter = new Array(k).fill(0);
    array.forEach((item) => {
      counter[item] += 1;
    });
    for (let i = 1; i < counter.length; i++) {
      counter[i] += counter[i - 1];
    }
    const result = new Array(array.length);
    for (let j = array.length - 1; j >= 0; j--) {
      result[counter[array[j]] - 1] = array[j];
      counter[array[j]] -= 1;
    }
    return result;
  }
}

export default CountingSort;
