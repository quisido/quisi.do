import { I18nProvider } from 'lazy-i18n';
import { type ReactElement } from 'react';
import { default as Locale, validateLocale } from '../../constants/locale';
import TRANSLATIONS from '../../constants/translations';
import { LocaleProvider } from '../../contexts/locale';
import type NextLayoutProps from '../../types/next-layout-props';

/**
 * The `[locale]` layout wraps all content in <body>.
 */

interface Params {
  readonly locale: string;
}

const mapParamsToLocale = ({ locale }: Readonly<Params>): Locale =>
  validateLocale(locale);

export default function LocaleLayout({
  children,
  params,
}: Readonly<NextLayoutProps<Params>>): ReactElement {
  const locale: Locale = mapParamsToLocale(params);

  return (
    <LocaleProvider value={locale}>
      <I18nProvider
        fallbackLocale={Locale.English}
        locale={locale}
        translations={TRANSLATIONS}
      >
        {children}
      </I18nProvider>
    </LocaleProvider>
  );
}
