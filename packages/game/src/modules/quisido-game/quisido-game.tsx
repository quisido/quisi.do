import type { Component, FunctionComponent } from 'react';
import type {
  OpaqueRoot,
  RootTag,
  SuspenseHydrationCallbacks,
  TransitionTracingCallbacks,
} from 'react-reconciler';
import QuisidoReconciler, {
  type Container,
  type FamilyMember,
  type Instance,
  type SuspenseInstance,
} from '../quisido-reconciler/index.js';
import type TextInstance from '../quisido-reconciler/text-instance.js';
import type { Props } from './props.js';
import { type Type } from './type.js';

export interface QuisidoGameOptions<
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
  ) => FamilyMember<Type, Props, Txt, Family, T>;
  readonly createTextInstance: (text: string, rootContainer: Root) => Txt;
  readonly Game: FunctionComponent;
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

export interface State {
  readonly seed: number;
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
  Txt extends TextInstance,
  Family extends Instance<Type, Props, Txt, Family>,
  Root extends Container<Type, Props, Txt, Family>,
> {
  readonly #Game: FunctionComponent;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  readonly #opaqueRoots = new WeakMap<Root, OpaqueRoot>();
  readonly #reconciler: QuisidoReconciler<Type, Props, Txt, Family, Root>;
  readonly #seed: number;
  readonly #timestamp: number;

  public constructor({
    cancelTimeout,
    createInstance,
    createTextInstance,
    Game,
    scheduleMicrotask,
    scheduleTimeout,
    seed,
    shouldSetTextContent,
    timestamp,
  }: QuisidoGameOptions<Type, Props, Txt, Family, Root>) {
    this.#Game = Game;
    this.#reconciler = new QuisidoReconciler({
      cancelTimeout,
      createInstance,
      createTextInstance,
      scheduleMicrotask,
      scheduleTimeout,
      shouldSetTextContent,
    });
    this.#seed = seed;
    this.#timestamp = timestamp;
  }

  public dispatch(_type: string, _payload: unknown): void {
    throw new Error(
      `Dispatch is not implemented in ${JSON.stringify(this.toJSON())}`,
    );
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
    const Game: FunctionComponent = this.#Game;
    this.#reconciler.updateContainerSync(
      <Game />,
      opaqueRoot,
      DEFAULT_PARENT_COMPONENT,
      callback,
    );
  }

  public toJSON(): State {
    return {
      seed: this.#seed,
      timestamp: this.#timestamp,
    };
  }
}
