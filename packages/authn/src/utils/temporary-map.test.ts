import { describe, expect, it } from 'vitest';
import TemporaryMap from './temporary-map.js';

const TEST_EXPIRATION = 3600;

describe('TemporaryMap', (): void => {
  it("should default to Date's native now timestamp", (): void => {
    const map = new TemporaryMap();
    map.set('key', 'value', TEST_EXPIRATION);
    const actual: unknown = map.get('key');
    expect(actual).toEqual('value');
  });
});
