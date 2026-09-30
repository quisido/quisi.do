import { describe, expect, it } from 'vitest';

import { Handler } from './index.js';
import noop from './noop.js';

describe('Handler', (): void => {
  it('should expose the console', (): void => {
    const handler = new Handler(noop);
    expect(handler.console).toBe(console);
  });
});
