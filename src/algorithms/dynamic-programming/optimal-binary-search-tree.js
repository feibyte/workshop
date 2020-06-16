
const printBST = (root, i, j, parent) => {
  if (i > j) {
    return;
  }
  if (parent === undefined) {
    console.log(`K${root[i][j]} is the root`);
  } else if (j < parent) {
    console.log(`K${root[i][j]} is the left child of K${parent}`);
  } else {
    console.log(`K${root[i][j]} is the right child of K${parent}`);
  }
  printBST(root, i, root[i][j] - 1, root[i][j]);
  printBST(root, root[i][j] + 1, j, root[i][j]);
};
// dp[i][i - 1] = q[i - 1]
// dp[i][j] = min(dp[i][k - 1] + dp[k + 1][j] + w(i, j))
const optimalBST = (p, q) => {
  const n = q.length;
  const dp = [[]];
  const root = [[]];
  const w = [[]];
  for (let i = 1; i <= n; i++) {
    dp[i] = [];
    dp[i][i - 1] = q[i - 1];
    w[i] = [];
    w[i][i - 1] = q[i - 1];
    root[i] = [];
  }

  for (let l = 0; l < n; l++) {
    for (let i = 1; i < n - l; i++) {
      const j = i + l;
      dp[i][j] = Number.POSITIVE_INFINITY;
      w[i][j] = w[i][j - 1] + p[j] + q[j];
      for (let k = i; k <= j; k++) {
        const temp = dp[i][k - 1] + dp[k + 1][j] + w[i][j];
        if (temp < dp[i][j]) {
          dp[i][j] = temp;
          root[i][j] = k;
        }
      }
    }
  }
  // printBST(root, 1, n - 1);
  return dp[1][n - 1];
};

export default optimalBST;
