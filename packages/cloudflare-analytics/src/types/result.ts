import type ResultData from './result-data.js';

export default interface Result {
  readonly data: ResultData;
  readonly errors: unknown; // null
}
