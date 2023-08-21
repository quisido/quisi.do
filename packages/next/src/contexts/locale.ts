'use client';

import type { Provider } from 'react';
import type Locale from '../constants/locale';
import createContextUtils from '../utils/create-context-utils';

const { ContextProvider, useContextValue } = createContextUtils<Locale>();

export const LocaleProvider: Provider<Locale> = ContextProvider;
export const useLocale: () => Locale = useContextValue;
