import Edge from '../../../data-structures/graph/Edge';
import Graph from '../../../data-structures/graph/Graph';
import Vertex from '../../../data-structures/graph/Vertex';
import topologicalSorting from '../topologicalSorting';

describe('topologicalSorting', () => {
  it('should return correct order', () => {
    const graph = new Graph(true);
    const m = new Vertex('m');
    const n = new Vertex('n');
    const o = new Vertex('o');
    const p = new Vertex('p');
    const q = new Vertex('q');
    const r = new Vertex('r');
    const s = new Vertex('s');
    const t = new Vertex('t');
    const u = new Vertex('u');
    const v = new Vertex('v');
    const w = new Vertex('w');
    const x = new Vertex('x');
    const y = new Vertex('y');
    const z = new Vertex('z');


    graph.addEdge(new Edge(m, q));
    graph.addEdge(new Edge(m, r));
    graph.addEdge(new Edge(m, x));
    graph.addEdge(new Edge(n, q));
    graph.addEdge(new Edge(n, o));
    graph.addEdge(new Edge(n, u));
    graph.addEdge(new Edge(o, r));
    graph.addEdge(new Edge(o, s));
    graph.addEdge(new Edge(o, v));
    graph.addEdge(new Edge(p, s));
    graph.addEdge(new Edge(p, z));
    graph.addEdge(new Edge(q, t));
    graph.addEdge(new Edge(r, u));
    graph.addEdge(new Edge(r, y));
    graph.addEdge(new Edge(s, r));
    graph.addEdge(new Edge(v, w));
    graph.addEdge(new Edge(w, z));
    graph.addEdge(new Edge(y, v));


    expect(topologicalSorting(graph).map((vertex) => vertex.value)).toEqual(['p', 'n', 'o', 's', 'm', 'x', 'r', 'y', 'v', 'w', 'z', 'u', 'q', 't']);
  });
});
