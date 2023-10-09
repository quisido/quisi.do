import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import useEffectEvent from '../../../../hooks/use-effect-event';
import type SelectOption from '../../../../types/select-option';
import type Language, { isLanguage } from '../../constants/language';
import useLanguages from '../../hooks/use-languages';
import { type MetaM2m10012b } from '../../types/inputs';

interface Props {
  readonly inputs: MetaM2m10012b;
  readonly onChange: (inputs: MetaM2m10012b) => void;
}

interface State {
  readonly handleSourceLanguageChange: (language: string | undefined) => void;
  readonly handleTargetLanguageChange: (language: string | undefined) => void;
  readonly handleTextChange: (text: string) => void;
  readonly languages: readonly SelectOption[];
  readonly sourceLanguage: Language;
  readonly sourceLanguageLabel: string | undefined;
  readonly targetLanguage: Language;
  readonly targetLanguageLabel: string | undefined;
  readonly text: string;
}

export default function useTranslationForm({ inputs, onChange }: Props): State {
  const translate: TranslateFunction = useTranslate();

  return {
    languages: useLanguages(),
    sourceLanguage: inputs.source_lang,
    sourceLanguageLabel: translate('Source language'),
    targetLanguage: inputs.target_lang,
    targetLanguageLabel: translate('Target language'),
    text: inputs.text,

    handleSourceLanguageChange: useEffectEvent(
      (value: string | undefined): void => {
        if (!isLanguage(value)) {
          throw new Error(
            `Expected a language, but received ${typeof value} ${JSON.stringify(
              value,
            )}.`,
          );
        }

        onChange({
          ...inputs,
          source_lang: value,
        });
      },
    ),

    handleTargetLanguageChange: useEffectEvent(
      (value: string | undefined): void => {
        if (!isLanguage(value)) {
          throw new Error(
            `Expected a language, but received ${typeof value} ${JSON.stringify(
              value,
            )}.`,
          );
        }

        onChange({
          ...inputs,
          target_lang: value,
        });
      },
    ),

    handleTextChange: useEffectEvent((text: string): void => {
      onChange({
        ...inputs,
        text,
      });
    }),
  };
}
