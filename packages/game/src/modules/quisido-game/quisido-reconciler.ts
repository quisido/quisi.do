/* eslint-disable max-lines */
import createReactReconciler, {
  type EventPriority,
  type Fiber,
  type LanePriority,
  type OpaqueHandle,
  type Reconciler,
} from 'react-reconciler';
import { DEVELOPMENT_BUNDLE_TYPE, VERSION } from './constants.js';
import QuisidoHostContext from './quisido-host-context.js';
import QuisidoInstance from './quisido-instance.js';
import QuisidoTextInstance from './quisido-text-instance.js';
import QuisidoReactContext from './react-context.js';
import { TransitionStatus } from './transition-status.js';

type Input<
  Props,
  Type,
  K extends keyof Reconciler<
    HTMLCanvasElement,
    QuisidoInstance<Props, Type>,
    QuisidoTextInstance,
    SuspenseInstance,
    never,
    PublicInstance
  >,
> = Parameters<
  Reconciler<
    HTMLCanvasElement,
    QuisidoInstance<Props, Type>,
    QuisidoTextInstance,
    SuspenseInstance,
    never,
    PublicInstance
  >[K]
>;

export type FormInstance = never;
export type PublicInstance = unknown;
export type SuspenseInstance = unknown;

export interface QuisidoReconcilerOptions {
  readonly cancelTimeout: (id: number) => void;
  readonly scheduleTimeout: (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined,
  ) => number;
}

type Output<
  Props,
  Type,
  K extends keyof Reconciler<
    HTMLCanvasElement,
    QuisidoInstance<Props, Type>,
    QuisidoTextInstance,
    SuspenseInstance,
    FormInstance,
    PublicInstance
  >,
> = ReturnType<
  Reconciler<
    HTMLCanvasElement,
    QuisidoInstance<Props, Type>,
    QuisidoTextInstance,
    SuspenseInstance,
    FormInstance,
    PublicInstance
  >[K]
>;

