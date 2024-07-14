const createPublicInstance = (element, internalInstance) => {
  const { type, props } = element;
  // eslint-disable-next-line new-cap
  const publicInstance = new type(props);
  // eslint-disable-next-line no-underscore-dangle
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
};

const isPrimitive = (element) =>
  typeof element === 'boolean' ||
  typeof element === 'string' ||
  typeof element === 'number' ||
  element === null ||
  element === undefined;

const updateDomProperties = (dom, prevProps = {}, nextProps = {}) => {
  Object.keys(prevProps).forEach((key) => {
    if (key === 'children') {
      return;
    }
    if (key.startsWith('on')) {
      const eventType = key.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[key]);
    } else {
      dom.removeAttribute(key, prevProps[key]);
    }
  });
  Object.keys(nextProps).forEach((key) => {
    if (key === 'children') {
      return;
    }
    if (key.startsWith('on')) {
      const eventType = key.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[key]);
    } else {
      dom.setAttribute(key, nextProps[key]);
    }
  });
};

const instantiate = (element) => {
  if (isPrimitive(element)) {
    const dom = document.createTextNode(element);
    return {
      dom,
      element,
      childrenInstances: [],
    };
  }
  // isDom
  if (typeof element.type === 'string') {
    const { type, props = {} } = element;
    const dom = document.createElement(type);
    updateDomProperties(dom, {}, props);
    const childrenInstances = (props.children || [])
      .filter(Boolean)
      .map((child) => instantiate(child));
    childrenInstances.map(({ dom: childDom }) => dom.appendChild(childDom));
    return {
      dom,
      element,
      childrenInstances,
    };
  }
  // Customized component
  const instance = {};
  const publicInstance = createPublicInstance(element, instance);
  const childElement = publicInstance.render();
  const childInstance = instantiate(childElement);
  const { dom } = childInstance;
  Object.assign(instance, {
    dom,
    element,
    publicInstance,
    childInstance,
  });
  return instance;
};

const reconcile = (parentDom, instance, element) => {
  if (instance === null) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
  if (element === null) {
    parentDom.removeChild(instance.element);
    return null;
  }
  if (instance.element.type === element.type) {
    if (isPrimitive(element)) {
      instance.dom.nodeValue = element;
      return instance;
    }
    if (typeof element.type === 'string') {
      updateDomProperties(instance.dom, instance.element.props, element.props);
      // eslint-disable-next-line no-use-before-define
      instance.childInstances = reconcileChildren(instance, element);
      instance.element = element;
      return instance;
    }
    instance.publicInstance.props = element.props;
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
  const newInstance = instantiate(element);
  parentDom.replaceChild(newInstance.dom, instance.dom);
  return newInstance;
};

const reconcileChildren = (instance, element) => {
  const { dom } = instance;
  const { childrenInstances } = instance;
  const nextChildElements = element.props.children || [];
  const newChildInstances = [];
  const count = Math.max(childrenInstances.length, nextChildElements.length);
  for (let i = 0; i < count; i++) {
    const newChildInstance = reconcile(
      dom,
      childrenInstances[i],
      nextChildElements[i],
    );
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances;
};

export const updateInstance = (internalInstance) => {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  reconcile(parentDom, internalInstance, element);
};

let previousInstance = null;
const render = (element, container) => {
  previousInstance = reconcile(container, previousInstance, element);
};

const ReactDOM = {
  render,
  updateInstance,
};

export default ReactDOM;
