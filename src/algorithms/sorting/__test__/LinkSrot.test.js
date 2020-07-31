import { partition, mergeSort } from '../LinkSort';

describe('LinkSort', () => {
  it('should', () => {
    const node1 = { val: 4 };
    const node2 = { val: 2 };
    const node3 = { val: 1 };
    const node4 = { val: 3 };
    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = null;

    console.log(mergeSort(node1));
  });
});
