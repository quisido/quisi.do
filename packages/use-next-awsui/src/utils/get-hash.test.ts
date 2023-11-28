import getHash from './get-hash.js';

const WINDOW: Window = window;

describe('getHash', (): void => {
  beforeEach((): void => {
    Object.defineProperty(global, 'window', {
      value: undefined,
    });
  });

  afterEach((): void => {
    Object.defineProperty(global, 'window', {
      value: WINDOW,
    });
  });

  it('should support server-side rendering', (): void => {
    const hash: string = getHash();
    expect(hash).toBe('');
  });
});
