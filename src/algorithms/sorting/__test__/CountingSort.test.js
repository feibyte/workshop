import CountingSort from '../CountingSort';

describe('CountingSort', () => {
  it('should split three parts', () => {
    const arr = [2, 3, 4, 2, 1, 0, 0, 4, 3, 4, 2];
    const sorted = CountingSort.sort(arr, 5);
    expect(sorted).toEqual([0, 0, 1, 2, 2, 2, 3, 3, 4, 4, 4]);
  });
});
