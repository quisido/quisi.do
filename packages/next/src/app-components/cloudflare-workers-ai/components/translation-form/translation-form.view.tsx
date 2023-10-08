import { ReactElement } from 'react';
import { MetaM2m10012b } from '../../types/inputs';
import useTranslationForm from './translation-form.hook';
import Select from '../../../../components/select';
import Div from '../../../../components/div';
import Input from '../../../../components/input';

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
