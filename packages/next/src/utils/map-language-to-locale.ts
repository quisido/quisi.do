import Language from '../constants/language';

export default function mapLanguageToLocale(language: Language): string {
  switch (language) {
    case Language.Arabic:
      return 'ar-EG';
    case Language.Cebuano:
      return 'tl-PH';
    case Language.English:
      return 'en-US';
    case Language.Japanese:
      return 'ja-JP';
  }
}
