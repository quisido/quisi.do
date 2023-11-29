import Model from '../constants/model';
import type State from '../types/state';

export default function isRunnable(state: State): boolean {
  switch (state.model) {
    case Model.ImageClassification:
      return state.inputs.image.length > 0;

    case Model.SpeechRecognition:
      return state.inputs.audio.length > 0;

    case Model.TextClassification:
    case Model.TextEmbeddingsBase:
    case Model.TextEmbeddingsLarge:
    case Model.TextEmbeddingsSmall:
    case Model.Translation:
      return state.inputs.text.length > 0;

    case Model.TextGeneration: {
      if ('messages' in state.inputs) {
        return state.inputs.messages.length > 0;
      }
      return state.inputs.prompt.length > 0;
    }
  }
}
