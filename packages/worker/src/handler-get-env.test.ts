import { describe, expect, it } from 'vitest';

import { Handler } from './index.js';
import noop from './noop.js';

describe('Handler', (): void => {
  it('should throw an error when accessing a binding outside an operation', (): void => {
    const handler = new Handler(noop);
    expect((): unknown => handler.getBinding('UNKNOWN')).toThrow(
      'Bindings may only be accessed during an operation.',
    );
  });
});
