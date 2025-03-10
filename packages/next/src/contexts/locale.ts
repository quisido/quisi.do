import type Locale from '../constants/locale.js';
import createContextUtils from '../utils/create-context-utils/index.js';

export const { ContextProvider: LocaleProvider, useContextValue: useLocale } =
  createContextUtils<readonly [Locale, (locale: Locale) => void]>();
