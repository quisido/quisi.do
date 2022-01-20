import useParamsMemo from 'use-params-memo';
import useLanguage from '../../hooks/use-language';
import mapLanguageToLocale from '../../utils/map-language-to-locale';

interface State {
  readonly locale: string;
}

export default function useNumberFormat(): State {
  const [language] = useLanguage();

  return {
    locale: useParamsMemo(mapLanguageToLocale, [language]),
  };
}
