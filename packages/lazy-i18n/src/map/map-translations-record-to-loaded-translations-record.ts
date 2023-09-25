import isDefaultStringRecordExport from '../is/is-default-string-record-export.js';
import isStringRecord from '../is/is-string-record.js';
import type { Translations } from '../types/translations.js';

export default function mapTranslationsRecordToLoadedTranslationsRecord<
  T extends Record<string, Translations | undefined>,
>(translationsRecord: T): Record<keyof T, Record<string, string> | undefined> {
  const loadedTranslationsRecord: Record<
    keyof T,
    Record<string, string> | undefined
  > = Object.create(null);
  const entries: [keyof T, Translations | undefined][] =
    Object.entries(translationsRecord);
  for (const [locale, translations] of entries) {
    if (isDefaultStringRecordExport(translations)) {
      loadedTranslationsRecord[locale] = translations.default;
    }
    if (isStringRecord(translations)) {
      loadedTranslationsRecord[locale] = translations;
    }
  }
  return loadedTranslationsRecord;
}
