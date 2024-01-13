import type Inputs from './inputs.js';
import type WithModel from './with-model.js';

type ModelState = ModelStates[keyof Inputs];

type ModelStates = {
  [M in keyof Inputs]: WithModel<M, Inputs[M]>;
};

export default ModelState;
