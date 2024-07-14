const INIT_ACTION = '@INIT_ACTION';

// This is a naive implementation of createStore.
// Here's not supporting initial state and enhancer
// as I think enhancer should be individual function.
const createStore = (reducer) => {
  let currentState = reducer(undefined, INIT_ACTION);
  const listeners = [];

  const getState = () => currentState;
  const dispatch = (action) => {
    currentState = reducer(currentState, action);
    listeners.forEach((listener) => {
      listener();
    });
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  };
  return {
    getState,
    dispatch,
    subscribe,
  };
};

export default createStore;
