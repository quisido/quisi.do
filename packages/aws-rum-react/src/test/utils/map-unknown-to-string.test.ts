import mapUnknownToString from './map-unknown-to-string';

describe('mapUnknownToString', (): void => {
  it('should support primitives', (): void => {
    expect(mapUnknownToString('string')).toBe('string');
    expect(mapUnknownToString(1)).toBe('1');
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
