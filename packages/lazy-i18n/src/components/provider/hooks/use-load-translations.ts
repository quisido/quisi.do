import type { MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import isDefaultStringRecordExport from '../../../is/is-default-string-record-export.js';
import isStringRecord from '../../../is/is-string-record.js';
import type { DefaultExport } from '../../../types/default-export.js';
import type { Translations } from '../../../types/translations.js';

type EagerTranslations =
  | DefaultExport<Record<string, string>>
  | Record<string, string>;

type LazyTranslations = Promise<EagerTranslations>;

export type State<T> = (locale: T) => Promise<void> | undefined;

export interface Props<T> {
  onLoad: (locale: keyof T, translations: Record<string, string>) => void;
  onLoadError: ((locale: keyof T, err: unknown) => void) | undefined;
  translationsRecord: T;
}

export default function useLoadTranslations<
  T extends Record<string, Translations | undefined>,
>({ onLoad, onLoadError, translationsRecord }: Props<T>): State<keyof T> {
  const isFetchedRef: MutableRefObject<Record<keyof T, boolean>> = useRef(
    Object.create(null),
  );

  return useCallback(
    (locale: keyof T): Promise<void> | undefined => {
      // If we've already fetched these locations, don't fetch them again.
      if (isFetchedRef.current[locale]) {
        return;
      }
      isFetchedRef.current[locale] = true;

      const translations: Translations | undefined = translationsRecord[locale];
      if (typeof translations === 'undefined') {
        throw new Error(`Locale not found: ${String(locale)}`);
      }
      if (isStringRecord(translations)) {
        onLoad(locale, translations);
        return;
      }
      if (isDefaultStringRecordExport(translations)) {
        onLoad(locale, translations.default);
        return;
      }

      const importedRecord: EagerTranslations | LazyTranslations =
        translations();
      if (isStringRecord(importedRecord)) {
        onLoad(locale, importedRecord);
        return;
      }
      if (isDefaultStringRecordExport(importedRecord)) {
        onLoad(locale, importedRecord.default);
        return;
      }

      return importedRecord
        .then((record: EagerTranslations): void => {
          if (isDefaultStringRecordExport(record)) {
            onLoad(locale, record.default);
          } else {
            onLoad(locale, record);
          }
        })
        .catch((err: unknown): void => {
          if (typeof onLoadError === 'undefined') {
            throw err;
          }
          onLoadError(locale, err);
        });
    },
    [onLoad, onLoadError, translationsRecord],
  );
}
