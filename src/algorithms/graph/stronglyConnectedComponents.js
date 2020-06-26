import depthFirstSearch from './depthFirstSearch';

const dfsForTransposedGraph = (graph) => {
  const vertices = graph.getAllVertices().sort((u, v) => v.f - u.f);
  vertices.forEach((vertex) => {
    vertex.resetColor();
  });

  const groups = [];
  let set = [];
  const visit = (u) => {
    u.markGray();
    graph.getAdj(u).forEach((vertex) => {
      if (vertex.isWhite()) {
        visit(vertex);
      }
    });
    set.push(u);
    u.markBlack();
  };
  vertices.forEach((vertex) => {
    if (vertex.isWhite()) {
      set = [];
      visit(vertex);
      groups.push(set);
    }
  });
  return groups;
};

const stronglyConnectedComponents = (graph) => {
  depthFirstSearch(graph);
  graph.reverse();
  return dfsForTransposedGraph(graph);
};

export default stronglyConnectedComponents;
