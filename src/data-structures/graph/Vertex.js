class Vertex {
  constructor(value, color = 'white', predecessor = null) {
    this.key = value;
    this.value = value;
    this.color = color;
    this.d = Number.POSITIVE_INFINITY;
    this.predecessor = predecessor;
  }

  reset() {
    this.d = Number.POSITIVE_INFINITY;
    this.color = 'white';
    this.predecessor = null;
  }

  markGray() {
    this.color = 'gray';
  }

  markBlack() {
    this.color = 'black';
  }
}

export default Vertex;
