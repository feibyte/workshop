class Graph {
  constructor(isDirected = false) {
    this.vertices = {};
    this.adj = {};
    this.edges = [];
    this.isDirected = isDirected;
  }

  addVertex(vertex) {
    this.vertices[vertex.key] = vertex;
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
    }
    this.edges.push(edge);
  }

  getAdj(vertex) {
    return this.adj[vertex.key] || [];
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
