import { describe, expect, it } from 'vitest';
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
        testC: (): Promise<never> =>
          Promise.reject(new Error('Expected error')),
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
