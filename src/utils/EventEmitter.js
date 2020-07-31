/* eslint-disable no-underscore-dangle */
class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(type, listener) {
    if (!this._events[type]) {
      this._events[type] = [];
    }
    this._events[type].push(listener);
  }

  emit(type, ...args) {
    if (this._events[type]) {
      this._events[type].forEach((listener) => {
        // listener.apply(this, args);
        listener(...args);
      });
    }
  }

  off(type, listener) {
    if (this._events[type]) {
      const index = this._events[type].indexOf(listener);
      this._events[type].splice(index, 1);
    }
  }

  once(type, listener) {
    const oneTimeListener = (...args) => {
      // listener.apply(this, args);
      listener(...args);
      this.off(type, oneTimeListener);
    };
    this.on(type, oneTimeListener);
  }
}

export default EventEmitter;
