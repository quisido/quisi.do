import type { FunctionComponent } from 'react';
import type {
  OpaqueRoot,
  RootTag,
  SuspenseHydrationCallbacks,
  TransitionTracingCallbacks,
} from 'react-reconciler';
import QuisidoReconciler, {
  type SuspenseInstance,
} from './quisido-reconciler.js';

interface Options {
  readonly cancelTimeout: (id: number) => void;
  readonly Game: FunctionComponent;
  readonly scheduleTimeout: (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined,
  ) => number;
  readonly seed: number;
  readonly timestamp: number;
}

interface State {
  readonly seed: number;
  readonly timestamp: number;
}

const CONCURRENT_UPDATES_BY_DEFAULT_OVERRIDE: null | boolean = null;

const HYDRATION_CALLBACKS: null | SuspenseHydrationCallbacks<SuspenseInstance> =
  null;

const IDENTIFIER_PREFIX = 'quisido';

// AI says: 0 = LegacyRoot, 1 = BlockingRoot, 2 = ConcurrentRoot
const TAG: RootTag = 0;

const TRANSITION_TRACING_CALLBACKS: null | TransitionTracingCallbacks = null;

export default class QuisidoGame<Props, Type> {
  readonly #Game: FunctionComponent;
  readonly #reconciler: QuisidoReconciler<Props, Type>;
  readonly #seed: number;
  readonly #timestamp: number;

  public constructor({
    cancelTimeout,
    Game,
    scheduleTimeout,
    seed,
    timestamp,
  }: Options) {
    this.#reconciler = new QuisidoReconciler<Props, Type>({
      cancelTimeout,
      scheduleTimeout,
    });
    this.#Game = Game;
    this.#seed = seed;
    this.#timestamp = timestamp;
  }

  public dispatch(_type: string, _payload: unknown): void {
    throw new Error(
      `Dispatch is not implemented in ${JSON.stringify(this.toJSON())}`,
    );
  }

  public start(
    canvas: HTMLCanvasElement,
    onError: (error: Error) => void,
    callback?: (() => void) | undefined,
  ): void {
    const container: OpaqueRoot = this.#reconciler.createContainer(
      canvas,
      TAG,
      HYDRATION_CALLBACKS,
      true,
      CONCURRENT_UPDATES_BY_DEFAULT_OVERRIDE,
      IDENTIFIER_PREFIX,
      onError,
      TRANSITION_TRACING_CALLBACKS,
    );

    const Game: FunctionComponent = this.#Game;
    this.#reconciler.updateContainer(<Game />, container, null, callback);
  }

  public toJSON(): State {
    return {
      seed: this.#seed,
      timestamp: this.#timestamp,
    };
  }
}
