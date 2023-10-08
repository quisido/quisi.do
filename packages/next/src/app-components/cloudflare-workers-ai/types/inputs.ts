import type Language from '../constants/language';
import type Model from '../constants/model';

export interface BaaiBgeEnV15 {
  readonly text: string | readonly string[];
}

export interface HuggingfaceDistilbertSst2Int8 {
  readonly text: string;
}

export type MetaLlama27bChatInt8 =
  | {
      readonly messages: readonly MetaLlama27bChatInt8Message[];
    }
  | {
      readonly prompt: string;
    };

interface MetaLlama27bChatInt8Message {
  readonly content: string;
  readonly role: 'system' | 'user';
}

export interface MetaM2m10012b {
  readonly source_lang: Language;
  readonly target_lang: Language;
  readonly text: string;
}

export interface MicrosoftResnet50 {
  readonly image: readonly string[];
}

export interface OpenaiWhisper {
  readonly audio: readonly string[];
}

export default interface Inputs {
  readonly [Model.ImageClassification]: MicrosoftResnet50;
  readonly [Model.SpeechRecognition]: OpenaiWhisper;
  readonly [Model.TextClassification]: HuggingfaceDistilbertSst2Int8;
  readonly [Model.TextEmbeddingsBase]: BaaiBgeEnV15;
  readonly [Model.TextEmbeddingsLarge]: BaaiBgeEnV15;
  readonly [Model.TextEmbeddingsSmall]: BaaiBgeEnV15;
  readonly [Model.TextGeneration]: MetaLlama27bChatInt8;
  readonly [Model.Translation]: MetaM2m10012b;
}
