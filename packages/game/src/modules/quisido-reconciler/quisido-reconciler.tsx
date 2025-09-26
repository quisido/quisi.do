/* eslint-disable max-lines */
import type { Component, ReactNode } from 'react';
import createReactReconciler, {
  type EventPriority,
  type Fiber,
  type OpaqueHandle,
  type OpaqueRoot,
  type Reconciler,
  type RootTag,
  type SuspenseHydrationCallbacks,
  type TransitionTracingCallbacks,
} from 'react-reconciler';
import { DEVELOPMENT_BUNDLE_TYPE, VERSION } from './constants.js';
import type Container from './container.js';
import type Instance from './instance.js';
import type { MethodKeys } from './method-keys.js';
import QuisidoReactContext from './quisido-react-context.js';
import type TextInstance from './text-instance.js';
import { TransitionStatus } from './transition-status.js';

interface HostContext<Root> {
  readonly rootContainer: Root;
}

export type FormInstance = never;
export type SuspenseInstance = unknown;

const SHOULD_CALL_COMMIT_MOUNT_METHOD = false;

export interface QuisidoReconcilerOptions<
  Type extends string,
  Props extends Record<Type, object>,
  Txt extends TextInstance,
  Family extends { [T in Type]: Instance<Props[T], Txt, Family> }[Type],
  Root extends Container<Txt, Family>,
> {
  readonly cancelTimeout: (id: number) => void;
  readonly createInstance: <T extends Type>(
    type: T,
    props: Props[T],
    rootContainer: Root,
  ) => Family;
  readonly createTextInstance: (text: string, rootContainer: Root) => Txt;
  readonly maySuspendCommit?:
    | (<T extends Type>(type: T, props: Props[T]) => boolean)
    | undefined;
  readonly scheduleMicrotask: (fn: () => void) => void;
  readonly scheduleTimeout: (
    fn: (...args: readonly unknown[]) => unknown,
    delay?: number | undefined,
  ) => number;
  readonly shouldSetTextContent: <T extends Type>(
    type: T,
    props: Props[T],
  ) => boolean;
}

const defaultMaySuspendCommit = (): boolean => false;

const CONCURRENT_UPDATES_BY_DEFAULT_OVERRIDE: null | boolean = null;
const DEFAULT_PARENT_COMPONENT: Component<unknown, unknown> | null = null;
const HYDRATION_CALLBACKS: null | SuspenseHydrationCallbacks<SuspenseInstance> =
  null;
const IDENTIFIER_PREFIX = 'quisido';
const STRICT_MODE = true;
const TAG: RootTag = 2; // 0 = Legacy, 1 = Blocking, 2 = Concurrent
const TRANSITION_TRACING_CALLBACKS: null | TransitionTracingCallbacks = null;

export default class QuisidoReconciler<
  Type extends string,
  Props extends Record<Type, object>,
  Txt extends TextInstance,
  Family extends { [T in Type]: Instance<Props[T], Txt, Family> }[Type],
  Root extends Container<Txt, Family>,
