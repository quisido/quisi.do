import type Viewer from './viewer.js';

export default interface ResultData {
  readonly cost: number;
  readonly viewer: Viewer;
}
