import { useCallback } from 'react';
import Language from '../../constants/language';
import useLanguage from '../../hooks/use-language';
import useSetLanguage from '../../hooks/use-set-language';
import filterByLanguage from '../../utils/filter-by-language';

interface State {
  readonly language: Language;
  readonly handleChange: (newLanguage: string | undefined) => void;
}

export default function useLanguageSelect(): State {
  const language: Language = useLanguage();
  const setLanguage = useSetLanguage();

  return {
    language,

    handleChange: useCallback(
      (newLanguage: string | undefined): void => {
        if (typeof newLanguage === 'undefined') {
          setLanguage(Language.English);
          return;
        }

        if (!filterByLanguage(newLanguage)) {
          throw new Error(`Expected a language, but received: ${newLanguage}`);
        }

        setLanguage(newLanguage);
      },
      [setLanguage],
    ),
  };
}
