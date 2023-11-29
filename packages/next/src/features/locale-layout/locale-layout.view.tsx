'use client';

import { I18nProvider } from 'lazy-i18n';
import { type ReactElement } from 'react';
import { default as Locale } from '../../constants/locale';
import TRANSLATIONS from '../../constants/translations';
import { LocaleProvider } from '../../contexts/locale';
import type NextLayoutProps from '../../types/next-layout-props';
import Wrapper from '../wrapper';
import useLocaleLayout from './locale-layout.hook';
import type Params from './types/params';

/**
 * The `[locale]` layout wraps all content in <body>.
 */

export default function LocaleLayout({
  children,
  params,
}: Readonly<NextLayoutProps<Params>>): ReactElement {
  const { locale, localeContextValue } = useLocaleLayout({
    params,
  });

  return (
    <LocaleProvider value={localeContextValue}>
      <I18nProvider
        fallbackLocale={Locale.English}
        locale={locale}
        translations={TRANSLATIONS}
      >
        <Wrapper>{children}</Wrapper>
      </I18nProvider>
    </LocaleProvider>
  );
}
