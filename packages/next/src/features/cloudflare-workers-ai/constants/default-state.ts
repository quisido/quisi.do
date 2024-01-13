import type ModelState from '../types/model-state.js';
import Language from './language.js';
import Model from './model.js';

export default {
  model: Model.Translation,
  inputs: {
    source_lang: Language.English,
    target_lang: Language.French,
    text: '',
  },
} satisfies ModelState;
