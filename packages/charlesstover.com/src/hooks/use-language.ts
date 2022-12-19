import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import type Language from '../constants/language';
import LanguageContext from '../contexts/language';

const MISSING_LANGUAGE_CONTEXT_ERROR: Error = new Error(
  'Expected the language context to be provided.',
);

export default function useLanguage(): [
  Language,
  Dispatch<SetStateAction<Language>>,
] {
  const language: [Language, Dispatch<SetStateAction<Language>>] | null =
    useContext(LanguageContext);

  if (language === null) {
    throw MISSING_LANGUAGE_CONTEXT_ERROR;
  }

  return language;
}
