import React from '../React';

// Given we have jsx component:
// const Fruits = () => (
//   <ul className='fruits'>
//   <li>apple</li>
//   <li>banana</li>
//   </ul>
// );
// Then it will be translated to this by babel:
// React.createElement("ul", {
//   className: "fruits"
//   },
//   React.createElement("li", null, "apple"),
//   React.createElement("li", null, "banana"),
// );
// So let's just focus on vanilla JS

describe('React', () => {
  it('should return element data structure when calling createElement', () => {
    const json = React.createElement('h1', { title: 'appName' }, 'Hello world');
    expect(json).toEqual({
      type: 'h1',
      props: {
        title: 'appName',
        children: ['Hello world'],
      },
    });
  });
});
