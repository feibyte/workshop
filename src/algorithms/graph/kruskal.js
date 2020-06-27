import UnionFind from '../../data-structures/union-find/UnionFind';

const kruskal = (graph) => {
  const edges = graph.getAllEdges();
  edges.sort((u, v) => u.weight - v.weight);

  const uf = new UnionFind();
  const mst = [];
  edges.forEach((edge) => {
    const { startVertex, endVertex } = edge;
    const u = startVertex.key;
    const v = endVertex.key;
    uf.addItem(u);
    uf.addItem(v);

    if (!uf.connected(u, v)) {
      uf.union(u, v);
      mst.push(edge);
    }
  });
  return mst;
};

export default kruskal;
