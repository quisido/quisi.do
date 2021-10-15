import type Language from '../../constants/language';
import useLanguage from '../../hooks/use-language';

interface State {
  readonly language: Language;
}

export default function useAppMain(): State {
  return {
    language: useLanguage(),
  };
}
