'use client';

import { usePathname, useRouter } from 'next/navigation.js';
import { useCallback, useMemo } from 'react';
import { default as Locale, validateLocale } from '../../constants/locale.js';
import type Params from './types/params.js';

interface Props {
  readonly params: Params;
}

interface State {
  readonly locale: Locale;
  readonly localeContextValue: readonly [Locale, (locale: Locale) => void];
}

const mapParamsToLocale = ({ locale: localeParam }: Readonly<Params>): Locale =>
  validateLocale(localeParam);

export default function useLocaleLayout({ params }: Props): State {
  const locale: Locale = mapParamsToLocale(params);

  // Contexts
  const router = useRouter();
  const pathname: string = usePathname();

  // Callacks
  const setLocale = useCallback(
    (newLocale: Locale): void => {
      if (locale === Locale.English) {
        router.push(`/${newLocale}/${pathname}`);
        return;
      }

      const basePathname = pathname.substring(`/${locale}`.length);
      if (newLocale === Locale.English) {
        router.push(basePathname);
        return;
      }

      router.push(`/${newLocale}/${basePathname}`);
    },
    [locale, pathname, router],
  );

  return {
    locale,

    localeContextValue: useMemo(
      (): readonly [Locale, (locale: Locale) => void] => [locale, setLocale],
      [locale, setLocale],
    ),
  };
}
