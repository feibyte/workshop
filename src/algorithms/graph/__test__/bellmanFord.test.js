import Edge from '../../../data-structures/graph/Edge';
import Graph from '../../../data-structures/graph/Graph';
import Vertex from '../../../data-structures/graph/Vertex';
import bellmanFord from '../bellmanFord';

describe('bellmanFord', () => {
  it('should find minimum paths to all vertices for undirected graph', () => {
    const vertexA = new Vertex('A');
    const vertexB = new Vertex('B');
    const vertexC = new Vertex('C');
    const vertexD = new Vertex('D');
    const vertexE = new Vertex('E');
    const vertexF = new Vertex('F');
    const vertexG = new Vertex('G');
    const vertexH = new Vertex('H');

    const edgeAB = new Edge(vertexA, vertexB, 4);
    const edgeAE = new Edge(vertexA, vertexE, 7);
    const edgeAC = new Edge(vertexA, vertexC, 3);
    const edgeBC = new Edge(vertexB, vertexC, 6);
    const edgeBD = new Edge(vertexB, vertexD, 5);
    const edgeEC = new Edge(vertexE, vertexC, 8);
    const edgeED = new Edge(vertexE, vertexD, 2);
    const edgeDC = new Edge(vertexD, vertexC, 11);
    const edgeDG = new Edge(vertexD, vertexG, 10);
    const edgeDF = new Edge(vertexD, vertexF, 2);
    const edgeFG = new Edge(vertexF, vertexG, 3);
    const edgeEG = new Edge(vertexE, vertexG, 5);

    const graph = new Graph();
    graph
      .addVertex(vertexH)
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeEC)
      .addEdge(edgeED)
      .addEdge(edgeDC)
      .addEdge(edgeDG)
      .addEdge(edgeDF)
      .addEdge(edgeFG)
      .addEdge(edgeEG);

    const result = bellmanFord(graph, vertexA);
    const distances = graph.getAllVertices().reduce((acc, vertex) => ({
      ...acc,
      [vertex.key]: vertex.d,
    }), {});
    expect(result).toBe(true);
    expect(distances).toEqual({
      H: Infinity,
      A: 0,
      B: 4,
      E: 7,
      C: 3,
      D: 9,
      G: 12,
      F: 11,
    });
  });
});
