import { useContext } from 'react';
import TranslateFunctionContext from '../contexts/translate-function';
import TranslateFunctionType from '../types/translate-function';

export default function useTranslate(): TranslateFunctionType {
  return useContext(TranslateFunctionContext);
}
