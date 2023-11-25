import isDefaultStringRecordExport from '../is/is-default-string-record-export.js';
import isStringRecord from '../is/is-string-record.js';
import type { Translations } from '../types/translations.js';

const DEFAULT_LOADED_TRANSLATIONS_RECORD: Readonly<
  Record<number | string | symbol, undefined>
> = Object.freeze({});

export default function mapTranslationsRecordToLoadedTranslationsRecord<
  T extends Record<string, Translations | undefined>,
>(translationsRecord: T): Record<keyof T, Record<string, string> | undefined> {
  let loadedTranslationsRecord: Readonly<
    Record<keyof T, Record<string, string> | undefined>
  > = DEFAULT_LOADED_TRANSLATIONS_RECORD;

  const entries: [keyof T, Translations | undefined][] =
    Object.entries(translationsRecord);
  for (const [locale, translations] of entries) {
    if (isDefaultStringRecordExport(translations)) {
      loadedTranslationsRecord = {
        ...loadedTranslationsRecord,
        [locale]: translations.default,
      };
    }
    if (isStringRecord(translations)) {
      loadedTranslationsRecord = {
        ...loadedTranslationsRecord,
        [locale]: translations,
      };
    }
  }

  return loadedTranslationsRecord;
}
