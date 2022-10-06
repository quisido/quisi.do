import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import type Language from '../constants/language';
import LanguageContext from '../contexts/language';

export default function useLanguage(): [
  Language,
  Dispatch<SetStateAction<Language>>,
] {
  return useContext(LanguageContext);
}
