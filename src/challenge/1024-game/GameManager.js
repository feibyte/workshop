import Tile from './Tile.js';

const Direction = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

const Directions = {
  Left: 'Left',
  Right: 'Right',
  Up: 'Up',
  Down: 'Down',
};

const SIZE = 4;

const isSameTiles = (tiles1, tiles2) => {
  for (let i = 0; i < SIZE; i++) {
    if ((tiles1[i] || tiles1[i]) && tiles1[i] !== tiles2[i]) {
      return false;
    }
  }
  return true;
};

const reverseTiles = (tiles) => (new Array(SIZE)
  .fill(undefined)
  .concat(tiles.reverse()))
  .slice(-SIZE);

class GameManager {
  constructor() {
    this.container = document.querySelector('.tile-container');
    this.messageContainer = document.querySelector('.game-message');
    this.tiles = [[], [], [], []];
    this.usedTiles = [];
    this.processLeftAndRight = this.processMove(Direction.horizontal);
    this.processUpAndDown = this.processMove(Direction.vertical);
    this.addEventListener();
  }

  start() {
    this.tiles = [[], [], [], []];
    this.usedTiles = [];
    const { container } = this;
    while (container.firstChild) {
      container.firstChild.remove();
    }
    this.messageContainer.style.display = 'none';
    this.generateNewTile();
    this.generateNewTile();
  }

  addEventListener() {
    document.body.addEventListener('keydown', (event) => {
      if (event.keyCode === 37) {
        this.moveLeft();
      } else if (event.keyCode === 38) {
        this.moveUp();
      } else if (event.keyCode === 39) {
        this.moveRight();
      } else if (event.keyCode === 40) {
        this.moveDown();
      }
    });
    document.querySelector('.retry-button').addEventListener('click', () => {
      this.start();
    });
  }

  recycleUsedTile() {
    requestAnimationFrame(() => {
      this.usedTiles.forEach((tile) => {
        this.container.removeChild(tile.element);
      });
      this.usedTiles = [];
    });
    this.checkValidate();
  }

  // Used for debugger;
  // Check if tiles are in correct position.
  checkValidate() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.tiles[i][j] && (this.tiles[i][j].x !== i || this.tiles[i][j].y !== j)) {
          console.warn(this.tiles[i][j]);
        }
      }
    }
  }

  processMove(direction) {
    const isHorizontal = direction === Direction.horizontal;
    const updatePos = (tile, pos) => {
      if (isHorizontal) {
        tile.updateJ(pos);
      } else {
        tile.updateI(pos);
      }
    };
    const reverse = isHorizontal ? (arr) => arr : (arr) => arr.reverse();

    // A list tiles, merge it with next if their numbers are same.
    return (buffer, isReverse, x) => {
      const result = [];
      for (let i = 0; i < buffer.length; i++) {
        const k = isReverse ? 3 - result.length : result.length;
        if (buffer[i + 1] && buffer[i].number === buffer[i + 1].number) {
          updatePos(buffer[i], k);
          updatePos(buffer[i + 1], k);
          this.usedTiles.push(buffer[i]);
          this.usedTiles.push(buffer[i + 1]);
          const merged = this.createNewTile(buffer[i].number * 2, reverse([x, k]));
          merged.merged();
          result.push(merged);
          i++;
        } else {
          result.push(buffer[i]);
          updatePos(buffer[i], k);
        }
      }
      return isReverse ? reverseTiles(result) : result;
    };
  }

  moveLeftAndRight(direction) {
    this.recycleUsedTile();
    const isRight = direction === Directions.Right;
    let moved = false;
    for (let i = 0; i < SIZE; i++) {
      const buffer = this.tiles[i].filter(Boolean);
      if (isRight) {
        buffer.reverse();
      }
      const nextTiles = this.processLeftAndRight(buffer, isRight, i);
      moved = moved || !isSameTiles(this.tiles[i], nextTiles);
      this.tiles[i] = nextTiles;
    }
    if (moved) {
      this.generateNewTile();
    }
  }

  moveLeft() {
    this.moveLeftAndRight(Directions.Left);
  }

  moveRight() {
    this.moveLeftAndRight(Directions.Right);
  }

  traverseCol(colNo, callback) {
    for (let i = 0; i < SIZE; i++) {
      callback(this.tiles[i][colNo], i);
    }
  }

  moveUpAndDown(direction) {
    this.recycleUsedTile();
    const isDown = direction === Directions.Down;
    let moved = false;
    for (let j = 0; j < SIZE; j++) {
      const colTiles = [];
      // eslint-disable-next-line no-return-assign
      this.traverseCol(j, (tile, i) => colTiles[i] = tile);
      const buffer = colTiles.filter(Boolean);
      if (isDown) {
        buffer.reverse();
      }
      const nextTiles = this.processUpAndDown(buffer, isDown, j);
      moved = moved || !isSameTiles(colTiles, nextTiles);
      for (let i = 0; i < SIZE; i++) {
        this.tiles[i][j] = nextTiles[i];
      }
    }
    if (moved) {
      this.generateNewTile();
    }
  }

  moveUp() {
    this.moveUpAndDown(Directions.Up);
  }

  moveDown() {
    this.moveUpAndDown(Directions.Down);
  }

  checkGameCanMove() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.tiles[i][j + 1] && this.tiles[i][j].number === this.tiles[i][j + 1].number) {
          return true;
        }
        if (this.tiles[i + 1] && this.tiles[i + 1][j]
          && this.tiles[i][j].number === this.tiles[i + 1][j].number) {
          return true;
        }
      }
    }
    return false;
  }

  traverseTiles(callback) {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        callback(this.tiles[i][j], i, j);
      }
    }
  }

  pickRandomEmptyTile() {
    const remains = [];
    this.traverseTiles((tile, i, j) => {
      if (!tile) {
        remains.push([i, j]);
      }
    });
    if (remains.length === 1) {
      const last = remains[0];
      this.tiles[last[0]][last[1]] = { number: 1 };
      const canMove = this.checkGameCanMove();
      this.tiles[last[0]][last[1]] = undefined;
      if (!canMove) {
        this.displayMessage();
      }
    }
    return remains[Math.floor(Math.random() * remains.length)];
  }

  createNewTile(number, position) {
    const element = document.createElement('div');
    const [x, y] = position;
    const tile = new Tile(element, number, x, y);
    this.container.appendChild(element);
    return tile;
  }

  generateNewTile() {
    const nextPosition = this.pickRandomEmptyTile();
    const [x, y] = nextPosition;
    this.tiles[x][y] = this.createNewTile(1, [x, y]);
    this.tiles[x][y].markNew();
  }

  displayMessage() {
    this.messageContainer.style.display = 'block';
  }
}

export default GameManager;
