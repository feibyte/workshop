import {
  memorize, curry, throttle, deepClone, fakeInstanceOf, mockCall, simplifyNums, flatObj,
} from './underscore';

describe('curry', () => {
  const addTwoNumbers = (a, b) => a + b;
  it('should return a function when args is not enough', () => {
    const curriedFn = curry(addTwoNumbers);
    expect(typeof curriedFn).toBe('function');
    expect(typeof curriedFn(4)).toBe('function');
  });

  it('should return correct result given args are enough', () => {
    const curriedFn = curry(addTwoNumbers);
    expect(curriedFn(3)(4)).toBe(7);
  });

  it('should return same result on given different forms', () => {
    const concatArray = (a, b, c) => [a, b, c];
    const curriedFn = curry(concatArray);
    expect(curriedFn('a')('b')('c')).toEqual(['a', 'b', 'c']);
    expect(curriedFn('a', 'b')('c')).toEqual(['a', 'b', 'c']);
    expect(curriedFn('a', 'b', 'c')).toEqual(['a', 'b', 'c']);
  });
});

describe('memorize', () => {
  it('should return correct result when given function', () => {
    const add = (a, b) => a + b;
    const memorizedAdd = memorize(add);
    expect(memorizedAdd(3, 4)).toBe(7);
  });

  it('should be called only once when given args are same', () => {
    const add = jest.fn((a, b) => a + b);
    const memorizedAdd = memorize(add);
    memorizedAdd(1, 2);
    memorizedAdd(1, 2);
    memorizedAdd(1, 2);
    expect(add).toHaveBeenCalledTimes(1);
  });
});

describe('throttle', () => {
  let dateNowMockFn;
  let mockDate = Date.now();

  beforeAll(() => {
    jest.useFakeTimers();
    dateNowMockFn = jest.spyOn(Date, 'now').mockImplementation(() => mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
    dateNowMockFn.mockRestore();
  });

  it('should called 1 time when given time shorter than wait', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 300);
    throttledFn();
    mockDate += 100;
    jest.advanceTimersByTime(100);
    throttledFn();
    mockDate += 100;
    jest.advanceTimersByTime(100);
    throttledFn();
    mockDate += 50;
    jest.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should called 2 times when given time shorter than wait', () => {
    const mockFn = jest.fn();
    const throttledFn = throttle(mockFn, 300);
    throttledFn();
    mockDate += 200;
    jest.advanceTimersByTime(200);
    throttledFn();
    mockDate += 110;
    jest.advanceTimersByTime(110);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

describe('deepClone', () => {
  it('should return cloned simple object', () => {
    const obj = { name: 'Underscore', age: 3 };
    const cloned = deepClone(obj);
    expect(cloned === obj).toBe(false);
    expect(cloned).toEqual(obj);
  });

  it('should return cloned with cycle reference', () => {
    const node = { key: 'parent', parent: null };
    node.left = {
      key: 'left',
      parent: node,
    };
    const cloned = deepClone(node);
    expect(cloned === node).toBe(false);
    expect(cloned).toEqual(node);
    expect(cloned.left.parent === cloned).toBe(true);
  });
});

describe('instanceof', () => {
  class Animal {}
  class Cat extends Animal {}
  it('should return true when call with a instance', () => {
    const ani = new Animal();
    const cat = new Cat();
    expect(fakeInstanceOf(ani, Animal)).toBe(true);
    expect(fakeInstanceOf(ani, Cat)).toBe(false);
    expect(fakeInstanceOf(cat, Animal)).toBe(true);
    expect(fakeInstanceOf(cat, Cat)).toBe(true);
  });
});

describe('mockCall', () => {
  beforeAll(() => {
    // eslint-disable-next-line no-extend-native
    Function.prototype.mockCall = mockCall;
  });

  afterAll(() => {
    delete Function.prototype.mockCall;
  });

  function getName() { return this.name; }
  function add(num1, num2) { return this.num + num1 + num2; }
  it('should return current prop given call is on object', () => {
    expect(getName.mockCall({ name: 'mockCall' })).toEqual('mockCall');
  });

  it('should return global var given context is null', () => {
    global.name = 'global name';
    expect(getName.mockCall(null)).toEqual('global name');
  });

  it('should return result with params given call has params', () => {
    expect(add.mockCall({ num: 1 }, 2, 3)).toEqual(6);
  });
});

describe('simplifyNums', () => {
  it('should return compressed', () => {
    expect(simplifyNums([1, 2, 3, 5, 7, 8, 9])).toEqual(['1~3', '5', '7~9']);
    expect(simplifyNums([1, 2, 3, 5, 20, 7, 8, 9])).toEqual(['1~3', '5', '20', '7~9']);
  });
});

describe('flatObj', () => {
  it('should', () => {
    const entry = {
      a: {
        b: {
          c: {
            dd: 'abcdd',
          },
        },
        d: {
          xx: 'adxx',
        },
        e: 'ae',
      },
    };
    expect(flatObj(entry)).toEqual({
      'a.b.c.dd': 'abcdd',
      'a.d.xx': 'adxx',
      'a.e': 'ae',
    });
  });
});
