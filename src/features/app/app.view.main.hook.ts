import type Language from '../../constants/language';
import useDarkMode from '../../hooks/use-dark-mode';
import useLanguage from '../../hooks/use-language';

interface State {
  readonly isDarkModeEnabled: boolean;
  language: Language;
}

export default function useAppMain(): State {
  return {
    isDarkModeEnabled: useDarkMode(),
    language: useLanguage(),
  };
}
