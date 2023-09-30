import Locale from '../../constants/locale';

const mapLocaleToParams = (locale: Locale): Record<'locale', string> => ({
  locale,
});

export function generateStaticParams(): readonly Record<'locale', string>[] {
  return Object.values(Locale).map(mapLocaleToParams);
}

export { default } from '../../features/home';
