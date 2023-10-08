import type Inputs from './inputs';
import WithModel from './with-model';

type ModelState = ModelStates[keyof Inputs];

type ModelStates = {
  [M in keyof Inputs]: WithModel<M, Inputs[M]>;
};

export default ModelState;
