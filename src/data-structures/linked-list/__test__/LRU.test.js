import LRU from '../LRU';

describe('LRU', () => {
  it('should', () => {
    const cache = new LRU(2 /* 缓存容量 */);

    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toEqual(1); // 返回  1
    cache.put(3, 3); // 该操作会使得关键字 2 作废
    expect(cache.get(2)).toEqual(-1); // 返回 -1 (未找到)
    cache.put(4, 4); // 该操作会使得关键字 1 作废
    expect(cache.get(1)).toEqual(-1); // 返回 -1 (未找到)
    expect(cache.get(3)).toEqual(3); // 返回  3
    expect(cache.get(4)).toEqual(4); // 返回  4
  });
});
