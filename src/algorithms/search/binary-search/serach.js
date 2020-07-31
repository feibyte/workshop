export const binarySearch = (sortedArray, target) => {
  let start = 0;
  let end = sortedArray.length - 1;
  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    if (sortedArray[middle] > target) {
      end = middle - 1;
    } else if (sortedArray[middle] < target) {
      start = middle + 1;
    } else {
      return middle;
    }
  }
  return -1;
};

// [start, end)
// middle [start, middle) [middle + 1, end)
// if target does not exist, then return the sum of numbers which is smaller than target.
export const leftBound = (sortedArray, target) => {
  let start = 0;
  let end = sortedArray.length;
  while (start < end) {
    const middle = Math.floor((start + end) / 2);
    if (sortedArray[middle] > target) {
      end = middle;
    } else if (sortedArray[middle] < target) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
};

const select = (arr1, arr2, index) => {
  if (arr1.length === 0) {
    return arr2[index];
  }
  if (arr2.length === 0) {
    return arr1[index];
  }

  if (arr2.length > arr1.length) {
    const temp = arr2;
    arr2 = arr1;
    arr1 = temp;
  }

  const middle = Math.floor((arr1.length - 1) / 2);
  const rank = leftBound(arr2, arr1[middle]);
  const size = middle + rank + 1;

  if (index === size - 1) {
    return arr1[middle];
  }
  if (index < size - 1) {
    return select(arr1.slice(0, middle), arr2.slice(0, rank), index);
  }
  return select(arr1.slice(middle + 1), arr2.slice(rank), index - size);
};

export const findMedianSortedArrays = (nums1, nums2) => {
  const floor = Math.floor((nums1.length + nums2.length - 1) / 2);
  const ceil = Math.ceil((nums1.length + nums2.length - 1) / 2);
  if (floor === ceil) {
    return select(nums1, nums2, floor);
  }
  return (select(nums1, nums2, floor) + select(nums1, nums2, ceil)) / 2;
};


export const searchInRotated = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    if (nums[middle] === target) {
      return middle;
    }
    if (nums[left] <= nums[middle]) {
      if (target >= nums[left] && target <= nums[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      // big middle
      if (target >= nums[middle] && target <= nums[right]) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  }
  return -1;
};
