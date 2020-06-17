
// 编辑距离 https://leetcode.com/problems/edit-distance/
// dp[i][0] = i;
// dp[0][j] = j;
// dp[i][j] = dp[i - 1][j - 1] if word1[i] === word[j];
// dp[i][j] = min(dp[i - 1, j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;

const editDistance = (word1, word2) => {
  const m = word1.length;
  const n = word2.length;
  const dp = [];
  const choice = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    choice[i] = [];
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        choice[i][j] = 'Keep';
      } else {
        // dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        dp[i][j] = Number.POSITIVE_INFINITY;
        if (dp[i][j] > dp[i - 1][j - 1] + 1) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          choice[i][j] = 'Replace';
        }
        if (dp[i][j] > dp[i - 1][j] + 1) {
          dp[i][j] = dp[i - 1][j] + 1;
          choice[i][j] = 'Delete';
        }
        if (dp[i][j] > dp[i][j - 1] + 1) {
          dp[i][j] = dp[i][j - 1] + 1;
          choice[i][j] = 'Insert';
        }
      }
    }
  }

  const printChoice = (i, j) => {
    if (j === 0) {
      return `Delete ${word1.slice(0, i)}`;
    }
    if (i === 0) {
      return `Insert ${word2.slice(0, j)}`;
    }
    if (choice[i][j] === 'Delete') {
      return `${printChoice(i - 1, j)} \n ${choice[i - 1][j]} ${word1[i - 1]}`;
    }
    if (choice[i][j] === 'Insert') {
      return `${printChoice(i, j - 1)} \n ${choice[i][j]} ${word2[j - 1]}`;
    }
    if (choice[i][j] === 'Replace') {
      return `${printChoice(i - 1, j - 1)} \n ${choice[i][j]} ${word1[i - 1]} with ${word2[j - 1]}`;
    }
    return `${printChoice(i - 1, j - 1)} \n ${choice[i][j]} ${word2[j - 1]}`;
  };
  console.log(printChoice(m, n));
};

export default editDistance;
