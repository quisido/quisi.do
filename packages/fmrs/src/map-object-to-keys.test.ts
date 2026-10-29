import { describe, expect, it } from 'vitest';
import { mapObjectToKeys } from './index.js';

describe('mapObjectToKeys', (): void => {
  it('should map an object to its keys', (): void => {
    expect(mapObjectToKeys({ bool: true, num: 123, str: 'test' })).toEqual([
      'bool',
      'num',
      'str',
    ]);
  });
});