> implements
    Reconciler<Root, Family, Txt, SuspenseInstance, FormInstance, Family | Txt>
{
  #initialChildrenFinalized = new WeakMap<Family, number>();
  #instanceCreated = new WeakMap<WeakKey, number>();
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  readonly #opaqueRoots = new WeakMap<Root, OpaqueRoot>();
  #reconciler: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >;

  public constructor({
    cancelTimeout,
    createInstance,
    createTextInstance,
    maySuspendCommit = defaultMaySuspendCommit,
    scheduleMicrotask,
    scheduleTimeout,
    shouldSetTextContent,
  }: QuisidoReconcilerOptions<Type, Props, Txt, Family, Root>) {
    const reconciler = createReactReconciler({
      /*
      canHydrateInstance(
        instance: HydratableInstance,
        type: Type,
        props: Props,
      ): null | Instance {},

      canHydrateSuspenseInstance(
        instance: HydratableInstance,
      ): null | SuspenseInstance {},

      canHydrateTextInstance(
        instance: HydratableInstance,
        text: string,
      ): null | TextInstance {},

      getFirstHydratableChild(
        parentInstance: Container | Instance,
      ): null | HydratableInstance {},

      getNextHydratableSibling(
        instance: HydratableInstance,
      ): null | HydratableInstance {},

      hydrateInstance(
        instance: Instance,
        type: Type,
        props: Props,
        rootContainerInstance: Container,
        hostContext: HostContext,
        internalInstanceHandle: any,
      ): null | any[] {},

      getNextHydratableInstanceAfterSuspenseInstance(
        suspenseInstance: SuspenseInstance,
      ): null | HydratableInstance {},

      hydrateTextInstance(textInstance: TextInstance, text: string, internalInstanceHandle: any): boolean {},

      hydrateSuspenseInstance(
        suspenseInstance: SuspenseInstance,
        internalInstanceHandle: any,
      ): void {},

      registerSuspenseInstanceRetry(
        instance: SuspenseInstance,
        callback: () => void,
      ): void {},

      isSuspenseInstanceFallback(instance: SuspenseInstance): boolean {},

      isSuspenseInstancePending(instance: SuspenseInstance): boolean {},

      commitHydratedContainer?(container: Container): void;

      commitHydratedSuspenseInstance?(suspenseInstance: SuspenseInstance): void;

      didNotMatchHydratedContainerTextInstance?(
        parentContainer: Container,
        textInstance: TextInstance,
        text: string,
      ): void;

      didNotMatchHydratedTextInstance?(
        parentType: Type,
        parentProps: Props,
        parentInstance: Instance,
        textInstance: TextInstance,
        text: string,
      ): void;

      didNotHydrateContainerInstance?(parentContainer: Container, instance: HydratableInstance): void;

      didNotHydrateInstance?(
        parentType: Type,
        parentProps: Props,
        parentInstance: Instance,
        instance: HydratableInstance,
      ): void;

      didNotFindHydratableContainerInstance?(parentContainer: Container, type: Type, props: Props): void;

      didNotFindHydratableContainerTextInstance?(parentContainer: Container, text: string): void;

      didNotFindHydratableContainerSuspenseInstance?(parentContainer: Container): void;

      didNotFindHydratableInstance?(
        parentType: Type,
        parentProps: Props,
        parentInstance: Instance,
        type: Type,
        props: Props,
      ): void;

      didNotFindHydratableTextInstance?(
        parentType: Type,
        parentProps: Props,
        parentInstance: Instance,
        text: string,
      ): void;

      didNotFindHydratableSuspenseInstance?(parentType: Type, parentProps: Props, parentInstance: Instance): void;

      errorHydratingContainer?(parentContainer: Container): void;
      */

      // eslint-disable-next-line no-warning-comments
      // TODO: Documentation missing.
      afterActiveInstanceBlur(): void {
        // Do nothing.
      },

      appendChild(parentInstance: Family, child: Family | Txt): void {
        parentInstance.appendChild(child);
      },

      appendChildToContainer(container: Root, child: Family | Txt): void {
        container.appendChild(child);
      },

      appendInitialChild(parentInstance: Family, child: Family | Txt): void {
        parentInstance.appendChild(child);
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: Documentation missing.
      beforeActiveInstanceBlur(): void {
        // Do nothing.
      },

      cancelTimeout,

      clearContainer(container: Root): void {
        container.clear();
      },

      commitTextUpdate(
        textInstance: Txt,
        oldText: string,
        newText: string,
      ): void {
        textInstance.update(oldText, newText);
      },

      commitUpdate: <T extends Type>(
        instance: Family,
        _type: T,
        prevProps: Props[T],
        nextProps: Props[T],
      ): void => {
        instance.update(prevProps, nextProps);
      },

      createInstance: <T extends Type>(
        type: T,
        props: Props[T],
        rootContainer: Root,
        _hostContext: HostContext<Root>,
        _internalHandle: OpaqueHandle,
      ): Family => {
        const instance: Family = createInstance(type, props, rootContainer);
        this.#instanceCreated.set(instance, Date.now());
        return instance;
      },

      createTextInstance,

      // eslint-disable-next-line no-warning-comments
      // TODO: Documentation missing.
      detachDeletedInstance(_node: Family): void {
        // Do nothing.
        // _node.detach(); // ?
      },

      finalizeInitialChildren: (instance: Family): boolean => {
        this.#initialChildrenFinalized.set(instance, Date.now());
        return SHOULD_CALL_COMMIT_MOUNT_METHOD;
      },

      getChildHostContext(
        parentHostContext: HostContext<Root>,
        _type: string,
        _rootContainer: Root,
      ): HostContext<Root> {
        return parentHostContext;
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/28751
      getCurrentUpdatePriority(): EventPriority {
        return 0;
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: What is a node?
      getInstanceFromNode(_node: unknown): Fiber | null | undefined {
        return null;
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: Documentation missing.
      getInstanceFromScope(_scopeInstance: unknown): Family | null {
        return null;
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: Documentation missing.
      getParentSuspenseInstance(_targetInstance: unknown): null {
        return null;
      },

      getPublicInstance(instance: Family | Txt): Family | Txt {
        return instance;
      },

      getRootHostContext(rootContainer: Root): HostContext<Root> {
        return {
          rootContainer,
        };
      },

      hideInstance(instance: Family): void {
        instance.hide();
      },

      hideTextInstance(textInstance: Txt): void {
        textInstance.hide();
      },

      HostTransitionContext: new QuisidoReactContext({
        threadCount: 1,
        typeOf: Symbol.for('@quisido/reconciler'),
        value: TransitionStatus.NotPendingTransition,
      }),

      insertBefore(
        parentInstance: Family,
        child: Family | Txt,
        beforeChild: Family | Txt, // | SuspenseInstance,
      ): void {
        parentInstance.insertBefore(child, beforeChild);
      },

      insertInContainerBefore(
        container: Root,
        child: Family | Txt,
        beforeChild: Family | Txt, // | SuspenseInstance,
      ): void {
        container.insertBefore(child, beforeChild);
      },

      isPrimaryRenderer: true,
      maySuspendCommit,
      noTimeout: -1,
      NotPendingTransition: TransitionStatus.NotPendingTransition,

      // eslint-disable-next-line no-warning-comments
      // TODO: Use this to preload external resources before rendering?
      preloadInstance(_type: string, _props: object): boolean {
        return true;
      },

      prepareForCommit(_containerInfo: Root): Record<string, unknown> | null {
        return null;
      },

      preparePortalMount(_containerInfo: Root): void {
        // Do nothing.
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: Documentation missing.
      prepareScopeUpdate(_scopeInstance: unknown, _instance: unknown): void {
        // Do nothing.
      },

      removeChild(
        parentInstance: Family,
        child: Family | Txt, // | SuspenseInstance,
      ): void {
        parentInstance.removeChild(child);
        child.remove?.();
      },

      removeChildFromContainer(
        container: Root,
        child: Family | Txt, // | SuspenseInstance,
      ): void {
        container.removeChild(child);
        child.remove?.();
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/25105
      requestPostPaintCallback(_callback: (time: number) => void): void {
        // Do nothing.
      },

      resetAfterCommit(_containerInfo: Root): void {
        // Do nothing.
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/28804
      resetFormInstance(_form: FormInstance): void {
        // Do nothing.
      },

      resetTextContent(instance: Family): void {
        instance.resetTextContent?.();
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/31008
      resolveEventTimeStamp(): number {
        return 0;
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/31008
      resolveEventType(): string | null {
        return null;
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/28751
      resolveUpdatePriority(): EventPriority {
        return 0;
      },

      scheduleMicrotask,
      scheduleTimeout,

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/28751
      setCurrentUpdatePriority(_newPriority: EventPriority): void {
        // Do nothing.
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/26025
      shouldAttemptEagerTransition(): boolean {
        return true;
      },

      shouldSetTextContent,

      // eslint-disable-next-line no-warning-comments
      // TODO: This method is called just before the commit phase. Use it to set
      // up any necessary state while any Host Components that might suspend
      // this commit are evaluated to determine if the commit must be suspended.
      startSuspendingCommit(): void {
        // Do nothing.
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: Eventually 🥲
      supportsHydration: false,

      supportsMicrotasks: true,
      supportsMutation: true,
      supportsPersistence: false,

      // eslint-disable-next-line no-warning-comments
      // TODO: This method is called after `startSuspendingCommit` for each Host
      // Component that indicated it might suspend a commit.
      suspendInstance(_type: string, _props: object): void {
        // Do nothing.
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: https://github.com/facebook/react/pull/31528
      trackSchedulerEvent(): void {
        // Do nothing.
      },

      unhideInstance<T extends Type>(
        instance: Instance<Props[T], Txt, Family>,
        props: Props[T],
      ): void {
        instance.unhide(props);
      },

      unhideTextInstance(textInstance: Txt, text: string): void {
        textInstance.unhide(text);
      },

      // eslint-disable-next-line no-warning-comments
      // TODO: This method is called after all `suspendInstance` calls are
      // complete. Return `null` if the commit can happen immediately. Return
      // `(initiateCommit: Function) => Function` if the commit must be
      // suspended. The argument to this callback will initiate the commit when
      // called. The return value is a cancellation function that the Reconciler
      // can use to abort the commit.
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
      findFiberByHostInstance(_instance: Family | Txt): Fiber | null {
        return null;
      },
      rendererConfig: {},
      rendererPackageName: 'quisi.do',
      version: VERSION,
    });
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

  public update(
    element: ReactNode,
    container: Root,
    onError: (error: Error) => void,
    callback?: (() => void) | undefined,
  ): void {
    this.updateContainer(
      element,
      this.#getOpaqueRoot(container, onError),
      DEFAULT_PARENT_COMPONENT,
      callback,
    );
  }

  #method<
    K extends MethodKeys<
      Reconciler<
        Root,
        Family,
        Txt,
        SuspenseInstance,
        FormInstance,
        Family | Txt
      >
    >,
  >(
    method: K,
  ): Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >[K] {
    // @ts-expect-error This works.
    return (...args: readonly unknown[]): unknown => {
      // @ts-expect-error This works.

      return this.#reconciler[method](...args);
    };
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

  // public readonly updateContainerSync = this.#method('updateContainerSync');
}
