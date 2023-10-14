'use client';

import { usePathname, useRouter } from 'next/navigation.js';
import { useMemo } from 'react';
import { default as Locale, validateLocale } from '../../constants/locale';
import useEffectEvent from '../../hooks/use-effect-event';
import type Params from './types/params';

interface Props {
  readonly params: Params;
}

interface State {
  readonly locale: Locale;
  readonly localeContextValue: readonly [Locale, (locale: Locale) => void];
}

const mapParamsToLocale = ({
  locale: localeParam,
}: Readonly<Params>): Locale => {
  const locale: Locale = validateLocale(localeParam);

  if (locale === Locale.English) {
    throw new Error('Did not expect the locale parameter to be English.');
  }

  return locale;
};

export default function useLocaleLayout({ params }: Props): State {
  const locale: Locale = mapParamsToLocale(params);

  // Contexts
  const router = useRouter();
  const pathname: string = usePathname();

  // Callacks
  const setLocale = useEffectEvent((newLocale: Locale): void => {
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
  });

  return {
    locale,

    localeContextValue: useMemo(
      (): readonly [Locale, (locale: Locale) => void] => [locale, setLocale],
      [locale, setLocale],
    ),
  };
}
