import Locale from '../constants/locale.js';
import usePathname from '../hooks/use-pathname.js';
import { useCallback, useMemo } from 'react';
import useNavigation from './use-navigation.js';

export default function useLocale(): readonly [
  Locale,
  (locale: Locale) => void,
] {
  // Contexts
  const navigate = useNavigation();
  const pathname: string = usePathname();

  // States
  const locale: Locale = useMemo((): Locale => {
    for (const localeValue of Object.values(Locale)) {
      if (!pathname.startsWith(`/${localeValue}/`)) {
        continue;
      }

      return localeValue;
    }

    return Locale.English;
  }, [pathname]);

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

  return [locale, setLocale];
}
