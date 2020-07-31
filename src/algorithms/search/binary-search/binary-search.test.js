import {
  binarySearch, leftBound, findMedianSortedArrays, searchInRotated,
} from './serach';

describe('binarySearch', () => {
  it('should return index of target given target exists', () => {
    expect(binarySearch([1, 3, 4, 8], 3)).toEqual(1);
    expect(binarySearch([1, 3, 4, 8], 8)).toEqual(3);
    expect(binarySearch([1, 3, 4, 8], 1)).toEqual(0);
  });

  it('should return -1 given target does not exist', () => {
    expect(binarySearch([1, 3, 4, 8], 9)).toEqual(-1);
    expect(binarySearch([], 9)).toEqual(-1);
  });
});

describe('leftBound', () => {
  it('return index of target given target exists', () => {
    expect(leftBound([1, 3, 4, 8], 3)).toEqual(1);
    expect(leftBound([1, 3, 4, 8], 8)).toEqual(3);
    expect(leftBound([1, 3, 4, 8], 1)).toEqual(0);
  });

  it('return left index given more than one result can be found ', () => {
    expect(leftBound([1, 3, 3, 3, 4, 8], 3)).toEqual(1);
  });

  it('return left index given target does not exist', () => {
    expect(leftBound([1, 3, 4, 8], 5)).toEqual(3);
    expect(leftBound([], 5)).toEqual(0);
  });
});

describe('findMedianSortedArrays', () => {
  it('should return middle', () => {
    // expect(findMedianSortedArrays([1, 3], [2])).toEqual(2);
    expect(findMedianSortedArrays([3], [-2, -1])).toEqual(-1);
  });
});

describe('searchInRotated', () => {
  it('should return middle', () => {
    expect(searchInRotated([4, 5, 6, 7, 0, 1, 2], 0)).toEqual(4);
    expect(searchInRotated([3, 1], 1)).toEqual(1);
    expect(searchInRotated([5, 1, 3], 5)).toEqual(0);
    expect(searchInRotated([5, 1, 3], 3)).toEqual(2);
    expect(searchInRotated([5,1,2,3,4], 1)).toEqual(1);
  });
});
