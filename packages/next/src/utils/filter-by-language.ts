import Language from '../constants/language';

const LANGUAGES: Set<unknown> = new Set(Object.values(Language));

export default function filterByLanguage(value: unknown): value is Language {
  return LANGUAGES.has(value);
}
