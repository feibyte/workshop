class Graph {
  constructor(isDirected = false) {
    this.vertices = {};
    this.adj = {};
    this.edges = [];
    this.isDirected = isDirected;
  }

  addVertex(vertex) {
    this.vertices[vertex.key] = vertex;
    return this;
  }

  addEdge(edge) {
    const { startVertex, endVertex } = edge;
    if (!this.vertices[startVertex.key]) {
      this.addVertex(startVertex);
    }
    if (!this.vertices[endVertex.key]) {
      this.addVertex(endVertex);
    }
    if (!this.adj[startVertex.key]) {
      this.adj[startVertex.key] = [];
    }
    this.adj[startVertex.key].push(endVertex);
    if (!this.isDirected) {
      if (!this.adj[endVertex.key]) {
        this.adj[endVertex.key] = [];
      }
      this.adj[endVertex.key].push(startVertex);
      const reverseEdge = { ...edge };
      reverseEdge.startVertex = endVertex;
      reverseEdge.endVertex = startVertex;
      this.edges.push(reverseEdge);
    }
    this.edges.push(edge);
    return this;
  }

  getAdj(vertex) {
    return this.adj[vertex.key] || [];
  }

  getEdges(startVertex) {
    // eslint-disable-next-line max-len
    return this.edges.filter((edge) => edge.startVertex === startVertex);
  }

  getEdge(startVertex, endVertex) {
    // eslint-disable-next-line max-len
    return this.edges.find(
      (edge) =>
        edge.startVertex === startVertex && edge.endVertex === endVertex,
    );
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  getAllEdges() {
    return this.edges;
  }

  reverse() {
    const { edges } = this;
    this.edges = [];
    this.adj = {};
    edges.forEach((edge) => {
      edge.reverse();
      this.addEdge(edge);
    });
  }
}

export default Graph;
