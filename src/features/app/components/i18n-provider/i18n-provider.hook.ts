import type Language from '../../../../constants/language';
import useLanguage from '../../../../hooks/use-language';

interface State {
  readonly language: Language;
}

export default function useI18nProvider(): State {
  const [language] = useLanguage();

  return {
    language,
  };
}
