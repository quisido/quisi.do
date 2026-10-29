import { describe, expect, it } from 'vitest';
import { mapEntryToValue } from './index.js';

describe('mapEntryToValue', (): void => {
  it('should support true and false', (): void => {
    expect(Object.entries({ ab: 'cd', ef: 'gh' }).map(mapEntryToValue)).toEqual(
      ['cd', 'gh'],
    );
  });
});
