/// <reference types="jest" />
import EventEmitter from './event-emitter';

describe('EventEmitter', (): void => {
  it('should not crash if no event handler exists', (): void => {
    const emitter: EventEmitter = new EventEmitter();
    emitter.emit('test');
  });

  it('should call various emit handlers', (): void => {
    const ONE = jest.fn();
    const TWO = jest.fn();
    const emitter: EventEmitter<'test', [string]> = new EventEmitter();
    emitter.on('test', ONE);
    emitter.on('test', TWO);
    emitter.emit('test', 'arg');
    expect(ONE).toHaveBeenCalledTimes(1);
    expect(ONE).toHaveBeenLastCalledWith('arg');
    expect(TWO).toHaveBeenCalledTimes(1);
    expect(TWO).toHaveBeenLastCalledWith('arg');
  });
});
