import { describe, expect, it } from 'vitest';
import noop from '../test/noop.js';
import { Handler } from './index.js';

describe('Handler', (): void => {
  it('should throw an error when accessing the environment outside of an operation', (): void => {
    const handler = new Handler(noop);
    expect((): unknown => {
      return handler.getEnv('UNKNOWN');
    }).toThrow('The environment may only be accessed during an operation.');
  });
});
