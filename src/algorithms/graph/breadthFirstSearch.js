const noop = () => {};

const breadthFirstSearch = (graph, startVertex, callback = noop) => {
  const vertices = graph.getAllVertices();
  vertices.forEach((vertex) => {
    vertex.color = 'white';
    vertex.d = Number.POSITIVE_INFINITY;
    vertex.predecessor = null;
  });

  startVertex.color = 'gray';
  startVertex.d = 0;
  startVertex.predecessor = null;

  const queue = [];
  queue.push(startVertex);
  while (queue.length) {
    const u = queue.shift();
    graph.getAdj(u).forEach((vertex) => {
      if (vertex.color === 'white') {
        vertex.markGray();
        vertex.predecessor = u;
        vertex.d = u.d + 1;
        queue.push(vertex);
      }
    });
    callback(u);
    u.markBlack();
  }
};

export default breadthFirstSearch;
