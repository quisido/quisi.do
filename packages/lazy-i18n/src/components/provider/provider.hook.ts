'use client';

import type { MutableRefObject } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import mapTranslationsRecordToLoadedTranslationsRecord from '../../map/map-translations-record-to-loaded-translations-record.js';
import RunnableTranslateFunction from '../../runnables/runnable-translate-function.js';
import type TranslateFunction from '../../types/translate-function.js';
import type { Translations } from '../../types/translations.js';
import handleNotFound from '../../utils/handle-not-found.js';
import useLoadTranslations from './hooks/use-load-translations.js';

type LoadedTranslationsRecord<K extends number | string | symbol> = Record<
  K,
  Record<string, string> | undefined
>;

export interface Props<T extends Record<string, Translations | undefined>> {
  readonly fallbackLocale?: keyof T | undefined;
  readonly locale: keyof T;
  readonly onLoadError?: ((locale: keyof T, err: unknown) => void) | undefined;
  readonly translationsRecord: T;
}

export interface State {
  translate: TranslateFunction;
  asyncLoadTranslationsEffect: MutableRefObject<Promise<unknown> | undefined>;
  asyncLoadFallbackTranslationsEffect: MutableRefObject<
    Promise<unknown> | undefined
  >;
}

export default function useProvider<
  T extends Record<string, Translations | undefined>,
>({
  fallbackLocale,
  locale,
  onLoadError,
  translationsRecord,
}: Props<T>): State {
  if (typeof translationsRecord[locale] === 'undefined') {
    throw new Error(`Translations do not exist for locale: ${String(locale)}`);
  }

  if (
    typeof fallbackLocale === 'string' &&
    typeof translationsRecord[fallbackLocale] === 'undefined'
  ) {
    throw new Error(
      `Translations do not exist for fallback locale: ${fallbackLocale}`,
    );
  }

  const asyncLoadFallbackTranslationsEffect: MutableRefObject<
    Promise<unknown> | undefined
  > = useRef();

  const asyncLoadTranslationsEffect: MutableRefObject<
    Promise<unknown> | undefined
  > = useRef();

  const [loadedTranslationsRecord, setLoadedTranslationsRecord] = useState(
    (): LoadedTranslationsRecord<keyof T> =>
      mapTranslationsRecordToLoadedTranslationsRecord(translationsRecord),
  );

  const loadTranslations = useLoadTranslations({
    onLoadError,
    translationsRecord,
    onLoad: useCallback(
      (newLocale: keyof T, newTranslations: Record<string, string>): void => {
        setLoadedTranslationsRecord(
          (
            oldLoadedTranslationsRecord: LoadedTranslationsRecord<keyof T>,
          ): LoadedTranslationsRecord<keyof T> => ({
            ...oldLoadedTranslationsRecord,
            [newLocale]: newTranslations,
          }),
        );
      },
      [],
    ),
  });

  const handleLoadFallbackTranslations = useCallback(
    (str: string): void => {
      if (typeof fallbackLocale === 'undefined') {
        throw new Error(`Translation not found: ${str}`);
      }
      asyncLoadFallbackTranslationsEffect.current =
        loadTranslations(fallbackLocale);
    },
    [fallbackLocale, loadTranslations],
  );

  const handleLoadTranslations = useCallback((): void => {
    asyncLoadTranslationsEffect.current = loadTranslations(locale);
  }, [loadTranslations, locale]);

  const loadedFallbackTranslations: Record<string, string> | undefined =
    typeof fallbackLocale === 'undefined'
      ? undefined
      : loadedTranslationsRecord[fallbackLocale];
  const loadedTranslations: Record<string, string> | undefined =
    loadedTranslationsRecord[locale];
  return {
    asyncLoadFallbackTranslationsEffect,
    asyncLoadTranslationsEffect,

    translate: useMemo((): TranslateFunction => {
      const newTranslate: RunnableTranslateFunction =
        new RunnableTranslateFunction({
          fallbackTranslations: loadedFallbackTranslations,
          translations: loadedTranslations,
        });
      newTranslate.on(
        'loadFallbackTranslations',
        handleLoadFallbackTranslations,
      );
      newTranslate.on('loadTranslations', handleLoadTranslations);
      newTranslate.on('notFound', handleNotFound);
      return newTranslate.run.bind(newTranslate);
    }, [
      handleLoadFallbackTranslations,
      handleLoadTranslations,
      loadedFallbackTranslations,
      loadedTranslations,
    ]),
  };
}
