import MergeSort from '../MergeSort';
import { SortTester } from '../../SortTester';

describe('MergeSort', () => {
  class SortWrapper {
    static sort(array, compare) {
      const sorter = new MergeSort(compare);
      return sorter.sort(array);
    }
  }

  it('should merge', () => {
    const sorter = new MergeSort();
    expect(sorter.merge([3, 4, 1, 2], 0, 1, 3)).toEqual([1, 2, 3, 4]);
  });
  it('should sort array', () => {
    SortTester.testSort(SortWrapper);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(SortWrapper);
  });

  it('should do stable sorting', () => {
    SortTester.testSortStability(SortWrapper);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumbersSort(SortWrapper);
  });
});
