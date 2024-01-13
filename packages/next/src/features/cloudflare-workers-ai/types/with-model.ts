import type Model from '../constants/model.js';

export default interface WithModel<M extends Model, Inputs> {
  readonly model: M;
  readonly inputs: Inputs;
}
