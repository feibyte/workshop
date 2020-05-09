# Redux

Redux 代码本身非常简单，而且文档也比较详细，包括中间件的说明。
`creatStore` 本质上就是构造一个支持订阅模式的 `store`，代码简单易懂。
至于中间件，其实官方文档说的已经非常详细了。

在这儿，我并没有暴露给 `createStore` 而是作为一个单独的 `enhancer` 对待， 个人以为 `createStore` 是一个完整的功能，`enhancer` 更像是一个装饰器。
所以最终保持 `createStore` 的单一职责，只是测试中验证了一下 `enhancer`。

```js
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
```
