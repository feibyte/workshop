
import lcs from '../longest-common-subsequence';
import longestInCreasingSubsequence from '../longest-increasing-subsequence';
import longestPalindromeSubsequence from '../longest-palindrome-subsequence';
import matrixChainOrder from '../matrix-chain-order';
import optimalBST from '../optimal-binary-search-tree';
import textJustify from '../text-justification';
import isMatch from '../wildcard-matching';

describe('Dynamic Programming', () => {
  it('should return matrix chain order', () => {
    expect(matrixChainOrder([30, 35, 15, 5, 10, 20, 25])).toEqual('((A1(A2A3))((A4A5)A6))');
    expect(matrixChainOrder([5, 10, 3, 12, 5, 50, 6])).toEqual('((A1A2)((A3A4)(A5A6)))');
  });

  it('should return longest common subsequence', () => {
    expect(lcs('ABCBDAB', 'BDCABA')).toEqual('BCBA');
  });

  it('should return longest increasing subsequence', () => {
    expect(longestInCreasingSubsequence([99, 3, 5, 20, 7, 9, 11])).toEqual([3, 5, 7, 9, 11]);
  });

  it('should return optimal expectation', () => {
    const p = [0, 0.15, 0.1, 0.05, 0.1, 0.2];
    const q = [0.05, 0.1, 0.05, 0.05, 0.05, 0.1];
    expect(optimalBST(p, q)).toEqual(2.75);
  });

  it('optimal bst2', () => {
    const p = [0, 0.04, 0.06, 0.08, 0.02, 0.1, 0.12, 0.14];
    const q = [0.06, 0.06, 0.06, 0.06, 0.05, 0.05, 0.05, 0.05];
    expect(optimalBST(p, q)).toEqual(3.12);
  });

  it('return longest palindrome subsequence', () => {
    expect(longestPalindromeSubsequence('character')).toEqual('carac');
    expect(longestPalindromeSubsequence('civic')).toEqual('civic');
  });

  it('text justification', () => {
    expect(textJustify([
      'This', 'is', 'an', 'example', 'of', 'text', 'justification.',
    ], 16)).toEqual([
      'This    is    an',
      'example  of text',
      'justification.  ',
    ]);
    expect(textJustify([
      'Science', 'is', 'what', 'we', 'understand', 'well', 'enough', 'to', 'explain', 'to', 'a', 'computer.', 'Art', 'is', 'everything', 'else', 'we', 'do',
    ], 20)).toEqual([
      'Science  is  what we',
      'understand      well',
      'enough to explain to',
      'a  computer.  Art is',
      'everything  else  we',
      'do                  ',
    ]);
  });

  it('isMatch', () => {
    expect(isMatch('aa', 'a*')).toEqual(true);
  });

  it('leetcode', () => {
    var maximalRectangle = function(matrix) {
      const m = matrix.length + 1;
      const n = matrix[0] ? matrix[0].length + 1 : 1;
      const dp = [];
      for (let i = 0; i < m; i++) {
        dp[i] = [];
        for (let j = 0; j < n; j++) {
          dp[i][j] = { left: [0, 0], up: [0, 0] };
        }
      }
      let max = 0;

      for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
          if (matrix[i - 1][j - 1] === '1') {
            dp[i][j] = [1, 1];
            const left = [Math.min(dp[i][j - 1][0], dp[i - 1][j][0] + 1), dp[i][j - 1][1] + 1];
            const up = [dp[i - 1][j][0] + 1, Math.min(dp[i - 1][j][1], dp[i][j - 1][1] + 1)];
            if (left[0] * left[1] > dp[i][j][0] * dp[i][j][1]) {
              dp[i][j] = left;
            }
            if (up[0] * up[1] > dp[i][j][0] * dp[i][j][1]) {
              dp[i][j] = up;
            }
            max = Math.max(max, dp[0] * dp[1]);
          }
        }
      }
      console.table(dp);
      return max;
    };

    maximalRectangle([
      ["1","0","1","1","1","0","0","0","1","0"],
      ["0","1","0","0","0","0","0","1","1","0"],
      ["0","1","0","1","0","0","0","0","1","1"],
      ["1","1","1","0","0","0","0","0","1","0"],
      ["0","1","1","1","0","0","1","0","1","0"],
      ["1","1","0","1","1","0","1","1","1","0"]]);
  });
});
