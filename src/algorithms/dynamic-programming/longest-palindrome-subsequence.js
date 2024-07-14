// 最长回文子序列： https://leetcode.com/problems/longest-palindromic-subsequence/
// dp[i][i] = 1;
// dp[i][j] = dp[i + 1][j - 1] + 2 // if str[i] = str[j]
// dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

const longestPalindromeSubsequence = (str) => {
  const n = str.length;
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n).fill(0);
    dp[i][i] = 1;
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (str[i] === str[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  const printResultWithDP = (start, end) => {
    if (start === end) {
      return str[start];
    }
    if (start > end) {
      return '';
    }
    if (str[start] === str[end]) {
      return `${str[start]}${printResultWithDP(start + 1, end - 1)}${str[end]}`;
    }
    if (dp[start + 1][end] > dp[start][end - 1]) {
      return printResultWithDP(start + 1, end);
    }
    return printResultWithDP(start, end - 1);
  };

  return printResultWithDP(0, n - 1);
};

export default longestPalindromeSubsequence;
