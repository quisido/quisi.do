import { describe, expect, it, vi } from 'vitest';
import mapTranslationsRecordToLoadedTranslationsRecord from './map-translations-record-to-loaded-translations-record.js';

describe('mapTranslationsRecordToLoadedTranslationsRecord', (): void => {
  it('should keep eagerly loaded translations', (): void => {
    expect(
      mapTranslationsRecordToLoadedTranslationsRecord({
        testA: {
          one: 'two',
        },
        testB: {
          default: {
            three: 'four',
          },
        },
        testC: vi.fn(),
      }),
    ).toEqual({
      testA: {
        one: 'two',
      },
      testB: {
        three: 'four',
      },
    });
  });
});
