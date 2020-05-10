import { SHAPES, COL_NUM, ROW_NUM } from './constants.js';
import drawBoard from './board.js';
import drawShapeBox from './shapeBox.js';

const shapeGenerator = () => SHAPES[Math.floor(Math.random() * SHAPES.length)];

const run = () => {
  const shapes = [];
  for (let i = 0; i < ROW_NUM * COL_NUM; i++) {
    shapes.push(shapeGenerator());
  }
  drawBoard(shapes);
  drawShapeBox();
};
run();
