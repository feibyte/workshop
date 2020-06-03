import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  it('should insert and search element', () => {
    const list = new LinkedList();
    list.insert(1);
    list.insert(4);
    list.insert(16);
    list.insert(9);

    expect(list.size()).toBe(4);
    expect(list.search(27)).toBeFalsy();
    expect(list.search(16)).toBeTruthy();
  });

  it('should be able to delete element', () => {
    const list = new LinkedList();
    list.insert(1);
    list.insert(4);
    list.insert(16);
    list.insert(9);

    list.delete(4);
    expect(list.size()).toBe(3);
    expect(list.search(4)).toBeFalsy();
  });

  it('should throw error when delete on empty list', () => {
    const list = new LinkedList();
    expect(() => list.delete(3)).toThrow();
  });

  it('should return reverse list after calling reverse()', () => {
    const list = new LinkedList();
    list.insert(1);
    list.insert(4);
    list.insert(16);

    expect(list.toArray()).toEqual([16, 4, 1]);
    list.reverse();
    expect(list.toArray()).toEqual([1, 4, 16]);
  });

  it('should works with custom comparator', () => {
    const list = new LinkedList((objA, objB) => objA.key === objB.key);
    list.insert({ key: 3 });
    list.insert({ key: 4 });
    expect(list.search({ key: 4 })).toBeTruthy();
  });
});
