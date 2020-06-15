import matrixChainOrder from './matrix-chain-order';

describe('Dynamic Programming', () => {
  it('should return matrix chain order', () => {
    expect(matrixChainOrder([30, 35, 15, 5, 10, 20, 25])).toEqual('((A1(A2A3))((A4A5)A6))');
  });
});
