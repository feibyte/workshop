import Edge from '../../../data-structures/graph/Edge';
import Graph from '../../../data-structures/graph/Graph';
import Vertex from '../../../data-structures/graph/Vertex';
import stronglyConnectedComponents from '../stronglyConnectedComponents';

describe('stronglyConnectedComponents', () => {
  it('should return several groups', () => {
    const graph = new Graph(true);
    const r = new Vertex('r');
    const s = new Vertex('s');
    const t = new Vertex('t');
    const u = new Vertex('u');
    const v = new Vertex('v');
    const w = new Vertex('w');
    const x = new Vertex('x');
    const y = new Vertex('y');

    graph.addEdge(new Edge(r, s));
    graph.addEdge(new Edge(s, t));
    graph.addEdge(new Edge(s, v));
    graph.addEdge(new Edge(s, w));
    graph.addEdge(new Edge(t, u));
    graph.addEdge(new Edge(t, x));
    graph.addEdge(new Edge(u, t));
    graph.addEdge(new Edge(u, y));
    graph.addEdge(new Edge(v, r));
    graph.addEdge(new Edge(v, w));
    graph.addEdge(new Edge(w, x));
    graph.addEdge(new Edge(x, w));
    graph.addEdge(new Edge(x, y));
    graph.addEdge(new Edge(y, y));

    const mapKey = (vertex) => vertex.key;

    expect(stronglyConnectedComponents(graph).length).toBe(4);
    expect(stronglyConnectedComponents(graph).map((group) => group.map(mapKey))).toEqual([
      ['y'],
      ['x', 'w'],
      ['u', 't'],
      ['v', 's', 'r'],
    ]);
  });
});
