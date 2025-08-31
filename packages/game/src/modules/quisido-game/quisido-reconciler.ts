/* eslint-disable max-lines */
import createReactReconciler, {
  type EventPriority,
  type Fiber,
  type Reconciler,
} from 'react-reconciler';
import { DEVELOPMENT_BUNDLE_TYPE, VERSION } from './constants.js';
import type Container from './container.js';
import type Instance from './instance.js';
import type { MethodKeys } from './method-keys.js';
import QuisidoHostContext from './quisido-host-context.js';
import QuisidoReactContext from './react-context.js';
import { TransitionStatus } from './transition-status.js';
import type { Props, Type } from './types.js';

export type FormInstance = never;
export type PublicInstance = unknown;
export type SuspenseInstance = unknown;

const SHOULD_CALL_COMMIT_MOUNT_METHOD = false;

export interface QuisidoReconcilerOptions<
  Txt,
  Child extends Instance<Txt, Child>,
  Root extends Container<Txt, Child>,
> {
  readonly cancelTimeout: (id: number) => void;
  readonly createInstance: <T extends Type>(
    type: T,
    props: Props[T],
    rootContainer: Root,
  ) => Instance<Txt, Child, T>;
  readonly createTextInstance: (text: string, rootContainer: Root) => Txt;
  readonly scheduleTimeout: (
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined,
  ) => number;
}

export default class QuisidoReconciler<
  Txt,
  Child extends Instance<Txt, Child>,
  Root extends Container<Txt, Child>,
