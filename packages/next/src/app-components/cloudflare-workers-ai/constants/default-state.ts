import type ModelState from '../types/model-state';
import Language from './language';
import Model from './model';

export default {
  model: Model.Translation,
  inputs: {
    source_lang: Language.English,
    target_lang: Language.French,
    text: '',
  },
} satisfies ModelState;
