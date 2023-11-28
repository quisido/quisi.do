import { useContext } from 'react';
import TranslateFunctionContext from '../contexts/translate-function.js';
import type TranslateFunction from '../types/translate-function.js';

export default function useTranslate(): TranslateFunction {
  return useContext(TranslateFunctionContext);
}
