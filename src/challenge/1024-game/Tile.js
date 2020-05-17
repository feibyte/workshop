
const STEP = 116;

class Tile {
  constructor(element, number, x, y) {
    this.number = number;
    this.element = element;
    this.init();
    this.updatePosition(x, y);
  }

  init() {
    this.element.classList.add('tile');
    const inner = document.createElement('div');
    inner.classList.add('tile-inner');
    this.element.appendChild(inner);
    this.inner = inner;
    this.renderNumber();
  }

  renderNumber() {
    this.element.classList.add(`tile-${this.number}`);
    this.inner.innerText = this.number;
  }

  updatePosition(i, j) {
    this.x = i;
    this.y = j;
    this.element.dataset.i = i;
    this.element.dataset.j = j;
    this.element.style.transform = `translate(${j * STEP}px, ${i * STEP}px)`;
  }

  updateI(x) {
    this.updatePosition(x, this.y);
  }

  updateJ(y) {
    this.updatePosition(this.x, y);
  }

  merged() {
    this.element.classList.add('tile-merged');
  }

  markNew() {
    this.element.classList.add('tile-new');
  }

  clear() {
    this.element.classList.add('hidden');
  }
}

export default Tile;
