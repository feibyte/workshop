class MiniPromise {
  constructor(executor) {
    this.status = 'pending';
    this.data = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    function resolve(value) {
      if (this.status === 'pending') {
        this.status = 'resolved';
        this.data = value;
        this.onResolvedCallbacks.forEach((callback) => callback(value));
      }
    }

    function reject(error) {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.data = error;
        this.onRejectedCallbacks.forEach((callback) => callback(error));
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  static resolve(value) {
    return new MiniPromise((resolve) => resolve(value));
  }

  static reject(error) {
    return new MiniPromise((resolve, reject) => reject(error));
  }

  static try(callback) {
    return new MiniPromise((resolve, reject) => {
      try {
        const result = callback();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  then(onResolved, onRejected) {
    if (this.status === 'resolved') {
      return MiniPromise.try(() => onResolved(this.data));
    }

    if (this.status === 'rejected') {
      return MiniPromise.try(() => onRejected(this.data));
    }

    if (this.status === 'pending') {
      return new MiniPromise(() => {
        // this.onResolvedCallbacks.push(onResolved);
        this.onResolvedCallbacks.push((value) => {
          onResolved(value);
        });
        // this.onRejectedCallbacks.push(onRejected);
      });
    }
  }
}

export default MiniPromise;
