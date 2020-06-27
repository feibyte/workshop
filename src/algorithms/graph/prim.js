import MinHeap from '../../data-structures/heap/MinHeap';

const prim = (graph) => {
  const vertices = graph.getAllVertices();
  vertices.forEach((vertex) => {
    vertex.dist = Number.POSITIVE_INFINITY;
  });
  vertices[0].dist = 0;
  const pq = new MinHeap([], (vertexA, vertexB) => vertexA.dist - vertexB.dist);
  pq.add(vertices[0]);

  while (!pq.isEmpty()) {
    const v = pq.extractMin();
    v.markBlack();
    graph.getEdges(v).forEach((edge) => {
      const { endVertex } = edge;
      if (endVertex.isBlack()) {
        return;
      }
      if (edge.weight < endVertex.dist) {
        endVertex.dist = edge.weight;
        endVertex.predecessor = v;
        if (endVertex.isWhite()) {
          endVertex.markGray();
          pq.add(endVertex);
        } else {
          pq.swim(pq.array.indexOf(endVertex));
        }
      }
    });
  }

  const mst = [];
  vertices.forEach((vertex) => {
    if (vertex.predecessor) {
      const edge = graph.getEdge(vertex.predecessor, vertex);
      if (edge) {
        mst.push(edge);
      }
    }
  });
  return mst;
};

export default prim;
