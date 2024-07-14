import createStore from '../createStore';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

describe('createStore()', () => {
  it('should return default state of reducer after creating store with reducer', () => {
    const store = createStore(counter);
    expect(store.getState()).toBe(0);
  });

  it('should return new state after calling dispatch increment action', () => {
    const store = createStore(counter);
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState()).toBe(1);
  });

  it('should call subscribed listener when state is changed', () => {
    const listener = jest.fn();
    const store = createStore(counter);
    store.subscribe(listener);
    store.dispatch({ type: 'INCREMENT' });
    expect(listener).toHaveBeenCalledTimes(1);
    store.dispatch({ type: 'INCREMENT' });
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('should not call listener after unsubscribe it', () => {
    const listener = jest.fn();
    const store = createStore(counter);
    const unsubscribe = store.subscribe(listener);
    store.dispatch({ type: 'INCREMENT' });
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    store.dispatch({ type: 'INCREMENT' });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

/**
 * See more https://redux.js.org/advanced/middleware
 * Personally, enhance should be individual function instead of integrating with createStore.
 * Here's demo for it.
 */
describe('Enhance dispatch', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('should support dispatch function returning action when override dispatch directly', () => {
    const store = createStore(counter);
    const next = store.dispatch;
    store.dispatch = (fn) => {
      next(fn());
    };
    store.dispatch(() => ({ type: 'INCREMENT' }));
    expect(store.getState()).toBe(1);
  });

  const enhancerV1 = (store, middlewares) => {
    let { dispatch } = store;
    middlewares.forEach((middleware) => {
      dispatch = middleware(dispatch);
    });
    return {
      ...store,
      dispatch,
    };
  };
  it('should be able to dispatch function by wrapping with enhancerV1', () => {
    const thunk = (dispatch) => (action) => {
      dispatch(action());
    };
    const store = enhancerV1(createStore(counter), [thunk]);
    store.dispatch(() => ({ type: 'INCREMENT' }));
    expect(store.getState()).toBe(1);
  });

  const enhancerV2 = (oldStore, middlewares) => {
    let { dispatch } = oldStore;
    const store = {
      getState: oldStore.getState,
      dispatch,
    };
    middlewares.forEach((middleware) => {
      dispatch = middleware(store)(dispatch);
    });
    return {
      ...store,
      dispatch,
    };
  };

  it('should be able to work with async function by wrapping with enhancerV2', () => {
    const thunk = (store) => (next) => (action) =>
      typeof action === 'function'
        ? action(store.dispatch, store.getState)
        : next(action);
    const store = enhancerV2(createStore(counter), [thunk]);
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'INCREMENT' });
      }, 100);
    });
    jest.advanceTimersByTime(200);
    expect(store.getState()).toBe(1);
  });
});
