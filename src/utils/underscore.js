export const curry = (fn) => {
  const len = fn.length;
  const next = (...newArgs) => {
    const argsBuffer = newArgs;
    if (argsBuffer.length >= len) {
      return fn(...argsBuffer);
    }
    return next.bind(null, ...argsBuffer);
  };
  return next;
};

export const memorize = (fn) => {
  const memo = {};
  return (...args) => {
    // We need a better hash function for reference arguments.
    const key = args.length + args.join(',');
    if (memo[key]) {
      return memo[key];
    }
    memo[key] = fn(...args);
    return memo[key];
  };
};

export const throttle = (fn, wait) => {
  let timer;
  let previous = 0;
  return (...args) => {
    const run = () => {
      previous = Date.now();
      timer = null;
      fn(...args);
    };
    const remaining = wait - (Date.now() - previous);
    if (remaining <= 0) {
      clearTimeout(timer);
      run();
    } else if (!timer) {
      timer = setTimeout(run, remaining);
    }
  };
};
