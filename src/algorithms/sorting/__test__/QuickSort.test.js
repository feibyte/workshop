import QuickSort from '../QuickSort';
import { SortTester } from '../../SortTester';

describe('QuickSort', () => {
  it('should sort array', () => {
    SortTester.testSort(QuickSort);
  });

  xit('should do stable sorting', () => {
    SortTester.testSortStability(QuickSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumbersSort(QuickSort);
  });
});
