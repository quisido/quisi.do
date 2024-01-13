import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import useModelOptions from '../../hooks/use-model-options.js';
import type SelectOption from '../../../../types/select-option.js';
import useEffectEvent from '../../../../hooks/use-effect-event.js';
import Model, { isModel } from '../../constants/model.js';

interface Props {
  readonly onModelChange: (model: Model) => void;
}

interface State {
  readonly handleModelChange: (model: string | undefined) => void;
  readonly modelLabel: string | undefined;
  readonly modelOptions: readonly SelectOption[];
}

export default function useCloudflareWorkersAiSubheader({
  onModelChange,
}: Props): State {
  const translate: TranslateFunction = useTranslate();

  return {
    modelLabel: translate('Select a model.'),
    modelOptions: useModelOptions(),

    handleModelChange: useEffectEvent(
      (model: string = Model.ImageClassification): void => {
        if (!isModel(model)) {
          throw new Error(`Expected a model, but received ${model}.`);
        }

        onModelChange(model);
      },
    ),
  };
}
