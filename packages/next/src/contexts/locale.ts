'use client';

import type { Provider } from 'react';
import type Locale from '../constants/locale';
import createContextUtils from '../utils/create-context-utils';

const { ContextProvider, useContextValue } =
  createContextUtils<readonly [Locale, (locale: Locale) => void]>();

export const LocaleProvider: Provider<
  readonly [Locale, (locale: Locale) => void]
> = ContextProvider;

export const useLocale: () => readonly [Locale, (locale: Locale) => void] =
  useContextValue;
