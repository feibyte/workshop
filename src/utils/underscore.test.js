import { memorize, curry, throttle } from './underscore';

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
