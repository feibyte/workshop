import floydWarshall from '../floydWarshall';

describe('floydWarshall', () => {
  const graph = [
    [0, 3, 8, Number.POSITIVE_INFINITY, -4],
    [Number.POSITIVE_INFINITY, 0, Number.POSITIVE_INFINITY, 1, 7],
    [Number.POSITIVE_INFINITY, 4, 0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    [2, Number.POSITIVE_INFINITY, -5, 0, Number.POSITIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 6, 0],
  ];
  it('should return correct matrix of weights', () => {
    floydWarshall(graph);
    expect(graph).toEqual([
      [0, 1, -3, 2, -4],
      [3, 0, -4, 1, -1],
      [7, 4, 0, 5, 3],
      [2, -1, -5, 0, -2],
      [8, 5, 1, 6, 0],
    ]);
  });

  it('should return correct predecessor matrix', () => {
    const d = floydWarshall(graph);
    expect(d).toEqual([
      [null, 2, 3, 4, 0],
      [3, null, 3, 1, 0],
      [3, 2, null, 1, 0],
      [3, 2, 3, null, 0],
      [3, 2, 3, 4, null],
    ]);
  });
});
