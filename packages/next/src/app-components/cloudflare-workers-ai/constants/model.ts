import createEnumUtils from '../../../utils/create-enum-utils';

enum Model {
  ImageClassification = '@cf/microsoft/resnet-50',
  SpeechRecognition = '@cf/openai/whisper',
  TextClassification = '@cf/huggingface/distilbert-sst-2-int8',
  TextEmbeddingsBase = '@cf/baai/bge-base-en-v1.5',
  TextEmbeddingsLarge = '@cf/baai/bge-large-en-v1.5',
  TextEmbeddingsSmall = '@cf/baai/bge-small-en-v1.5',
  TextGeneration = '@cf/meta/llama-2-7b-chat-int8',
  Translation = '@cf/meta/m2m100-1.2b',
}

export default Model;

const { isType } = createEnumUtils(Model, 'a Cloudflare Workers AI model');
export const isModel = isType;
