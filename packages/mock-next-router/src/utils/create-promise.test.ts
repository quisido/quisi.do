/// <reference types="jest" />
import createPromise from './create-promise.js';

describe('createPromise', (): void => {
  it('should create a Promise', (): void => {
    expect(createPromise()).toBeInstanceOf(Promise);
  });
});
