import DoublyLinkedList from '../DoublyLinkedList';

describe('DoublyLinkedList', () => {
  it('should insert and search element', () => {
    const list = new DoublyLinkedList();
    list.insert(3);
    list.insert(16);
    list.insert(9);

    expect(list.size()).toBe(3);
    expect(list.search(27)).toBeFalsy();
    expect(list.search(16)).toBeTruthy();
  });

  it('should be able to delete element', () => {
    const list = new DoublyLinkedList();
    list.insert(4);
    list.insert(16);
    list.insert(9);

    list.delete(4);
    expect(list.size()).toBe(2);
    expect(list.search(4)).toBeFalsy();
  });
});
