'use client';

import {
  type ComponentType, type ReactElement,
  type ReactNode
} from 'react';
import Loading from '../../components/loading/index.js';
import LoadingComponentContext from '../../contexts/loading-component.js';
import TranslateFunctionContext from '../../contexts/translate-function.js';
import type { Translations } from '../../types/translations.js';
import useProvider from './provider.hook.js';

interface Props<T extends Record<string, Translations | undefined>> {
  readonly children?: ReactNode;
  readonly fallbackLocale?: keyof T | undefined;
  readonly LoadingComponent?: ComponentType<unknown>;
  readonly locale: keyof T;
  readonly onLoadError?: ((locale: keyof T, err: unknown) => void) | undefined;
  readonly translations: T;
}

function I18nProvider<T extends Record<string, Translations | undefined>>({
  children,
  fallbackLocale,
  LoadingComponent,
  locale,
  onLoadError,
  translations: translationsRecord,
}: Props<T>): ReactElement {
  const { translate } = useProvider({
    fallbackLocale,
    locale,
    onLoadError,
    translationsRecord,
  });

  return (
    <LoadingComponentContext.Provider value={LoadingComponent ?? Loading}>
      <TranslateFunctionContext.Provider value={translate}>
        {children}
      </TranslateFunctionContext.Provider>
    </LoadingComponentContext.Provider>
  );
}

export default I18nProvider;
