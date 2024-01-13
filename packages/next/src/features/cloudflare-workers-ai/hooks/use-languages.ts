import { useMemo } from 'react';
import type SelectOption from '../../../types/select-option.js';
import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import Language from '../constants/language.js';

export default function useLanguages(): readonly SelectOption[] {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): readonly SelectOption[] => [
      {
        label: translate('English') ?? 'English',
        value: Language.English,
      },
      {
        label: translate('French') ?? 'French',
        value: Language.French,
      },
      {
        label: translate('Japanese') ?? 'Japanese',
        value: Language.Japanese,
      },
    ],
    [translate],
  );
}
