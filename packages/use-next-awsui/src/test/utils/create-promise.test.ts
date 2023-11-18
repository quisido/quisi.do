import createPromise from "./create-promise.js";

describe('createPromise', (): void => {
  it('should return a Promise', (): void => {
    expect(createPromise()).toBeInstanceOf(Promise);
  });
});
