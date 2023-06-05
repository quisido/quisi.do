type AsyncState<T> =
  | ErrorAsyncState
  | LoadingAsyncState<T>
  | SuccessAsyncState<T>
  | UninitiatedAsyncState;

export type { AsyncState as default };

interface ErrorAsyncState {
  readonly data: null;
  readonly error: string;
  readonly initiated: true;
  readonly loading: false;
}

interface LoadingAsyncState<T> {
  readonly data: T | null;
  readonly error: string | null;
  readonly initiated: true;
  readonly loading: true;
}

interface SuccessAsyncState<T> {
  readonly data: T;
  readonly error: null;
  readonly initiated: true;
  readonly loading: false;
}

interface UninitiatedAsyncState {
  readonly data: null;
  readonly error: null;
  readonly initiated: false;
  readonly loading: false;
}