export default class QuisidoReconciler<Props, Type>
  implements
    Reconciler<
      HTMLCanvasElement,
      QuisidoInstance<Props, Type>,
      QuisidoTextInstance,
      SuspenseInstance,
      FormInstance,
      PublicInstance
    >
{
  #reconciler: Reconciler<
    HTMLCanvasElement,
    QuisidoInstance<Props, Type>,
    QuisidoTextInstance,
    SuspenseInstance,
    FormInstance,
    PublicInstance
  >;

  public constructor({
    cancelTimeout,
    scheduleTimeout,
  }: QuisidoReconcilerOptions) {
    const reconciler = createReactReconciler({
      afterActiveInstanceBlur(): void {
        // Do nothing.
      },
      // appendChild(
      //   _parentInstance: Instance,
      //   _child: Instance | TextInstance,
      // ): void {},
      // appendChildToContainer(): void {},
      appendInitialChild(
        _parentInstance: QuisidoInstance<Props, Type>,
        _child: QuisidoInstance<Props, Type> | QuisidoTextInstance,
      ): void {
        // Do nothing.
      },
      beforeActiveInstanceBlur(): void {
        // Do nothing.
      },
      cancelTimeout,
      // commitUpdate(): void {},
      createInstance(
        type: Type,
        props: Props,
        rootContainer: HTMLCanvasElement,
        hostContext: QuisidoHostContext,
        internalHandle: OpaqueHandle,
      ): QuisidoInstance<Props, Type> {
        return new QuisidoInstance({
          hostContext,
          internalHandle,
          props,
          rootContainer,
          type,
        });
      },
      createTextInstance(
        text: string,
        rootContainer: HTMLCanvasElement,
        hostContext: QuisidoHostContext,
        internalHandle: OpaqueHandle,
      ): QuisidoTextInstance {
        return new QuisidoTextInstance({
          hostContext,
          internalHandle,
          rootContainer,
          text,
        });
      },
      detachDeletedInstance(_node: QuisidoInstance<Props, Type>): void {
        // Do nothing.
      },
      finalizeInitialChildren(
        _instance: QuisidoInstance<Props, Type>,
        _type: Type,
        _props: Props,
        _rootContainer: HTMLCanvasElement,
        _hostContext: QuisidoHostContext,
      ): boolean {
        return false;
      },
      getChildHostContext(
        _parentHostContext: QuisidoHostContext,
        _type: Type,
        _rootContainer: HTMLCanvasElement,
      ): QuisidoHostContext {
        // TODO: Get this value from somewhere instead of creating it.
        return new QuisidoHostContext();
      },
      getCurrentUpdatePriority(): EventPriority {
        return 0;
      },
      getInstanceFromNode(_node: unknown): Fiber | null | undefined {
        return null;
      },
      getInstanceFromScope(
        _scopeInstance: unknown,
      ): QuisidoInstance<Props, Type> | null {
        return null;
      },
      getPublicInstance(
        _instance: QuisidoInstance<Props, Type> | QuisidoTextInstance,
      ): PublicInstance {
        return TransitionStatus.NotPendingTransition;
      },
      getRootHostContext(
        _rootContainer: HTMLCanvasElement,
      ): QuisidoHostContext | null {
        return null;
      },
      HostTransitionContext: new QuisidoReactContext({
        threadCount: 1,
        typeOf: Symbol.for('quisido.game.transition'),
        value: TransitionStatus.NotPendingTransition,
      }),
      // HostTransitionContext: {},
      // insertBefore(): void {},
      // insertInContainerBefore(): void {},
      isPrimaryRenderer: true,
      maySuspendCommit(_type: Type, _props: Props): boolean {
        return true;
      },
      noTimeout: -1,
      NotPendingTransition: TransitionStatus.NotPendingTransition,
      preloadInstance(_type: Type, _props: Props): boolean {
        return true;
      },
      prepareForCommit(
        _containerInfo: HTMLCanvasElement,
      ): Record<string, unknown> | null {
        // Do nothing.
        return null;
      },
      preparePortalMount(_containerInfo: HTMLCanvasElement): void {
        // Do nothing.
      },
      prepareScopeUpdate(_scopeInstance: unknown, _instance: unknown): void {
        // Do nothing.
      },
      // removeChild(): void {},
      // removeChildFromContainer(): void {},
      requestPostPaintCallback(_callback: (time: number) => void): void {
        // Do nothing.
      },
      resetAfterCommit(_containerInfo: HTMLCanvasElement): void {
        // Do nothing.s
      },
      resetFormInstance(_form: FormInstance): void {
        // Do nothing.
      },
      resolveEventTimeStamp(): number {
        return 0;
      },
      resolveEventType(): string | null {
        return null;
      },
      resolveUpdatePriority(): EventPriority {
        return 0;
      },
      scheduleTimeout,
      setCurrentUpdatePriority(_newPriority: EventPriority): void {
        // Do nothing.
      },
      shouldAttemptEagerTransition(): boolean {
        return true;
      },
      shouldSetTextContent(_type: Type, _props: Props): boolean {
        return false;
      },
      startSuspendingCommit(): void {
        // Do nothing.
      },
      supportsHydration: true,
      supportsMutation: true,
      supportsPersistence: true,
      suspendInstance(_type: Type, _props: Props): void {
        // Do nothing.
      },
      trackSchedulerEvent(): void {
        // Do nothing.
      },
      waitForCommitToBeReady():
        | ((
            initiateCommit: (...args: unknown[]) => unknown,
          ) => (...args: unknown[]) => unknown)
        | null {
        return null;
      },
      warnsIfNotActing: true,
    });

    this.#reconciler = reconciler;
    reconciler.injectIntoDevTools({
      bundleType: DEVELOPMENT_BUNDLE_TYPE,
      findFiberByHostInstance(
        _instance: QuisidoInstance<Props, Type> | QuisidoTextInstance,
      ): Fiber | null {
        return null;
      },
      rendererConfig: {},
      rendererPackageName: 'quisi.do',
      version: VERSION,
    });
  }

  public createContainer(
    ...args: Input<Props, Type, 'createContainer'>
  ): Output<Props, Type, 'createContainer'> {
    return this.#reconciler.createContainer(...args);
  }

  public createPortal(
    ...args: Input<Props, Type, 'createPortal'>
  ): Output<Props, Type, 'createPortal'> {
    return this.#reconciler.createPortal(...args);
  }

  public registerMutableSourceForHydration(
    ...args: Input<Props, Type, 'registerMutableSourceForHydration'>
  ): Output<Props, Type, 'registerMutableSourceForHydration'> {
    this.#reconciler.registerMutableSourceForHydration(...args);
  }

  public createComponentSelector(
    ...args: Input<Props, Type, 'createComponentSelector'>
  ): Output<Props, Type, 'createComponentSelector'> {
    return this.#reconciler.createComponentSelector(...args);
  }

  public createRoleSelector(
    ...args: Input<Props, Type, 'createRoleSelector'>
  ): Output<Props, Type, 'createRoleSelector'> {
    return this.#reconciler.createRoleSelector(...args);
  }

  public createHasPseudoClassSelector(
    ...args: Input<Props, Type, 'createHasPseudoClassSelector'>
  ): Output<Props, Type, 'createHasPseudoClassSelector'> {
    return this.#reconciler.createHasPseudoClassSelector(...args);
  }

  public createTextSelector(
    ...args: Input<Props, Type, 'createTextSelector'>
  ): Output<Props, Type, 'createTextSelector'> {
    return this.#reconciler.createTextSelector(...args);
  }

  public findAllNodes(
    ...args: Input<Props, Type, 'findAllNodes'>
  ): Output<Props, Type, 'findAllNodes'> {
    return this.#reconciler.findAllNodes(...args);
  }

  public getFindAllNodesFailureDescription(
    ...args: Input<Props, Type, 'getFindAllNodesFailureDescription'>
  ): Output<Props, Type, 'getFindAllNodesFailureDescription'> {
    return this.#reconciler.getFindAllNodesFailureDescription(...args);
  }

  public createTestNameSelector(
    ...args: Input<Props, Type, 'createTestNameSelector'>
  ): Output<Props, Type, 'createTestNameSelector'> {
    return this.#reconciler.createTestNameSelector(...args);
  }

  public findBoundingRects(
    ...args: Input<Props, Type, 'findBoundingRects'>
  ): Output<Props, Type, 'findBoundingRects'> {
    return this.#reconciler.findBoundingRects(...args);
  }

  public runWithPriority<T>(priority: LanePriority, fn: () => T): T {
    return this.#reconciler.runWithPriority(priority, fn);
  }

  public flushControlled(
    ...args: Input<Props, Type, 'flushControlled'>
  ): Output<Props, Type, 'flushControlled'> {
    this.#reconciler.flushControlled(...args);
  }

  public findHostInstance(
    ...args: Input<Props, Type, 'findHostInstance'>
  ): Output<Props, Type, 'findHostInstance'> {
    return this.#reconciler.findHostInstance(...args);
  }

  public attemptHydrationAtCurrentPriority(
    ...args: Input<Props, Type, 'attemptHydrationAtCurrentPriority'>
  ): Output<Props, Type, 'attemptHydrationAtCurrentPriority'> {
    this.#reconciler.attemptHydrationAtCurrentPriority(...args);
  }

  public findHostInstanceWithWarning(
    ...args: Input<Props, Type, 'findHostInstanceWithWarning'>
  ): Output<Props, Type, 'findHostInstanceWithWarning'> {
    return this.#reconciler.findHostInstanceWithWarning(...args);
  }

  public attemptSynchronousHydration(
    ...args: Input<Props, Type, 'attemptSynchronousHydration'>
  ): Output<Props, Type, 'attemptSynchronousHydration'> {
    this.#reconciler.attemptSynchronousHydration(...args);
  }

  public deferredUpdates<A>(fn: () => A): A {
    return this.#reconciler.deferredUpdates(fn);
  }

  public getCurrentUpdatePriority(
    ...args: Input<Props, Type, 'getCurrentUpdatePriority'>
  ): Output<Props, Type, 'getCurrentUpdatePriority'> {
    return this.#reconciler.getCurrentUpdatePriority(...args);
  }

  public flushSync(): void;
  public flushSync<R>(fn: () => R): R;
  public flushSync<R>(fn?: () => R): R | void {
    if (typeof fn === 'undefined') {
      this.#reconciler.flushSync();
    } else {
      return this.#reconciler.flushSync(fn);
    }
  }

  public batchedUpdates<A, R>(fn: (a: A) => R, args: A): R {
    return this.#reconciler.batchedUpdates(fn, args);
  }

  public attemptDiscreteHydration(
    ...args: Input<Props, Type, 'attemptDiscreteHydration'>
  ): Output<Props, Type, 'attemptDiscreteHydration'> {
    this.#reconciler.attemptDiscreteHydration(...args);
  }

  public discreteUpdates<A, B, C, D, R>(
    fn: (arg0: A, arg1: B, arg2: C, arg3: D) => R,
    arg0: A,
    arg1: B,
    arg2: C,
    arg3: D,
  ): R {
    return this.#reconciler.discreteUpdates(fn, arg0, arg1, arg2, arg3);
  }

  public flushPassiveEffects(
    ...args: Input<Props, Type, 'flushPassiveEffects'>
  ): Output<Props, Type, 'flushPassiveEffects'> {
    return this.#reconciler.flushPassiveEffects(...args);
  }

  public getPublicRootInstance(
    ...args: Input<Props, Type, 'getPublicRootInstance'>
  ): Output<Props, Type, 'getPublicRootInstance'> {
    return this.#reconciler.getPublicRootInstance(...args);
  }

  public isAlreadyRendering(
    ...args: Input<Props, Type, 'isAlreadyRendering'>
  ): Output<Props, Type, 'isAlreadyRendering'> {
    return this.#reconciler.isAlreadyRendering(...args);
  }

  public attemptContinuousHydration(
    ...args: Input<Props, Type, 'attemptContinuousHydration'>
  ): Output<Props, Type, 'attemptContinuousHydration'> {
    this.#reconciler.attemptContinuousHydration(...args);
  }

  public updateContainer(
    ...args: Input<Props, Type, 'updateContainer'>
  ): Output<Props, Type, 'updateContainer'> {
    return this.#reconciler.updateContainer(...args);
  }

  public createHydrationContainer(
    ...args: Input<Props, Type, 'createHydrationContainer'>
  ): Output<Props, Type, 'createHydrationContainer'> {
    return this.#reconciler.createHydrationContainer(...args);
  }

  public observeVisibleRects(
    ...args: Input<Props, Type, 'observeVisibleRects'>
  ): Output<Props, Type, 'observeVisibleRects'> {
    return this.#reconciler.observeVisibleRects(...args);
  }

  public focusWithin(
    ...args: Input<Props, Type, 'focusWithin'>
  ): Output<Props, Type, 'focusWithin'> {
    return this.#reconciler.focusWithin(...args);
  }

  public findHostInstanceWithNoPortals(
    ...args: Input<Props, Type, 'findHostInstanceWithNoPortals'>
  ): Output<Props, Type, 'findHostInstanceWithNoPortals'> {
    return this.#reconciler.findHostInstanceWithNoPortals(...args);
  }

  public shouldError(
    ...args: Input<Props, Type, 'shouldError'>
  ): Output<Props, Type, 'shouldError'> {
    return this.#reconciler.shouldError(...args);
  }

  public shouldSuspend(
    ...args: Input<Props, Type, 'shouldSuspend'>
  ): Output<Props, Type, 'shouldSuspend'> {
    return this.#reconciler.shouldSuspend(...args);
  }

  public injectIntoDevTools(
    ...args: Input<Props, Type, 'injectIntoDevTools'>
  ): Output<Props, Type, 'injectIntoDevTools'> {
    return this.#reconciler.injectIntoDevTools(...args);
  }
}
