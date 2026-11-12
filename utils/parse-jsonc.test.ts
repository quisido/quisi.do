import { describe, expect, it } from 'vitest';
import parseJsonc from './parse-jsonc.js';

describe('parseJsonc', (): void => {
  it('should handle errors', (): void => {
    expect((): void => {
      parseJsonc('{"}');
    }).toThrow(
      'An error occurred while parsing JSON with comments:\nUnexpectedEndOfString: "} at 1\nColonExpected:  at 3\nCloseBraceExpected:  at 3',
    );
  });
});
