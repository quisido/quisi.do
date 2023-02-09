import type Viewer from './viewer';

export default interface ResultData {
  readonly cost: number;
  readonly viewer: Viewer;
}
