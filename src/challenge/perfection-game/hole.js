class Hole {
  constructor(shape) {
    this.shape = shape;
    this.rootElement = this.buildShape(shape);
    this.isFilled = false;
    this.onDragover = this.onDragover.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.registerEvent();
    this.listener = null;
  }

  buildShape(shape) {
    const shapeElement = document.createElement('div');
    shapeElement.classList.add('shape');
    shapeElement.classList.add(`shape-${shape.toLowerCase()}`);
    shapeElement.setAttribute('droppable', true);
    shapeElement.dataset.type = shape;

    const rootElement = document.createElement('div');
    rootElement.classList.add('hole');
    rootElement.appendChild(shapeElement);
    return rootElement;
  }

  appendTo(container) {
    container.appendChild(this.rootElement);
  }

  registerEvent() {
    this.rootElement.addEventListener('dragover', this.onDragover);
    this.rootElement.addEventListener('drop', this.onDrop);
  }

  onDragover(event) {
    event.preventDefault();
  }

  onDrop(event) {
    event.preventDefault();
    const draggedShape = event.dataTransfer.getData('shape');
    if (!this.isFilled && draggedShape === this.shape) {
      this.isFilled = true;
      this.rootElement.classList.add('filled');
      if (this.listener) {
        this.listener();
      }
    }
  }

  addFillListener(listener) {
    this.listener = listener;
  }
}

export default Hole;
