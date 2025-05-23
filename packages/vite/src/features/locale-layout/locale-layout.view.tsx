import { I18nProvider } from 'lazy-i18n';
import { type PropsWithChildren, type ReactElement } from 'react';
import { default as Locale } from '../../constants/locale.js';
import TRANSLATIONS from '../../constants/translations.js';
import { LocaleProvider } from '../../contexts/locale.js';
import useLocaleLayout from './locale-layout.hook.js';

/**
 * The `[locale]` layout wraps all content in <body>.
 */

interface Props {
  readonly locale: Locale;
}

export default function LocaleLayout({
  children,
  locale,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  const { localeContextValue } = useLocaleLayout(locale);

  return (
    <LocaleProvider value={localeContextValue}>
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
