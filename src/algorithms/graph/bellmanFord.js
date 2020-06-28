
const initializeSingleSource = (graph, startVertex) => {
  graph.getAllVertices().forEach((vertex) => {
    vertex.reset();
  });
  startVertex.d = 0;
};

const relax = (edge) => {
  const { startVertex, endVertex, weight } = edge;
  if (endVertex.d > startVertex.d + weight) {
    endVertex.d = startVertex.d + weight;
    endVertex.predecessor = startVertex;
  }
};

const bellmanFord = (graph, startVertex) => {
  initializeSingleSource(graph, startVertex);

  const V = graph.getAllVertices().length;
  const edges = graph.getAllEdges();
  for (let i = 0; i < V; i++) {
    edges.forEach(relax);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    if (edge.endVertex.d > edge.startVertex.d + edge.weight) {
      return false;
    }
  }

  return true;
};

export default bellmanFord;
