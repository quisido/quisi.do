import mapUnknownToString from './map-unknown-to-string';

describe('mapUnknownToString', (): void => {
  it('should support primitives', (): void => {
    const TEST_NUMBER = 1;
    expect(mapUnknownToString('string')).toBe('string');
    expect(mapUnknownToString(TEST_NUMBER)).toBe('1');
    expect(mapUnknownToString(true)).toBe('true');
  });

  it('should support errors', (): void => {
    expect(mapUnknownToString(new Error('test message'))).toBe('test message');
  });

  it('should support objects', (): void => {
    expect(mapUnknownToString({})).toBe('{}');
    expect(mapUnknownToString([])).toBe('[]');
  });
});
