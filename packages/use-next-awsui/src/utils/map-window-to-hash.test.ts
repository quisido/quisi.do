import mapWindowToHash from "./map-window-to-hash.js";

describe('mapWindowToHash', (): void => {
  it('should support server-side rendering', (): void => {
    const hash: string = mapWindowToHash(undefined);
    expect(hash).toBe('');
  });
});
