/// <reference types="jest" />
import noop from './noop';

describe('noop', (): void => {
  it('should do nothing', (): void => {
    expect((): void => {
      noop();
    }).not.toThrow();
  });
});
