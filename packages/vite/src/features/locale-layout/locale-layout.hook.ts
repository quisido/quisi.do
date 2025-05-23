import { useCallback, useMemo } from 'react';
import { default as Locale } from '../../constants/locale.js';
import usePathname from '../../hooks/use-pathname.js';
import useNavigation from '../../hooks/use-navigation.js';

interface State {
  readonly locale: Locale;
  readonly localeContextValue: readonly [Locale, (locale: Locale) => void];
}

export default function useLocaleLayout(locale: Locale): State {
  // Contexts
  const navigate = useNavigation();
  const pathname: string = usePathname();

  // Callacks
  const setLocale = useCallback(
    (newLocale: Locale): void => {
      if (locale === Locale.English) {
        navigate(`/${newLocale}/${pathname}`);
        return;
      }

      const basePathname = pathname.substring(`/${locale}`.length);
      if (newLocale === Locale.English) {
        navigate(basePathname);
        return;
      }

      navigate(`/${newLocale}/${basePathname}`);
    },
    [locale, navigate, pathname],
  );

  return {
    locale,

    localeContextValue: useMemo(
      (): readonly [Locale, (locale: Locale) => void] => [locale, setLocale],
      [locale, setLocale],
    ),
  };
}
