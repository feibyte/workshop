class Edge {
  constructor(startVertex, endVertex, weight = 0) {
    this.weight = weight;
    this.startVertex = startVertex;
    this.endVertex = endVertex;
  }

  reverse() {
    const temp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = temp;
  }
}

export default Edge;
