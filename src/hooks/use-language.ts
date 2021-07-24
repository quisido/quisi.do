import type { Dispatch, SetStateAction } from 'react';
import { useCapsule } from 'react-capsule';
import LanguageCapsule from '../capsules/language';
import type Language from '../constants/language';

export default function useLanguage(): [
  Language,
  Dispatch<SetStateAction<Language>>,
] {
  return useCapsule(LanguageCapsule);
}
