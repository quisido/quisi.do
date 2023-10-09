import mapTranslationsRecordToLoadedTranslationsRecord from './map-translations-record-to-loaded-translations-record';

describe('mapTranslationsRecordToLoadedTranslationsRecord', (): void => {
  it('should keep eagerly loaded translations', (): void => {
    expect(
      mapTranslationsRecordToLoadedTranslationsRecord({
        a: {
          one: 'two',
        },
        b: {
          default: {
            three: 'four',
          },
        },
        c(): Record<string, string> {
          return {
            five: 'six',
          };
        },
        async d(): Promise<Record<string, string>> {
          return Promise.resolve({
            seven: 'eight',
          });
        },
      }),
    ).toEqual({
      a: {
        one: 'two',
      },
      b: {
        three: 'four',
      },
    });
  });
});
