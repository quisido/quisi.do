import Language from '../constants/language';
import Model from '../constants/model';
import  type Inputs, {
  type type BaaiBgeEnV15,
  type type HuggingfaceDistilbertSst2Int8,
  type type MetaLlama27bChatInt8,
  type type MetaM2m10012b,
  type type MicrosoftResnet50,
  type type OpenaiWhisper,
} from '../types/inputs';

export default function mapModelToInitialInputs(
  model: Model.ImageClassification,
): MicrosoftResnet50;
export default function mapModelToInitialInputs(
  model: Model.SpeechRecognition,
): OpenaiWhisper;
export default function mapModelToInitialInputs(
  model: Model.TextClassification,
): HuggingfaceDistilbertSst2Int8;
export default function mapModelToInitialInputs(
  model:
    | Model.TextEmbeddingsBase
    | Model.TextEmbeddingsLarge
    | Model.TextEmbeddingsSmall,
): BaaiBgeEnV15;
export default function mapModelToInitialInputs(
  model: Model.TextGeneration,
): MetaLlama27bChatInt8;
export default function mapModelToInitialInputs(
  model: Model.Translation,
): MetaM2m10012b;
export default function mapModelToInitialInputs(
  model: keyof Inputs,
): Inputs[keyof Inputs];
export default function mapModelToInitialInputs(
  model: keyof Inputs,
): Inputs[keyof Inputs] {
  switch (model) {
    case Model.ImageClassification:
      return {
        image: [],
      } satisfies Inputs[Model.ImageClassification];

    case Model.SpeechRecognition:
      return {
        audio: [],
      } satisfies Inputs[Model.SpeechRecognition];

    case Model.TextClassification:
      return {
        text: '',
      } satisfies Inputs[Model.TextClassification];

    case Model.TextEmbeddingsBase:
    case Model.TextEmbeddingsLarge:
    case Model.TextEmbeddingsSmall:
      return {
        text: [],
      } satisfies Inputs[
        | Model.TextEmbeddingsBase
        | Model.TextEmbeddingsLarge
        | Model.TextEmbeddingsSmall];

    case Model.TextGeneration:
      return {
        messages: [],
      } satisfies Inputs[Model.TextGeneration];

    case Model.Translation:
      return {
        source_lang: Language.English,
        target_lang: Language.French,
        text: '',
      } satisfies Inputs[Model.Translation];
  }
}
