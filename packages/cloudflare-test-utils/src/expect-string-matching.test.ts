import { describe, expect, it } from 'vitest';
import { expectStringMatching } from './index.js';

describe('expectStringMatching', (): void => {
  it('should match strings', (): void => {
    expect({ key: 'string' }).toEqual({
      key: expectStringMatching(/^str[aeiou]ng$/u),
    });
  });
});
