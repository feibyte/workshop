// Regular Expression Matching 正则匹配

// 1. 定义子问题 s[i:] p[j:]
// 2. 列出选择
//     s[i+1:] p[j+1:]   when s[i] === p[j] || p[j] === '.'
//     s[i+1:] p[j:] when s[i] === p[j] && p[j+1] === '*'
//     s[i:] p[j+1:] when s[i] === p[j] && p[j+1] === '*'
// 3. 递归
//     dp[i][j] ||= dp[i + 1][j + 1]
const isMatch = (s, p) => {
  const m = s.length;
  const n = p.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    dp[i][n] = false;
  }
  dp[m][n] = true;

  for (let i = m; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = false;
      const isFirstMatch = i !== m && (p[j] === '.' || p[j] === s[i]);
      if (isFirstMatch) {
        dp[i][j] = dp[i][j] || dp[i + 1][j + 1];
      }
      if (p[j + 1] === '*') {
        if (isFirstMatch) {
          dp[i][j] = dp[i][j] || dp[i + 1][j];
        }
        dp[i][j] = dp[i][j] || dp[i][j + 2];
      }
    }
  }
  return dp[0][0];
};

export default isMatch;
