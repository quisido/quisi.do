import mapChildrenToTranslationKey from './map-children-to-translation-key.js';

describe('mapChildrenToTranslationKey', (): void => {
  it('should join arrays', (): void => {
    expect(mapChildrenToTranslationKey([1, 'test', 2])).toBe('1test2');
  });

  it('should convert numbers to strings', (): void => {
    expect(mapChildrenToTranslationKey(1)).toBe('1');
  });

  it('should return strings', (): void => {
    expect(mapChildrenToTranslationKey('test')).toBe('test');
  });
});
