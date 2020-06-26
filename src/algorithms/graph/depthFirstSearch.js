const noop = () => {};

const depthFirstSearch = (graph, callback = noop) => {
  const vertices = graph.getAllVertices();
  vertices.forEach((vertex) => vertex.reset());

  let time = 0;

  const visit = (u) => {
    time += 1;
    u.d = time;
    u.markGray();
    graph.getAdj(u).forEach((vertex) => {
      if (vertex.isWhite()) {
        visit(vertex);
      }
    });
    callback(u);
    u.markBlack();
    time += 1;
    u.f = time;
  };

  vertices.forEach((vertex) => {
    if (vertex.isWhite()) {
      visit(vertex);
    }
  });
};

export default depthFirstSearch;
