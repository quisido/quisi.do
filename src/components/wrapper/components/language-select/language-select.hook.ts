import { useCallback } from 'react';
import Language from '../../../../constants/language';
import useLanguage from '../../../../hooks/use-language';
import filterByLanguage from '../../../../utils/filter-by-language';
import filterByUndefined from '../../../../utils/filter-by-undefined';

interface State {
  readonly language: Language;
  readonly handleChange: (newLanguage: string | undefined) => void;
}

export default function useWrapperLanguageSelect(): State {
  const [language, setLanguage] = useLanguage();

  return {
    language,

    handleChange: useCallback(
      (newLanguage: string | undefined): void => {
        if (filterByUndefined(newLanguage)) {
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
