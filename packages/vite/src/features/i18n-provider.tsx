import { I18nProvider as LazyI18nProvider } from 'lazy-i18n';
import { type PropsWithChildren, type ReactElement, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { TRANSLATIONS } from '../constants/translations.js';
import i18next, { type i18n, type ResourceLanguage } from 'i18next';
import Locale from '../constants/locale.js';
import useLocale from '../hooks/use-locale.js';
import enUs from '../translations/index--en-US.json';

const RESOURCES: Record<Locale, ResourceLanguage> = {
  [Locale.Arabic]: { index: {} },
  [Locale.English]: { index: enUs },
  [Locale.Spanish]: { index: {} },
  [Locale.Filipino]: { index: {} },
  [Locale.Japanese]: { index: {} },
};

const REACT_I18N: i18n = i18next.use(initReactI18next);

const initReactI18n = async (locale: Locale): Promise<void> => {
  await REACT_I18N.init({
    defaultNS: 'index',
    fallbackLng: Locale.English,
    interpolation: {
      escapeValue: false,
    },
    lng: locale,
    resources: RESOURCES,
    supportedLngs: Object.values(Locale),
  });
};

export default function I18nProvider({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const [locale, setLocale] = useLocale();

  useEffect((): void => {
    const handleError = (err: unknown): void => {
      // If the English locale failed to initialize, I guess we give up.
      if (locale === Locale.English) {
        window.console.error(`Failed to initialize i18next for English.`, err);
        return;
      }

      // If a non-English locale failed to initialize, fallback to English.
      window.console.error(
        `Failed to initialize i18next for language "${locale}".`,
        err,
      );
      setLocale(Locale.English);
    };

    if (REACT_I18N.isInitialized || REACT_I18N.isInitializing) {
      void REACT_I18N.changeLanguage(locale).catch(handleError);
    } else {
      void initReactI18n(locale).catch(handleError);
    }
  }, [locale, setLocale]);

  return (
    <I18nextProvider i18n={REACT_I18N}>
      <LazyI18nProvider
        fallbackLocale={Locale.English}
        locale={locale}
        translations={TRANSLATIONS}
      >
        {children}
      </LazyI18nProvider>
    </I18nextProvider>
  );
}
