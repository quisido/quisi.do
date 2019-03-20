import defaultTranslateFunction from './default-translate-function.js';

const TEST_STRING = 'test string';

describe('defaultTranslateFunction', (): void => {
  it('should return the same string', (): void => {
    expect(defaultTranslateFunction(TEST_STRING)).toBe(TEST_STRING);
  });
});
