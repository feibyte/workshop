class Edge {
  constructor(startVertex, endVertex, weight = 0) {
    this.weight = weight;
    this.startVertex = startVertex;
    this.endVertex = endVertex;
  }
}

export default Edge;
