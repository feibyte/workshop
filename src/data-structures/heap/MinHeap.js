import Heap from './Heap';

const defaultComparator = (pre, next) => pre - next;

class MinHeap extends Heap {
  constructor(array = [], compare = defaultComparator) {
    super(array);
    this.compare = compare;
    this.build();
  }

  isInRightPosition(child, parent) {
    return this.compare(child, parent) < 0;
  }

  extractMin() {
    return super.extract();
  }
}

export default MinHeap;
