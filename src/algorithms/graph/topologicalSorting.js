import depthFirstSearch from './depthFirstSearch';

const topologicalSorting = (graph) => {
  const list = [];
  depthFirstSearch(graph, (vertex) => {
    list.unshift(vertex);
  });
  return list;
};

export default topologicalSorting;
