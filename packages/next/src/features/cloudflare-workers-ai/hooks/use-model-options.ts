import { useMemo } from 'react';
import type SelectOption from '../../../types/select-option.js';
import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import Model from '../constants/model.js';

export default function useModelOptions(): readonly SelectOption[] {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  return useMemo(
    (): readonly SelectOption[] => [
      {
        label: translate('Automatic speech recognition') ?? '...',
        value: Model.SpeechRecognition,
      },
      {
        label: translate('Embeddings (base)') ?? '...',
        value: Model.TextEmbeddingsBase,
      },
      {
        label: translate('Embeddings (large)') ?? '...',
        value: Model.TextEmbeddingsLarge,
      },
      {
        label: translate('Embeddings (small)') ?? '...',
        value: Model.TextEmbeddingsSmall,
      },
      {
        label: translate('Image classification') ?? '...',
        value: Model.ImageClassification,
      },
      {
        label: translate('Large language model (LLM)') ?? '...',
        value: Model.TextGeneration,
      },
      {
        label: translate('Speech recognition') ?? '...',
        value: Model.SpeechRecognition,
      },
      {
        label: translate('Speech to text') ?? '...',
        value: Model.SpeechRecognition,
      },
      {
        label: translate('Text embeddings (base)') ?? '...',
        value: Model.TextEmbeddingsBase,
      },
      {
        label: translate('Text embeddings (large)') ?? '...',
        value: Model.TextEmbeddingsLarge,
      },
      {
        label: translate('Text embeddings (small)') ?? '...',
        value: Model.TextEmbeddingsSmall,
      },
      {
        label: translate('Text generation') ?? '...',
        value: Model.TextGeneration,
      },
      {
        label: translate('Translation') ?? '...',
        value: Model.Translation,
      },
    ],
    [translate],
  );
}
