const cachedTrees = new Map<string, number>();

const numRangeTrees = (start: number, end: number): number => {
  if (start >= end) {
    return 1;
  }

  const cacheKey = `${start}#${end}`;
  const cached = cachedTrees.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  let result = 0;
  for (let i = start; i <= end; i++) {
    const leftTrees = numRangeTrees(start, i - 1);
    const rightTrees = numRangeTrees(i + 1, end);
    result += leftTrees * rightTrees;
  }
  cachedTrees.set(cacheKey, result);
  return result;
};

export function numTrees(n: number): number {
  return numRangeTrees(1, n);
}
