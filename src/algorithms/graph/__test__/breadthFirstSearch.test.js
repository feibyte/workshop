import Edge from '../../../data-structures/graph/Edge';
import Graph from '../../../data-structures/graph/Graph';
import Vertex from '../../../data-structures/graph/Vertex';
import breadthFirstSearch from '../breadthFirstSearch';

describe('breadthFirstSearch', () => {
  it('traverse in certain order', () => {
    const graph = new Graph();
    const r = new Vertex('r');
    const s = new Vertex('s');
    const t = new Vertex('t');
    const u = new Vertex('u');
    const v = new Vertex('v');
    const w = new Vertex('w');
    const x = new Vertex('x');
    const y = new Vertex('y');

    graph.addEdge(new Edge(s, r));
    graph.addEdge(new Edge(r, v));
    graph.addEdge(new Edge(s, w));
    graph.addEdge(new Edge(w, t));
    graph.addEdge(new Edge(w, x));
    graph.addEdge(new Edge(t, x));
    graph.addEdge(new Edge(t, u));
    graph.addEdge(new Edge(x, u));
    graph.addEdge(new Edge(x, y));
    graph.addEdge(new Edge(u, y));
    const vertices = [];
    const callback = (vertex) => vertices.push(vertex);
    breadthFirstSearch(graph, s, callback);

    expect(vertices.map((vertex) => vertex.value)).toEqual([
      's',
      'r',
      'w',
      'v',
      't',
      'x',
      'u',
      'y',
    ]);
  });
});
