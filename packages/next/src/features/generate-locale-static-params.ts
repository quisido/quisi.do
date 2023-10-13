import Locale from '../constants/locale';

interface Params {
  readonly locale: Locale;
}

export default function generateLocaleStaticParams(): readonly Params[] {
  const params: Params[] = [];

  for (const locale of Object.values(Locale)) {
    params.push({
      locale,
    });
  }

  return params;
}
