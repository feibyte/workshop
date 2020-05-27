import InsertionSort from '../InsertionSort';
import { SortTester } from '../SortTester';

describe('InsertionSort', () => {
  it('should sort array', () => {
    SortTester.testSort(InsertionSort);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(InsertionSort);
  });

  it('should do stable sorting', () => {
    SortTester.testSortStability(InsertionSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumbersSort(InsertionSort);
  });
});
