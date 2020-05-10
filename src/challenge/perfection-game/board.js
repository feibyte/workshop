import Hole from './hole.js';

const boardContainer = document.querySelector('.board-container');

const drawBoard = (shapes) => {
  let fillCount = 0;
  shapes.forEach((shape) => {
    const holeWidget = new Hole(shape);
    holeWidget.addFillListener(() => {
      fillCount++;
      if (fillCount === shapes.length) {
        alert('You win!');
      }
    });
    holeWidget.appendTo(boardContainer);
  });
};

export default drawBoard;
