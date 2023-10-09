/// <reference types="jest" />
import handleNotFound from './handle-not-found';

describe('handleNotFound', (): void => {
  it('should throw an error', (): void => {
    expect((): void => {
      handleNotFound('test');
    }).toThrowError();
  });
});
