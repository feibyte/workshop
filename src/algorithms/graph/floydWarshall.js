const floydWarshall = (adjMatrix) => {
  const n = adjMatrix.length;
  const D0 = []; // 前驱矩阵
  for (let i = 0; i < n; i++) {
    D0[i] = [];
    for (let j = 0; j < n; j++) {
      if (i !== j && adjMatrix[i][j] < Number.POSITIVE_INFINITY) {
        D0[i][j] = i;
      } else {
        D0[i][j] = null;
      }
    }
  }
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (adjMatrix[i][j] > adjMatrix[i][k] + adjMatrix[k][j]) {
          adjMatrix[i][j] = adjMatrix[i][k] + adjMatrix[k][j];
          D0[i][j] = D0[k][j];
        }
        adjMatrix[i][j] = Math.min(
          adjMatrix[i][j],
          adjMatrix[i][k] + adjMatrix[k][j],
        );
      }
    }
  }
  return D0;
};

export default floydWarshall;
