import SelectionSort from '../SelectionSort';
import { SortTester } from '../SortTester';

describe('SelectionSort', () => {
  it('should sort array', () => {
    SortTester.testSort(SelectionSort);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(SelectionSort);
  });

  xit('should do stable sorting', () => {
    SortTester.testSortStability(SelectionSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumbersSort(SelectionSort);
  });
});
