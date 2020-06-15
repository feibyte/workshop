// 矩阵链乘法问题
// 相似问题： https://leetcode.com/problems/burst-balloons/

const printOptimalParens = (s, i, j) => {
  if (i === j) {
    return `A${i}`;
  }
  return `(${printOptimalParens(s, i, s[i][j])}${printOptimalParens(s, s[i][j] + 1, j)})`;
};


const matrixChainOrder = (nums) => {
  const m = [];
  const s = [];
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    m[i] = [];
    s[i] = [];
    m[i][i] = 0;
  }

  // 斜对角方向遍历
  for (let l = 1; l < n; l++) {
    for (let i = 1; i < n - l; i++) { // [30, 35] 第二个数字才算是第一个矩阵
      const j = i + l;
      m[i][j] = Number.POSITIVE_INFINITY;
      for (let k = i; k < j; k++) {
        const q = m[i][k] + m[k + 1][j] + nums[i - 1] * nums[k] * nums[j];
        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
        }
      }
    }
  }

  return printOptimalParens(s, 1, n - 1);
};

export default matrixChainOrder;
