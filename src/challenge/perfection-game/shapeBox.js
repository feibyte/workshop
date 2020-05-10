import { SHAPES } from './constants.js';

const shapeBox = document.querySelector('.shape-box');

const drawShapeBox = () => {
  SHAPES.forEach((shape) => {
    const shapeElement = document.createElement('div');
    shapeElement.classList.add('shape');
    shapeElement.classList.add(`shape-${shape.toLowerCase()}`);
    shapeElement.setAttribute('draggable', true);
    shapeElement.dataset.type = shape;
    shapeElement.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('shape', shape);
    });
    shapeBox.appendChild(shapeElement);
  });
};

export default drawShapeBox;
