// 最长递增子串
// https://leetcode.com/problems/longest-increasing-subsequence/submissions/
// 分析：
// 从右向左扫描的话：lengthOfLIS(i) = max(右侧比i 位置数大的最长递增序列)
// dp[i] = max(dp[k] + 1) 其中 k 为 i+1…n 同时 num[i] 必须小于 num[k]

const longestInCreasingSubsequence = (nums) => {
  const dp = Array(nums.length).fill(1);
  const s = [];
  let maxIndex = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    s[i] = i;
    for (let k = i + 1; k < nums.length; k++) {
      if (nums[i] < nums[k]) {
        if (dp[i] < dp[k] + 1) {
          dp[i] = dp[k] + 1;
          s[i] = k;
        }
      }
    }
    if (dp[i] > dp[maxIndex]) {
      maxIndex = i;
    }
  }

  const result = [];
  let i = maxIndex;
  while (i !== s[i]) {
    result.push(nums[i]);
    i = s[i];
  }
  return result;
};

export default longestInCreasingSubsequence;
