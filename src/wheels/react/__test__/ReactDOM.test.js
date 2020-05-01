import ReactDOM from '../ReactDOM';

describe('ReactDOM', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div id="root">';
  });
  afterEach(() => {
    // document.body.innerHTML = '';
  });

  it('should render simple dom with children and attribute', () => {
    const element = {
      type: 'h1',
      props: {
        title: 'appName',
        children: ['Hello world'],
      },
    };
    const rootDom = document.querySelector('#root');
    ReactDOM.render(element, rootDom);
    expect(rootDom.innerHTML).toEqual('<h1 title="appName">Hello world</h1>');
  });

  it('should attach event on dom when given props has onClick method', () => {
    const onClick = jest.fn();
    const element = {
      type: 'button',
      props: {
        onClick,
        children: ['Submit'],
      },
    };
    const rootDom = document.querySelector('#root');
    ReactDOM.render(element, rootDom);
    expect(rootDom.querySelector('button')).toBeTruthy();
    rootDom.querySelector('button').dispatchEvent(new Event('click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
