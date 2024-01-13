import { type ReactElement } from 'react';
import { type MetaM2m10012b } from '../../types/inputs.js';
import useTranslationForm from './translation-form.hook.js';
import Select from '../../../../components/select/index.js';
import Div from '../../../../components/div/index.js';
import Input from '../../../../components/input/index.js';

interface Props {
  readonly inputs: MetaM2m10012b;
  readonly onChange: (inputs: MetaM2m10012b) => void;
}

export default function TranslationForm({
  inputs,
  onChange,
}: Props): ReactElement {
  const {
    handleSourceLanguageChange,
    handleTargetLanguageChange,
    handleTextChange,
    languages,
    sourceLanguage,
    sourceLanguageLabel,
    targetLanguage,
    targetLanguageLabel,
    text,
  } = useTranslationForm({
    inputs,
    onChange,
  });

  return (
    <>
      <Div display="flex" flexDirection="row" justifyContent="space-around">
        <Select
          label={sourceLanguageLabel}
          labelDirection="column"
          onChange={handleSourceLanguageChange}
          options={languages}
          value={sourceLanguage}
        />

        <Select
          label={targetLanguageLabel}
          labelDirection="column"
          onChange={handleTargetLanguageChange}
          options={languages}
          value={targetLanguage}
        />
      </Div>

      <Input
        autoComplete={false}
        onChange={handleTextChange}
        placeholder="text"
        value={text}
      />
    </>
  );
}
