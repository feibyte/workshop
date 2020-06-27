import prim from '../prim';
import { makeGraph } from './kruskal.test';

describe('prim', () => {
  it('should return correct mst', () => {
    const graph = makeGraph();
    const mst = prim(graph);
    const mstWeight = mst.reduce((acc, edge) => acc + edge.weight, 0);
    expect(mstWeight).toEqual(37);
  });
});
