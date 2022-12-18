import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import Language from '../constants/language';

const LanguageContext = createContext<
  [Language, Dispatch<SetStateAction<Language>>] | null
>(null);

export default LanguageContext;