> implements
    Reconciler<Root, Child, Txt, SuspenseInstance, FormInstance, PublicInstance>
{
  #initialChildrenFinalized = new WeakMap<Child, number>();
  #instanceCreated = new WeakMap<WeakKey, number>();
  #reconciler: Reconciler<
    Root,
    Child,
    Txt,
    SuspenseInstance,
    FormInstance,
    PublicInstance
  >;

  public constructor({
    cancelTimeout,
    createInstance,
    createTextInstance,
    scheduleTimeout,
  }: QuisidoReconcilerOptions<Txt, Child, Root>) {
    const reconciler = createReactReconciler({
      afterActiveInstanceBlur(): void {
        // Do nothing.
      },

      appendChild(parentInstance: Child, child: Child | Txt): void {
        parentInstance.appendChild(child);
      },

      appendChildToContainer(container: Root, child: Child | Txt): void {
        container.appendChild(child);
      },

      appendInitialChild(parentInstance: Child, child: Child | Txt): void {
        parentInstance.appendChild(child);
      },

      beforeActiveInstanceBlur(): void {
        // Do nothing.
      },

      cancelTimeout,

      commitUpdate: <T extends Type>(
        instance: Instance<Txt, Child, T>,
        _type: T,
        prevProps: Props[T],
        nextProps: Props[T],
      ): void => {
        instance.update(prevProps, nextProps);
      },

      /**
       *   `react-reconciler`'s return type erroneously does not associate
       * `Instance` with `Type`. However, given a type, the `Instance` should be
       * immutable.
       */
      // @ts-expect-error ts(2322): 'Instance' is assignable to the constraint of type 'Child', but 'Child' could be instantiated with a different subtype of constraint 'Instance'.
      createInstance: <T extends Type>(
        type: T,
        props: Props[T],
        rootContainer: Root,
      ): Instance<Txt, Child, T> => {
        const instance: Instance<Txt, Child, T> = createInstance(
          type,
          props,
          rootContainer,
        );
        this.#instanceCreated.set(instance, Date.now());
        return instance;
      },

      createTextInstance,

      detachDeletedInstance(_node: Child): void {
        // Do nothing.
      },

      finalizeInitialChildren: (instance: Child): boolean => {
        this.#initialChildrenFinalized.set(instance, Date.now());
        return SHOULD_CALL_COMMIT_MOUNT_METHOD;
      },

      getChildHostContext(
        _parentHostContext: QuisidoHostContext,
        _type: Type,
        _rootContainer: Root,
      ): QuisidoHostContext {
        // eslint-disable-next-line no-warning-comments
        // TODO: Get this value from somewhere instead of creating it.
        return new QuisidoHostContext();
      },

      getCurrentUpdatePriority(): EventPriority {
        return 0;
      },

      getInstanceFromNode(_node: unknown): Fiber | null | undefined {
        return null;
      },

      getInstanceFromScope(_scopeInstance: unknown): Child | null {
        return null;
      },

      getPublicInstance(instance: Child | Txt): PublicInstance {
        return instance;
      },

      getRootHostContext(_rootContainer: Root): QuisidoHostContext | null {
        return null;
      },

      HostTransitionContext: new QuisidoReactContext({
        threadCount: 1,
        typeOf: Symbol.for('@quisido/reconciler'),
        value: TransitionStatus.NotPendingTransition,
      }),

      // HostTransitionContext: {},
      insertBefore(
        parentInstance: Child,
        child: Child | Txt,
        beforeChild: Child | Txt, // | SuspenseInstance,
      ): void {
        parentInstance.insertBefore(child, beforeChild);
      },

      insertInContainerBefore(
        container: Root,
        child: Child | Txt,
        beforeChild: Child | Txt, // | SuspenseInstance,
      ): void {
        container.insertBefore(child, beforeChild);
      },
      isPrimaryRenderer: true,

      maySuspendCommit<T extends Type>(_type: T, _props: Props[T]): boolean {
        return true;
      },

      noTimeout: -1,
      NotPendingTransition: TransitionStatus.NotPendingTransition,

      preloadInstance<T extends Type>(_type: T, _props: Props[T]): boolean {
        return true;
      },

      prepareForCommit(_containerInfo: Root): Record<string, unknown> | null {
        // Do nothing.
        return null;
      },

      preparePortalMount(_containerInfo: Root): void {
        // Do nothing.
      },

      prepareScopeUpdate(_scopeInstance: unknown, _instance: unknown): void {
        // Do nothing.
      },

      removeChild(
        parentInstance: Child,
        child: Child | Txt, // | SuspenseInstance,
      ): void {
        parentInstance.removeChild(child);
      },

      removeChildFromContainer(
        container: Root,
        child: Child | Txt, // | SuspenseInstance,
      ): void {
        // eslint-disable-next-line no-warning-comments
        // TODO: Handle SuspenseInstance properly.
        container.removeChild(child);
      },

      requestPostPaintCallback(_callback: (time: number) => void): void {
        // Do nothing.
      },

      resetAfterCommit(_containerInfo: Root): void {
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

      shouldSetTextContent<T extends Type>(
        _type: T,
        _props: Props[T],
      ): boolean {
        return false;
      },

      startSuspendingCommit(): void {
        // Do nothing.
      },

      supportsHydration: true,
      supportsMutation: true,
      supportsPersistence: false,

      suspendInstance<T extends Type>(_type: T, _props: Props[T]): void {
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
      findFiberByHostInstance(_instance: Child | Txt): Fiber | null {
        return null;
      },
      rendererConfig: {},
      rendererPackageName: 'quisi.do',
      version: VERSION,
    });
  }

  #method<
    K extends MethodKeys<
      Reconciler<
        Root,
        Child,
        Txt,
        SuspenseInstance,
        FormInstance,
        PublicInstance
      >
    >,
  >(
    method: K,
  ): Reconciler<
    Root,
    Child,
    Txt,
    SuspenseInstance,
    FormInstance,
    PublicInstance
  >[K] {
    // @ts-expect-error This works.
    return this.#reconciler[method].bind(this.#reconciler);
  }

  public readonly createComponentSelector = this.#method(
    'createComponentSelector',
  );
  public readonly createPortal = this.#method('createPortal');
  public readonly findHostInstance = this.#method('findHostInstance');
  public readonly flushPassiveEffects = this.#method('flushPassiveEffects');
  public readonly flushSync = this.#method('flushSync');
  public readonly getCurrentUpdatePriority = this.#method(
    'getCurrentUpdatePriority',
  );
  public readonly getPublicRootInstance = this.#method('getPublicRootInstance');
  public readonly isAlreadyRendering = this.#method('isAlreadyRendering');
  public readonly registerMutableSourceForHydration = this.#method(
    'registerMutableSourceForHydration',
  );
  public readonly createContainer = this.#method('createContainer');
  public readonly createHasPseudoClassSelector = this.#method(
    'createHasPseudoClassSelector',
  );
  public readonly createRoleSelector = this.#method('createRoleSelector');
  public readonly createTestNameSelector = this.#method(
    'createTestNameSelector',
  );
  public readonly createTextSelector = this.#method('createTextSelector');
  public readonly getFindAllNodesFailureDescription = this.#method(
    'getFindAllNodesFailureDescription',
  );
  public readonly findAllNodes = this.#method('findAllNodes');
  public readonly findBoundingRects = this.#method('findBoundingRects');
  public readonly focusWithin = this.#method('focusWithin');
  public readonly observeVisibleRects = this.#method('observeVisibleRects');
  public readonly createHydrationContainer = this.#method(
    'createHydrationContainer',
  );
  public readonly updateContainer = this.#method('updateContainer');
  public readonly flushControlled = this.#method('flushControlled');
  public readonly batchedUpdates = this.#method('batchedUpdates');
  public readonly discreteUpdates = this.#method('discreteUpdates');
  public readonly deferredUpdates = this.#method('deferredUpdates');
  public readonly attemptSynchronousHydration = this.#method(
    'attemptSynchronousHydration',
  );
  public readonly attemptDiscreteHydration = this.#method(
    'attemptDiscreteHydration',
  );
  public readonly attemptContinuousHydration = this.#method(
    'attemptContinuousHydration',
  );
  public readonly attemptHydrationAtCurrentPriority = this.#method(
    'attemptHydrationAtCurrentPriority',
  );
  public readonly runWithPriority = this.#method('runWithPriority');
  public readonly findHostInstanceWithWarning = this.#method(
    'findHostInstanceWithWarning',
  );
  public readonly findHostInstanceWithNoPortals = this.#method(
    'findHostInstanceWithNoPortals',
  );
  public readonly shouldError = this.#method('shouldError');
  public readonly shouldSuspend = this.#method('shouldSuspend');
  public readonly injectIntoDevTools = this.#method('injectIntoDevTools');
}
