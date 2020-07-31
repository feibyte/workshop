import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
  it('behave as expected', () => {
    const emitter = new EventEmitter();
    const changeFn = jest.fn();
    emitter.on('change', changeFn);
    emitter.emit('change', 'changeArgs');
    expect(changeFn).toHaveBeenCalledWith('changeArgs');
  });

  it('remove listener when calling once', () => {
    const emitter = new EventEmitter();
    const changeFn = jest.fn();
    emitter.once('change', changeFn);
    emitter.emit('change', 'changeArgs');
    emitter.emit('change', 'changeArgs2');
    expect(changeFn).toHaveBeenCalledWith('changeArgs');
    expect(changeFn).toHaveBeenCalledTimes(1);
  });
});
