
// 文本对齐 https://leetcode.com/problems/text-justification/

const nSpaces = (n) => ' '.repeat(n);
const distributeWords = (words, maxWidth, isLast) => {
  const spaces = maxWidth - words.reduce((acc, word) => acc + word.length, 0);
  if (words.length === 1) {
    return `${words}${nSpaces(spaces)}`;
  }
  if (isLast) {
    return (words.join(' ') + nSpaces(maxWidth)).slice(0, maxWidth);
  }
  const floorSpaces = Math.floor(spaces / (words.length - 1));
  const ceilSpacesNum = spaces - floorSpaces * (words.length - 1);
  const leftWords = words.slice(0, ceilSpacesNum + 1).join(nSpaces(floorSpaces + 1));
  const newWords = ceilSpacesNum ? [leftWords].concat(words.slice(ceilSpacesNum + 1)) : words;
  return newWords.join(nSpaces(floorSpaces));
};
// dp[n] = 0;
// dp[n - 1] = space(n-1, n);
// dp[i] = min(dp[i + k] + spaces(i,k));
const textJustify = (words, maxWidth) => {
  const dp = [];
  const choices = [];
  const n = words.length;
  dp[n] = 0;

  const chars = (i, j) => {
    let count = 0;
    while (i < j) {
      count += words[i].length + 1;
      i++;
    }
    return count - 1;
  };
  for (let i = n - 1; i >= 0; i--) {
    dp[i] = Number.POSITIVE_INFINITY;
    for (let j = i + 1; j <= n; j++) {
      const spaces = maxWidth - chars(i, j);
      if (maxWidth - chars(i, j) < 0) {
        break;
      }
      const q = dp[j] + spaces;
      if (q <= dp[i]) {
        dp[i] = q;
        choices[i] = j;
      }
    }
  }

  let start = 0;
  let end = choices[0];
  const result = [];
  while (end <= n) {
    result.push(distributeWords(words.slice(start, end), maxWidth, end === n));
    start = end;
    end = choices[end];
  }

  return result;
};

export default textJustify;
