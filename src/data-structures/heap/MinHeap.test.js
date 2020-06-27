import MinHeap from './MinHeap';

describe('MinHeap', () => {
  it('should be remove the min value after calling extract min', () => {
    const maxHeap = new MinHeap([6, 3, 5, 2, 10]);
    expect(maxHeap.array.includes(2)).toBe(true);
    expect(maxHeap.extractMin()).toEqual(2);
    expect(maxHeap.array.includes(2)).toBe(false);
  });

  it('should work on type ', () => {
    const minHeap = new MinHeap([], (a, b) => a.weight - b.weight);
    minHeap.add({ weight: 4 });
    minHeap.add({ weight: 8 });
    expect(minHeap.extractMin()).toEqual({ weight: 4 });
  });
});
