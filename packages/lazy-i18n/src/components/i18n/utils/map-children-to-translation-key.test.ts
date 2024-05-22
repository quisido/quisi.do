import { describe, expect, it } from 'vitest';
import mapChildrenToTranslationKey from './map-children-to-translation-key.js';

describe('mapChildrenToTranslationKey', (): void => {
  it('should join arrays', (): void => {
    const FIRST = 1;
    const LAST = 2;
    expect(mapChildrenToTranslationKey([FIRST, 'test', LAST])).toBe('1test2');
  });

  it('should convert numbers to strings', (): void => {
    const NUMBER = 1;
    expect(mapChildrenToTranslationKey(NUMBER)).toBe('1');
  });

  it('should return strings', (): void => {
    expect(mapChildrenToTranslationKey('test')).toBe('test');
  });
});
