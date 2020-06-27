import Edge from '../../../data-structures/graph/Edge';
import Graph from '../../../data-structures/graph/Graph';
import Vertex from '../../../data-structures/graph/Vertex';
import kruskal from '../kruskal';

export const makeGraph = () => {
  const graph = new Graph();
  const a = new Vertex('a');
  const b = new Vertex('b');
  const c = new Vertex('c');
  const d = new Vertex('d');
  const e = new Vertex('e');
  const f = new Vertex('f');
  const g = new Vertex('g');
  const h = new Vertex('h');
  const i = new Vertex('i');

  graph.addEdge(new Edge(a, b, 4));
  graph.addEdge(new Edge(a, h, 8));
  graph.addEdge(new Edge(b, h, 11));
  graph.addEdge(new Edge(b, c, 8));
  graph.addEdge(new Edge(c, i, 2));
  graph.addEdge(new Edge(c, d, 7));
  graph.addEdge(new Edge(c, f, 4));
  graph.addEdge(new Edge(d, e, 9));
  graph.addEdge(new Edge(d, f, 14));
  graph.addEdge(new Edge(e, f, 10));
  graph.addEdge(new Edge(f, g, 2));
  graph.addEdge(new Edge(g, h, 1));
  graph.addEdge(new Edge(h, i, 7));
  graph.addEdge(new Edge(g, i, 6));

  return graph;
};

describe('kruskal', () => {
  it('should return correct mst', () => {
    const graph = makeGraph();
    const mst = kruskal(graph);
    const mstWeight = mst.reduce((acc, edge) => acc + edge.weight, 0);
    expect(mstWeight).toEqual(37);
  });
});
