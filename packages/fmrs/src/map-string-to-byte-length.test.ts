import { describe, expect, it } from 'vitest';
import { mapStringToByteLength } from './index.js';

describe('mapStringToByteLength', (): void => {
  it('should return the byte length of a string', (): void => {
    expect(mapStringToByteLength('Hello, world!')).toBe(13);
  });

  it('should return 0 for an empty string', (): void => {
    expect(mapStringToByteLength('')).toBe(0);
  });

  it('should handle special characters correctly', (): void => {
    expect(mapStringToByteLength('こんにちは')).toBe(15);
  });

  it('should handle emojis correctly', (): void => {
    expect(mapStringToByteLength('🙂')).toBe(4);
  });
});
