import { I18nProvider } from 'lazy-i18n';
import { type PropsWithChildren, type ReactElement, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { default as Locale } from '../../constants/locale.js';
import { TRANSLATIONS } from '../../constants/translations.js';
import { LocaleProvider } from '../../contexts/locale.js';
import initI18next from '../../i18n.js';
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

  const i18n = useMemo((): ReturnType<typeof initI18next> => {
    const instance = initI18next(locale);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (instance.isInitialized && instance.language !== locale) {
      void instance.changeLanguage(locale);
    }
    return instance;
  }, [locale]);

  return (
    <LocaleProvider value={localeContextValue}>
      <I18nextProvider i18n={i18n}>
        <I18nProvider
          fallbackLocale={Locale.English}
          locale={locale}
          translations={TRANSLATIONS}
        >
          {children}
        </I18nProvider>
      </I18nextProvider>
    </LocaleProvider>
  );
}
