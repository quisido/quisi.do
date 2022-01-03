import useParamsMemo from 'use-params-memo';
import type Language from '../../constants/language';
import useLanguage from '../../hooks/use-language';
import mapLanguageToLocale from '../../utils/map-language-to-locale';

interface State {
  readonly locale: string;
}

export default function useNumberFormat(): State {
  const language: Language = useLanguage();

  return {
    locale: useParamsMemo(mapLanguageToLocale, [language]),
  };
}
