const lengthOfLongestSubstring = (s) => {
  const map = {};
  let result = 0;
  let k = 0;
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] != undefined) {
      k = Math.max(k, map[s[i]]) + 1;
    }
    const max = i - k + 1;
    result = Math.max(max, result);
    map[s[i]] = i;
  }
  return result;
};

const findMedianSortedArrays = (nums1, nums2) => {
  const nums = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      nums[k++] = nums1[i++];
    } else {
      nums[k++] = nums2[j++];
    }
  }
  while (i < nums1.length) {
    nums[k++] = nums1[i++];
  }
  while (j < nums2.length) {
    nums[k++] = nums2[j++];
  }
  console.log(nums);
  const len = nums.length;
  if (!len) return 0;
  return (nums[Math.floor(len / 2)] + nums[Math.floor((len - 1) / 2)]) / 2;
};

const longestPalindrome = (s) => {
  let result = { l: 0, r: 0 };
  let max = -1;
  for (let i = 0; i < s.length; i++) {
    let l = i;
    let r = i;
    while (s[l] === s[r]) {
      if (r - l > max) {
        max = r - l;
        result = { l, r };
      }
      if (l - 1 < 0 || r + 1 >= s.length) {
        break;
      }
      l--;
      r++;
    }
    l = i;
    r = i + 1;
    while (s[l] === s[r]) {
      if (r - l > max) {
        max = r - l;
        result = { l, r };
      }
      if (l - 1 < 0 || r + 1 >= s.length) {
        break;
      }
      l--;
      r++;
    }
  }
  return s.slice(result.l, result.r + 1);
};
const isMatch2 = (s, p) => {
  if (!p) return !s;
  const isFirstMatch = s && (s[0] === p[0] || p[0] === '.');
  if (p[1] === '*') {
    return isMatch(s, p.slice(2)) || (isFirstMatch && isMatch(s.slice(1), p));
  }
  return isFirstMatch && isMatch(s.slice(1), p.slice(1));
};
var isMatch = (s, p) => {
  const dp = [];
  const _isMatch = (si, pi) => {
    if (dp[si] && dp[si][pi] != undefined) return dp[si][pi];
    dp[si] = dp[si] || [];
    let ans;
    if (pi >= p.length) {
      ans = si >= s.length;
      dp[si][pi] = ans;
      return ans;
    }
    const isFirstMatch = si < s.length && (s[si] === p[pi] || p[pi] === '.');
    if (p[pi + 1] === '*') {
      ans = _isMatch(si, pi + 2) || (isFirstMatch && _isMatch(si + 1, pi));
    } else {
      ans = isFirstMatch && _isMatch(si + 1, pi + 1);
    }
    dp[si][pi] = ans;
    return ans;
  };
  return _isMatch(0, 0);
};

const longestValidParentheses1 = (s) => {
  let max = 0;
  const _longestValidParentheses = (leftNums, si, count) => {
    if (si >= s.length) {
      return;
    }
    if (s[si] == ')') {
      leftNums -= 1;
      if (leftNums == 0) {
        max = Math.max(max, count - leftNums + 1);
      }
    } else if (s[si] == '(') {
      leftNums += 1;
    }

    if (leftNums >= 0) {
      _longestValidParentheses(leftNums, si + 1, count + 1);
    }
    // Restart from next
    _longestValidParentheses(0, si + 1, 0);
  };
  _longestValidParentheses(0, 0, 0);
  return max;
};

const longestValidParentheses = (s) => {
  const num = [];
  let l = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') {
      l++;
    } else if (s[i] == ')') {
      l--;
    }
    num[i] = l;
    l = l < 0 ? 0 : l;
  }
  const continiousPositiveNum = [];
  let combo = 0;
  for (let i = 0; i < num.length; i++) {
    if (num[i] >= 0) {
      combo++;
    } else {
      combo = 0;
    }
    if (num[i] >= 0) {
      continiousPositiveNum[i] = combo - num[i];
    } else {
      continiousPositiveNum[i] = 0;
    }
  }
  console.log(num);
  console.log(continiousPositiveNum);

  return Math.max(...continiousPositiveNum);
};

