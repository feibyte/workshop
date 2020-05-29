// eslint-disable-next-line max-classes-per-file
import QuickSort from '../QuickSort';
import { SortTester } from '../SortTester';

describe('QuickSort', () => {
  class SortWrapper {
    static sort(array, compare) {
      const sorter = new QuickSort(compare);
      return sorter.sort(array);
    }
  }
  it('should sort array', () => {
    SortTester.testSort(SortWrapper);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(SortWrapper);
  });

  xit('should do stable sorting', () => {
    SortTester.testSortStability(SortWrapper);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumbersSort(SortWrapper);
  });

  it('should find nth number', () => {
    const sorter = new QuickSort();
    expect(sorter.findNth([1, 3, 5, 7, 9], 2)).toBe(5);
  });
});

describe('QuickSort in three parts', () => {
  class SortWrapper {
    static sort(array, compare) {
      const sorter = new QuickSort(compare);
      return sorter.sortInThreeParts(array);
    }
  }
  it('should sort array in three parts', () => {
    SortTester.testSort(SortWrapper);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(SortWrapper);
  });
});

describe('QuickSort in hoare way', () => {
  class SortWrapper {
    static sort(array, compare) {
      const sorter = new QuickSort(compare);
      return sorter.hoareSort(array);
    }
  }
  it('should sort array in three parts', () => {
    SortTester.testSort(SortWrapper);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumbersSort(SortWrapper);
  });
});
