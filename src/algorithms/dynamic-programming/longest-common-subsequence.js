
const printLCS = (s, X, i, j) => {
  if (i === 0 || j === 0) {
    return '';
  }
  if (s[i][j] === 'LeftUp') {
    return `${printLCS(s, X, i - 1, j - 1)}${X[i - 1]}`;
  }
  if (s[i][j] === 'Up') {
    return `${printLCS(s, X, i - 1, j)}`;
  }
  return `${printLCS(s, X, i, j - 1)}`;
};

// 递归求解公式
// dp[i][j] = 0 if i == 0 || j === 0
// dp[i][j] = dp[i - 1][j - 1] if X[i] === Y[j]
// dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) if  X[i] !== Y[j]

const lcs = (X, Y) => {
  const m = X.length;
  const n = Y.length;
  const dp = [];
  const s = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    s[i] = [];
    dp[i][0] = 0;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = 0;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (X[i - 1] === Y[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        s[i][j] = 'LeftUp';
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        dp[i][j] = dp[i - 1][j];
        s[i][j] = 'Up';
      } else {
        dp[i][j] = dp[i][j - 1];
        s[i][j] = 'Left';
      }
    }
  }

  return printLCS(s, X, m, n);
};

export default lcs;