const findTargetSumWays = (nums, S) => {
  let count = 0;
  const _findTargetSumWays = (index, sum) => {
    if (index >= nums.length) {
      if (sum == 0) {
        count++;
      }
      return;
    }
    _findTargetSumWays(index + 1, sum + nums[index]);
    _findTargetSumWays(index + 1, sum - nums[index]);
  };

  _findTargetSumWays(0, S);
  return count;
};

const canPartition = (nums) => {
  const sum = nums.reduce((acc, num) => acc + num);
  const isOdd = sum % 2;
  if (isOdd) {
    return false;
  }
  const targetSum = sum / 2;
  const memo = [];
  const findTragetSum = (index, target) => {
    if (memo[index] && memo[index][target]) {
      return memo[index][target];
    }
    let found = false;
    if (target == 0) {
      found = true;
    } else if (target < 0 || index >= nums.length) {
      found = false;
    } else {
      found =
        findTragetSum(index + 1, target - nums[index]) ||
        findTragetSum(index + 1, target);
    }
    memo[index] = memo[index] || {};
    memo[index][target] = found;
    return found;
  };
  return findTragetSum(0, targetSum);
};

const coinChange = (coins, amount2) => {
  const sortedCoins = coins.sort((a, b) => b - a);
  const memo = {};
  const dfs = (amount) => {
    if (amount == 0) {
      return 0;
    }
    if (amount < 0) {
      return -1;
    }
    // if (memo[amount] != undefined) {
    //   return memo[amount];
    // }
    let result = Number.POSITIVE_INFINITY;
    for (let i = 0; i < sortedCoins.length; i++) {
      const subResult = dfs(amount - sortedCoins[i]);
      if (subResult != -1) {
        result = Math.min(result, subResult + 1);
      }
    }
    if (result > amount2) {
      result = -1;
    }
    // memo[amount] = result;
    return result;
  };
  return dfs(amount2);
};

const splitNumsByZero = (nums) => {
  const result = [];
  let k = 0;
  result[k] = [];
  let i = 0;
  while (i < nums.length) {
    if (nums[i] == 0) {
      k++;
      result[k] = [];
      i++;
      continue;
    }
    result[k].push(nums[i]);
    i++;
  }
  return result.filter((arr) => arr.length > 0);
};

const findLastIndex = (nums, callback) => {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (callback(nums[i], i)) {
      return i;
    }
  }
  return -1;
};

const isNegtive = (num) => num < 0;

const product = (nums) => nums.reduce((acc, num) => acc * num, 1);

const hasZero = (nums) => nums.find((num) => num == 0);

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = (nums) => {
  const numsWithoutZero = splitNumsByZero(nums);
  console.log(numsWithoutZero);
  const calcMaxProduct = (nonZeroNums) => {
    if (nonZeroNums.length == 0) {
      return 1;
    }
    const negNums = nonZeroNums.filter(isNegtive).length;
    if (negNums % 2 == 0) {
      // even
      return product(nonZeroNums);
    }
    const firstNegIndex = nonZeroNums.findIndex(isNegtive);
    const numsAfterFirstNegtive = nonZeroNums.slice(firstNegIndex + 1);
    const productAfterFirstNegtive = numsAfterFirstNegtive.length
      ? product(numsAfterFirstNegtive)
      : nonZeroNums[firstNegIndex];

    const lastNegIndex = findLastIndex(nonZeroNums, isNegtive);
    const numsBeforeLastNeg = nonZeroNums.slice(0, lastNegIndex);
    const productBeforeLastNegtive = numsBeforeLastNeg.length
      ? product(numsBeforeLastNeg)
      : nonZeroNums[lastNegIndex];

    return Math.max(productAfterFirstNegtive, productBeforeLastNegtive);
  };
  const maxProductsGroup = numsWithoutZero.map((nums) => calcMaxProduct(nums));
  let result = Math.max(...maxProductsGroup);
  if (hasZero(nums)) {
    result = Math.max(result, 0);
  }
  return result;
};

const dailyTemperatures = (T) => {
  const result = [];
  const stack = [];
  for (let i = T.length - 1; i >= 0; i--) {
    while (stack.length != 0 && T[stack[stack.length - 1]] <= T[i]) {
      stack.pop();
    }
    result[i] = 0;
    if (stack.length != 0) {
      result[i] = stack[stack.length - 1] - i;
    }
    console.log(stack);
    stack.push(i);
  }
  return result;
};
