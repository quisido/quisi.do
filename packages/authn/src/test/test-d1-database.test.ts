import { describe, expect, it } from 'vitest';
import TestD1Database from './test-d1-database.js';

describe('TestD1Database', (): void => {
  it('should throw an error when querying unprepared statements', (): void => {
    const { expectToHaveQueried } = new TestD1Database({});
    expect((): void => {
      expectToHaveQueried('non-existent query', []);
    }).toThrow();
  });

  it('should throw an error preparing unmocked statements', (): void => {
    const { prepare } = new TestD1Database({});
    expect((): void => {
      prepare('non-existent query');
    }).toThrow();
  });
});
