import Edge from '../../../data-structures/graph/Edge';
import Graph from '../../../data-structures/graph/Graph';
import Vertex from '../../../data-structures/graph/Vertex';
import depthFirstSearch from '../depthFirstSearch';

describe('depthFirstSearch', () => {
  it('traverse in certain order', () => {
    const graph = new Graph(true);
    const u = new Vertex('u');
    const v = new Vertex('v');
    const w = new Vertex('w');
    const x = new Vertex('x');
    const y = new Vertex('y');
    const z = new Vertex('z');

    graph.addEdge(new Edge(u, v));
    graph.addEdge(new Edge(u, x));
    graph.addEdge(new Edge(x, v));
    graph.addEdge(new Edge(v, y));
    graph.addEdge(new Edge(y, x));
    graph.addEdge(new Edge(w, y));
    graph.addEdge(new Edge(w, z));
    graph.addEdge(new Edge(z, z));
    const vertices = [];
    const callback = (vertex) => vertices.push(vertex);
    depthFirstSearch(graph, callback);

    expect(vertices.map((vertex) => vertex.value)).toEqual(['x', 'y', 'v', 'u', 'z', 'w']);
  });
});
