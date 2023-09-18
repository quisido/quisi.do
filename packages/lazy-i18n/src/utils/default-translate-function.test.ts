import defaultTranslateFunction from './default-translate-function';

const TEST_STRING = 'test string';

describe('defaultTranslateFunction', (): void => {
  it('should return the same string', (): void => {
    expect(defaultTranslateFunction(TEST_STRING)).toBe(TEST_STRING);
  });
});
