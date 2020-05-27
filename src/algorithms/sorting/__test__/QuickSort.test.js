import QuickSort from '../QuickSort';
import { SortTester } from '../SortTester';

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

  it('should split three parts', () => {
    const arr = [2, 3, 4, 2, 1, 0, 0, 4, 3, 4, 2];
    const [q, t] = QuickSort.partitionWithSameElements(arr, 0, arr.length - 1);
    expect(q).toBe(3);
    expect(t).toBe(5);
  });
});
