import type { Component, FunctionComponent } from 'react';
import type {
  OpaqueRoot,
  RootTag,
  SuspenseHydrationCallbacks,
  TransitionTracingCallbacks,
} from 'react-reconciler';
import QuisidoReconciler, {
  type Container,
  type Instance,
  type SuspenseInstance,
} from '../quisido-reconciler/index.js';
import type TextInstance from '../quisido-reconciler/text-instance.js';
import type { Actions } from './actions.js';
import type { Props } from './props.js';
import type { Reducer } from './reducer.js';
import type { Stringifiable } from './stringifiable.js';
import { type Type } from './type.js';

export interface Export<State extends Stringifiable> {
  readonly seed: number;
  readonly state: State;
  readonly timestamp: number;
}

export interface QuisidoGameOptions<
  State extends Stringifiable,
  Type extends string,
  Props extends Record<Type, object>,
  Txt,
  Family extends Instance<Type, Props, Txt, Family>,
  Root extends Container<Type, Props, Txt, Family>,
> {
  readonly cancelTimeout: (id: number) => void;
  readonly createInstance: <T extends Type>(
    type: T,
    props: Props[T],
    rootContainer: Root,
  ) => Family;
  readonly createTextInstance: (text: string, rootContainer: Root) => Txt;
  readonly Game: FunctionComponent<State>;
  readonly initialState: State;
  readonly reducer: Reducer<State>;
  readonly scheduleMicrotask: (fn: () => void) => void;
  readonly scheduleTimeout: (
    fn: (...args: readonly unknown[]) => unknown,
    delay?: number | undefined,
  ) => number;
  readonly seed: number;
  readonly shouldSetTextContent: <T extends Type>(
    type: T,
    props: Props[T],
  ) => boolean;
  readonly timestamp: number;
}

const CONCURRENT_UPDATES_BY_DEFAULT_OVERRIDE: null | boolean = null;
const DEFAULT_PARENT_COMPONENT: Component<unknown, unknown> | null = null;
const HYDRATION_CALLBACKS: null | SuspenseHydrationCallbacks<SuspenseInstance> =
  null;
const IDENTIFIER_PREFIX = 'quisido';
const STRICT_MODE = true;
const TAG: RootTag = 2; // 0 = Legacy, 1 = Blocking, 2 = Concurrent
const TRANSITION_TRACING_CALLBACKS: null | TransitionTracingCallbacks = null;

export default class QuisidoGame<
  State extends Stringifiable,
  Txt extends TextInstance,
  Family extends Instance<Type, Props, Txt, Family>,
  Root extends Container<Type, Props, Txt, Family>,
> {
  readonly #Game: FunctionComponent<State>;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  readonly #opaqueRoots = new WeakMap<Root, OpaqueRoot>();
  readonly #reconciler: QuisidoReconciler<Type, Props, Txt, Family, Root>;
  readonly #reducer: Reducer<State>;
  readonly #seed: number;
  readonly #state: State;
  readonly #timestamp: number;

  public constructor({
    cancelTimeout,
    createInstance,
    createTextInstance,
    Game,
    initialState,
    reducer,
    scheduleMicrotask,
    scheduleTimeout,
    seed,
    shouldSetTextContent,
    timestamp,
  }: QuisidoGameOptions<State, Type, Props, Txt, Family, Root>) {
    this.#Game = Game;
    this.#reconciler = new QuisidoReconciler({
      cancelTimeout,
      createInstance,
      createTextInstance,
      scheduleMicrotask,
      scheduleTimeout,
      shouldSetTextContent,
    });
    this.#reducer = reducer;
    this.#seed = seed;
    this.#state = initialState;
    this.#timestamp = timestamp;
  }

  public dispatch<K extends keyof Actions>(
    action: K,
    payload: Actions[K],
  ): void {
    this.#reducer(this.#state, action, payload);
  }

  #getOpaqueRoot(container: Root, onError: (error: Error) => void): OpaqueRoot {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const opaqueRoot: OpaqueRoot | undefined = this.#opaqueRoots.get(container);
    if (typeof opaqueRoot !== 'undefined') {
      return opaqueRoot;
    }

    const newOpaqueRoot: OpaqueRoot = this.#reconciler.createContainer(
      container,
      TAG,
      HYDRATION_CALLBACKS,
      STRICT_MODE,
      CONCURRENT_UPDATES_BY_DEFAULT_OVERRIDE,
      IDENTIFIER_PREFIX,
      onError,
      TRANSITION_TRACING_CALLBACKS,
    );
    this.#opaqueRoots.set(container, newOpaqueRoot);
    return newOpaqueRoot;
  }

  public start(
    container: Root,
    onError: (error: Error) => void,
    callback?: (() => void) | undefined,
  ): void {
    const opaqueRoot: OpaqueRoot = this.#getOpaqueRoot(container, onError);
    const Game: FunctionComponent<State> = this.#Game;

    // no-dd-sa:typescript-code-style/ban-ts-comment
    // @ts-expect-error Shrug emoji
    this.#reconciler.updateContainerSync(
      <Game {...this.#state} />,
      opaqueRoot,
      DEFAULT_PARENT_COMPONENT,
      callback,
    );
  }

  public toJSON(): Export<State> {
    return {
      seed: this.#seed,
      state: this.#state,
      timestamp: this.#timestamp,
    };
  }
}
