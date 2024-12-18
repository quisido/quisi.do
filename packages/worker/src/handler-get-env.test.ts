import { describe, expect, it } from 'vitest';
import noop from '../test/noop.js';
import { Handler } from './index.js';

describe('Handler', (): void => {
  it('should throw an error when accessing a binding outside of an operation', (): void => {
    const handler = new Handler(noop);
    expect((): unknown => {
      return handler.getBinding('UNKNOWN');
    }).toThrow('Bindings may only be accessed during an operation.');
  });
});
