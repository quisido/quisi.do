import { Context, createContext } from 'react';
import TranslateFunctionType from '../types/translate-function';
import defaultTranslateFunction from '../utils/default-translate-function';

const TranslateFunction: Context<TranslateFunctionType> = createContext<TranslateFunctionType>(
  defaultTranslateFunction,
);
export default TranslateFunction;
