import type Model from '../constants/model';

export default interface WithModel<M extends Model, Inputs> {
  readonly model: M;
  readonly inputs: Inputs;
}
