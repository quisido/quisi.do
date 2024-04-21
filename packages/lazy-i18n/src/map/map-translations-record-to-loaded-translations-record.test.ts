/// <reference types="jest" />
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
        testC(): Record<string, string> {
          return {
            five: 'six',
          };
        },
        async testD(): Promise<Record<string, string>> {
          return Promise.resolve({
            seven: 'eight',
          });
        },
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
