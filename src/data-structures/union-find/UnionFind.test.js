import UnionFind from './UnionFind';

describe('UnionFind', () => {
  it('should return correct sets after calling connected', () => {
    const uf = new UnionFind();
    for (let i = 0; i <= 9; i++) {
      uf.addItem(i);
    }
    uf.union(4, 3);
    uf.union(3, 8);
    uf.union(6, 5);
    uf.union(9, 4);
    uf.union(2, 1);
    uf.union(5, 0);
    uf.union(7, 2);
    uf.union(6, 1);

    expect(uf.count).toEqual(2);
  });
});
