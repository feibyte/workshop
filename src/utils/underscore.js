export const curry = (fn) => {
  const len = fn.length;
  const next = (...argsBuffer) => {
    if (argsBuffer.length >= len) {
      return fn(...argsBuffer);
    }
    return next.bind(null, ...argsBuffer);
  };
  return next;
};

// curry(fn);
const curry2 = (fn, ...rest) => {
  if (rest.length < fn.length) {
    return curry2.bind(null, fn, ...rest);
  }
  return fn.call(null, rest);
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
  return function (...args) {
    const run = () => {
      previous = Date.now();
      timer = null;
      fn.apply(this, args);
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

export const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export const deepClone = (obj) => {
  const originIndex = [];
  const cloneIndex = [];

  const cloneProp = (origin) => {
    if (typeof origin !== 'object') {
      return origin;
    }
    if (origin === null) {
      return origin;
    }

    const index = originIndex.indexOf(origin);
    if (index !== -1) {
      return cloneIndex[index];
    }

    let clone = {};
    if (clone instanceof Array) {
      clone = [];
    }
    originIndex.push(origin);
    cloneIndex.push(clone);
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in origin) {
      if (Object.prototype.hasOwnProperty.call(origin, propName)) {
        clone[propName] = cloneProp(origin[propName]);
      }
    }
    return clone;
  };

  return cloneProp(obj);
};

export const fakeInstanceOf = (instance, C) => {
  let proto = Object.getPrototypeOf(instance); // instance.__proto__
  while (proto) {
    if (proto === C.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto); // instance.__proto__
  }
  return false;
};

// 模拟 new 操作
const mockNew = (constructor, ...args) => {
  const obj = {};
  Object.setPrototypeOf(obj, constructor.prototype); // const obj = Object.create(constructor);
  const result = constructor.apply(obj, args);
  return typeof result === 'object' ? obj : result;
};

export const mockCall = function (context, ...args) {
  context = context || global;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

const mockApply = (context, args) => mockCall(context, ...args);

const mockBind = function (context, ...defaultParams) {
  return (...restParams) => {
    const args = [].concat(defaultParams).concat(restParams);
    return this.apply(context, args);
  };
};

export const simplifyNums = (nums) => {
  const result = [];
  let start = nums[0];
  nums.forEach((current, index) => {
    const next = nums[index + 1];
    if (current + 1 !== next) {
      if (start !== current) {
        result.push(`${start}~${current}`);
      } else {
        result.push(String(current));
      }
      start = next;
    }
  });
  return result;
};

export const flatObj = (entry) => {
  const result = {};
  const dfs = (obj, path) => {
    if (typeof obj === 'object') {
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const key in obj) {
        dfs(obj[key], [...path, key]);
      }
    } else {
      result[path.join('.')] = obj;
    }
  };
  dfs(entry, []);
  return result;
};
