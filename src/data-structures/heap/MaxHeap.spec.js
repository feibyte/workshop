import MaxHeap from './MaxHeap';

describe('main', () => {
  it('should build a max heap when given an unsorted array', () => {
    const maxHeap = new MaxHeap([3, 6, 5, 2, 8]);
    expect(maxHeap.array).toEqual([8, 6, 5, 2, 3]);
  });

  it('should build a max heap when given an last parent has only one child', () => {
    const maxHeap = new MaxHeap([3, 6, 5, 2]);
    expect(maxHeap.array).toEqual([6, 3, 5, 2]);
  });

  it('should build be able to maintain the max heap when adding new num to an valid max heap', () => {
    const maxHeap = new MaxHeap([6, 3, 5, 2]);
    maxHeap.add(10);
    expect(maxHeap.array).toEqual([10, 6, 5, 2, 3]);
    maxHeap.add(12);
    expect(maxHeap.array).toEqual([12, 6, 10, 2, 3, 5]);
  });

  it('should be return max value when call max heap', () => {
    const maxHeap = new MaxHeap([6, 3, 5, 2, 10]);
    expect(maxHeap.extractMax()).toEqual(10);
  });

  it('should be remove the max value after calling extract max', () => {
    const maxHeap = new MaxHeap([6, 3, 5, 2, 10]);
    expect(maxHeap.array.includes(10)).toBe(true);
    expect(maxHeap.extractMax()).toEqual(10);
    expect(maxHeap.array.includes(10)).toBe(false);
  });

  it('should maintain the max heap after calling extract max', () => {
    const maxHeap = new MaxHeap([12, 6, 10, 2, 3, 5]);
    maxHeap.extractMax();
    expect(maxHeap.array).toEqual([10, 6, 5, 2, 3]);
  });

  it('should return sorted array when calling sort', () => {
    const maxHeap = new MaxHeap([12, 6, 10, 2, 3, 5]);
    expect(maxHeap.sort()).toEqual([2, 3, 5, 6, 10, 12]);
  });
});
