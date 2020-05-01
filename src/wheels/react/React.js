import { updateInstance } from './ReactDOM.js';

class Component {
  constructor(props, state) {
    this.props = props;
    this.state = state;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    // eslint-disable-next-line no-underscore-dangle
    updateInstance(this.__internalInstance);
  }
}

const createElement = (tag, props, ...children) => ({
  type: tag,
  props: {
    ...props,
    children, // 简单起见，children 类型为数组
  },
});

const React = {
  createElement,
  Component,
};

export default React;
