import lcs from '../longest-common-subsequence';
import longestInCreasingSubsequence from '../longest-increasing-subsequence';
import matrixChainOrder from '../matrix-chain-order';
import optimalBST from '../optimal-binary-search-tree';

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
});
