import { describe, it } from 'vitest';
import noop from './noop.js';

describe('noop', (): void => {
  it('should do nothing', (): void => {
    noop();
  });
});
