import { describe, expect, it } from 'vitest';
import { mapEntryToKey } from './index.js';

describe('mapEntryToKey', (): void => {
  it('should support true and false', (): void => {
    expect(Object.entries({ ab: 'cd', ef: 'gh' }).map(mapEntryToKey)).toEqual([
      'ab',
      'ef',
    ]);
  });
});
