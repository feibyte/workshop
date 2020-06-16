import lcs from '../longest-common-subsequence';
import longestInCreasingSubsequence from '../longest-increasing-subsequence';
import matrixChainOrder from '../matrix-chain-order';

describe('Dynamic Programming', () => {
  it('should return matrix chain order', () => {
    expect(matrixChainOrder([30, 35, 15, 5, 10, 20, 25])).toEqual('((A1(A2A3))((A4A5)A6))');
    expect(matrixChainOrder([5, 10, 3, 12, 5, 50, 6])).toEqual('((A1A2)((A3A4)(A5A6)))');
  });

  it('lcs', () => {
    expect(lcs('ABCBDAB', 'BDCABA')).toEqual('BCBA');
  });

  it('longestInCreasingSubsequence', () => {
    expect(longestInCreasingSubsequence([99, 3, 5, 20, 7, 9, 11])).toEqual([3, 5, 7, 9, 11]);
  });
});
