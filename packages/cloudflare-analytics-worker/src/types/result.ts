import type ResultData from './result-data';

export default interface Result {
  readonly data: ResultData;
  readonly errors: unknown; // null
}
