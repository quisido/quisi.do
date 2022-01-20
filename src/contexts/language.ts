import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';
import Language from '../constants/language';
import noop from '../utils/noop';

const LanguageContext = createContext<
  [Language, Dispatch<SetStateAction<Language>>]
>([Language.English, noop]);

export default LanguageContext;
