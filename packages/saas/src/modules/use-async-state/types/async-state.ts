interface ErrorAsyncState {
  readonly data: undefined;
  readonly error: string;
  readonly initiated: true;
  readonly loading: false;
}

interface LoadingAsyncState<T> {
  readonly data: T | undefined;
  readonly error: string | undefined;
  readonly initiated: true;
  readonly loading: true;
}

interface SuccessAsyncState<T> {
  readonly data: T;
  readonly error: undefined;
  readonly initiated: true;
  readonly loading: false;
}

interface UninitiatedAsyncState {
  readonly data: undefined;
  readonly error: undefined;
  readonly initiated: false;
  readonly loading: false;
}

type AsyncState<T> =
  | ErrorAsyncState
  | LoadingAsyncState<T>
  | SuccessAsyncState<T>
  | UninitiatedAsyncState;

export type { AsyncState as default };
