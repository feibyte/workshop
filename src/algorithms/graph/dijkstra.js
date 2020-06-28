import MinHeap from '../../data-structures/heap/MinHeap';

const relax = (edge) => {
  const { startVertex, endVertex, weight } = edge;
  if (endVertex.d > startVertex.d + weight) {
    endVertex.d = startVertex.d + weight;
    endVertex.predecessor = startVertex;
  }
};

const dijkstra = (graph, source) => {
  const vertices = graph.getAllVertices();
  vertices.forEach((vertex) => {
    vertex.reset();
  });
  source.d = 0;
  const pq = new MinHeap([], (vertexA, vertexB) => vertexA.d - vertexB.d);
  pq.add(source);

  while (!pq.isEmpty()) {
    const v = pq.extractMin();
    v.markBlack();
    graph.getEdges(v).forEach((edge) => {
      const { endVertex } = edge;
      if (endVertex.isBlack()) {
        return;
      }
      relax(edge);
      if (endVertex.isWhite()) {
        endVertex.markGray();
        pq.add(endVertex);
      } else {
        pq.swim(pq.array.indexOf(endVertex));
      }
    });
  }
};

export default dijkstra;
