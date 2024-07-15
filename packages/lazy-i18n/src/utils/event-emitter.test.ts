import { describe, expect, it, vi } from 'vitest';
import EventEmitter from './event-emitter.js';

describe('EventEmitter', (): void => {
  it('should not crash if no event handler exists', (): void => {
    const emitter: EventEmitter = new EventEmitter();
    emitter.emit('test');
  });

  it('should call various emit handlers', (): void => {
    const ONE = vi.fn();
    const TWO = vi.fn();
    const emitter: EventEmitter<'test', [string]> = new EventEmitter<
      'test',
      [string]
    >();
    emitter.on('test', ONE);
    emitter.on('test', TWO);
    emitter.emit('test', 'arg');
    expect(ONE).toHaveBeenCalledOnce();
    expect(ONE).toHaveBeenLastCalledWith('arg');
    expect(TWO).toHaveBeenCalledOnce();
    expect(TWO).toHaveBeenLastCalledWith('arg');
  });
});
