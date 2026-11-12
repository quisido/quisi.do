import { type Component, type ReactNode } from 'react';
import createReactReconciler, {
  type BaseErrorInfo,
  type CaughtErrorInfo,
  type EventPriority,
  type Fiber,
  type OpaqueHandle,
  type OpaqueRoot,
  type Reconciler,
  type RootTag,
  type SuspenseHydrationCallbacks,
  type TransitionTracingCallbacks,
} from 'react-reconciler';
import {
  DefaultEventPriority,
  NoEventPriority,
} from 'react-reconciler/constants.js';
import { VERSION } from './constants.js';
import type Container from './container.js';
import type Instance from './instance.js';
import { type MethodKeys } from './method-keys.js';
import QuisidoReactContext from './quisido-react-context.js';
import type TextInstance from './text-instance.js';
import { TransitionStatus } from './transition-status.js';

interface HostContext<Root> {
  readonly rootContainer: Root;
}

const defaultMaySuspendCommit = (): boolean => false;

// React looks console methods up by name through the `bindToConsole` host
// config method, so the console is indexed dynamically.
/* eslint-disable no-console -- The console API is selected by method name. */
const pickConsoleMethod = (
  methodName: string,
): ((...args: unknown[]) => unknown) => {
  const consoleMethods = console as unknown as Record<
    string,
    undefined | ((...args: unknown[]) => unknown)
  >;
  const logMethod = consoleMethods[methodName] ?? console.error;

  return logMethod.bind(console);
};
/* eslint-enable no-console */

const CONCURRENT_UPDATES_BY_DEFAULT_OVERRIDE: null | boolean = null;
const DEFAULT_PARENT_COMPONENT: Component<unknown, unknown> | null = null;
const HYDRATION_CALLBACKS: null | SuspenseHydrationCallbacks<SuspenseInstance> =
  null;
const IDENTIFIER_PREFIX = 'quisido';
const RENDERER_PACKAGE_NAME = 'quisi.do';
const STRICT_MODE = true;
const TAG: RootTag = 1; // 0 = Legacy, 1 = Concurrent
const TRANSITION_TRACING_CALLBACKS: null | TransitionTracingCallbacks = null;

export default class QuisidoReconciler<
  Type extends string,
  Props extends Record<Type, object>,
  Txt extends TextInstance,
  Family extends { [T in Type]: Instance<Props[T], Txt, Family> }[Type],
  Root extends Container<Txt, Family>,
> implements Reconciler<
  Root,
  Family,
  Txt,
  SuspenseInstance,
  FormInstance,
  Family | Txt
> {
  #currentEventPriority: EventPriority = NoEventPriority;
  #initialChildrenFinalized = new WeakMap<Family, number>();
  #instanceCreated = new WeakMap<WeakKey, number>();
  readonly #removedInstances = new WeakSet<Family | Txt>();
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
    const reconciler = createReactReconciler<
      Type,
      Props[Type],
      Root,
      Family,
      Txt,
      never, // ActivityInstance
      SuspenseInstance,
      never, // HydratableInstance
      FormInstance,
      Family | Txt,
      HostContext<Root>,
      never, // ChildSet
      number, // TimeoutHandle
      number, // NoTimeout
      TransitionStatus,
      null, // SuspendedState
      Record<string, unknown>, // RendererInspectionConfig
      never, // FormStateMarkerInstance
      never, // HoistableRoot
      never // Resource
    >({
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

      beforeActiveInstanceBlur(): void {
        // Do nothing.
      },

      bindToConsole(
        methodName: string,
        args: unknown[],
        _badgeName: string,
      ): () => unknown {
        // React expects the console method named by `methodName` to be bound to
        // the runtime console, falling back to `console.error` when the runtime
        // does not implement that method.
        const log = pickConsoleMethod(methodName);
        return (...boundArgs: unknown[]): unknown => log(...args, ...boundArgs);
      },

      cancelTimeout,

      clearContainer(container: Root): void {
        container.clear();
      },

      commitMount(instance: Family, _type: Type, props: Props[Type]): void {
        instance.mount?.(props);
      },

      commitTextUpdate(
        textInstance: Txt,
        oldText: string,
        newText: string,
      ): void {
        textInstance.update(oldText, newText);
      },

      commitUpdate: (
        instance: Family,
        _type: Type,
        prevProps: Props[Type],
        nextProps: Props[Type],
        _internalHandle: OpaqueHandle,
      ): void => {
        // The union of instance types prevents pairing each instance with
        // its props type.
        instance.update(prevProps, nextProps);
      },

      createInstance: (
        type: Type,
        props: Props[Type],
        rootContainer: Root,
        _hostContext: HostContext<Root>,
        _internalHandle: OpaqueHandle,
      ): Family => {
        const instance: Family = createInstance(type, props, rootContainer);
        this.#instanceCreated.set(instance, Date.now());
        return instance;
      },

      createTextInstance,

      detachDeletedInstance: (node: Family): void => {
        this.#removeInstance(node);
      },

      extraDevToolsConfig: {},

      finalizeInitialChildren: (instance: Family): boolean => {
        this.#initialChildrenFinalized.set(instance, Date.now());
        return typeof instance.mount === 'function';
      },

      getChildHostContext(
        parentHostContext: HostContext<Root>,
        _type: string,
      ): HostContext<Root> {
        return parentHostContext;
      },

      getCurrentUpdatePriority: (): EventPriority => {
        return this.#currentEventPriority;
      },

      getInstanceFromNode(_node: unknown): Fiber | null | undefined {
        return null;
      },

      getInstanceFromScope(_scopeInstance: unknown): Family | null {
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

      getSuspendedCommitReason(
        _state: null,
        _rootContainer: Root,
      ): null | string {
        return null;
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
      maySuspendCommit: (type: Type, props: Props[Type]): boolean =>
        maySuspendCommit(type, props),
      maySuspendCommitInSyncRender: (type: Type, props: Props[Type]): boolean =>
        maySuspendCommit(type, props),
      maySuspendCommitOnUpdate: (
        type: Type,
        _oldProps: Props[Type],
        newProps: Props[Type],
      ): boolean => maySuspendCommit(type, newProps),
      noTimeout: -1,
      NotPendingTransition: TransitionStatus.NotPendingTransition,

      // eslint-disable-next-line no-warning-comments
      // TODO: Use this to preload external resources before rendering?
      preloadInstance(
        _instance: Family,
        _type: Type,
        _props: Props[Type],
      ): boolean {
        return true;
      },

      prepareForCommit(_containerInfo: Root): Record<string, unknown> | null {
        return null;
      },

      preparePortalMount(_containerInfo: Root): void {
        // Do nothing.
      },

      prepareScopeUpdate(_scopeInstance: unknown, _instance: unknown): void {
        // Do nothing.
      },

      removeChild: (
        parentInstance: Family,
        child: Family | Txt, // | SuspenseInstance,
      ): void => {
        parentInstance.removeChild(child);
        this.#removeInstance(child);
      },

      removeChildFromContainer: (
        container: Root,
        child: Family | Txt, // | SuspenseInstance,
      ): void => {
        container.removeChild(child);
        this.#removeInstance(child);
      },

      rendererPackageName: RENDERER_PACKAGE_NAME,
      rendererVersion: VERSION,

      requestPostPaintCallback(_callback: (time: number) => void): void {
        // Do nothing.
      },

      resetAfterCommit(_containerInfo: Root): void {
        // Do nothing.
      },

      resetFormInstance(_form: FormInstance): void {
        // Do nothing.
      },

      resetTextContent(instance: Family): void {
        instance.resetTextContent?.();
      },

      resolveEventTimeStamp(): number {
        return 0;
      },

      resolveEventType(): string | null {
        return null;
      },

      resolveUpdatePriority: (): EventPriority => {
        if (this.#currentEventPriority === NoEventPriority) {
          return DefaultEventPriority;
        }

        return this.#currentEventPriority;
      },

      scheduleMicrotask,
      scheduleTimeout,

      setCurrentUpdatePriority: (priority: EventPriority): void => {
        this.#currentEventPriority = priority;
      },

      shouldAttemptEagerTransition(): boolean {
        return true;
      },

      shouldSetTextContent,

      // TODO: This method is called just before the commit phase. Use it to set
      // up any necessary state while any Host Components that might suspend
      // this commit are evaluated to determine if the commit must be suspended.
      startSuspendingCommit(): null {
        return null;
      },

      supportsHydration: false,

      supportsMicrotasks: true,
      supportsMutation: true,
      supportsPersistence: false,

      suspendInstance(
        _state: null,
        _instance: Family,
        _type: Type,
        _props: Props[Type],
      ): void {
        // Do nothing.
      },

      suspendOnActiveViewTransition(_state: null, _rootContainer: Root): void {
        // Do nothing.
      },

      trackSchedulerEvent(): void {
        // Do nothing.
      },

      unhideInstance(instance: Family, _props: Props[Type]): void {
        // The union of instance types prevents pairing each instance with
        // its props type.
        instance.unhide(_props);
      },

      unhideTextInstance(textInstance: Txt, text: string): void {
        textInstance.unhide(text);
      },

      // TODO: This method is called after all `suspendInstance` calls are
      // complete. Return `null` if the commit can happen immediately. Return
      // `(initiateCommit: Function) => Function` if the commit must be
      // suspended. The argument to this callback will initiate the commit when
      // called. The return value is a cancellation function that the Reconciler
      // can use to abort the commit.
      waitForCommitToBeReady(
        _state: null,
        _timeoutOffset: number,
      ):
        | ((
            initiateCommit: (...args: unknown[]) => unknown,
          ) => (...args: unknown[]) => unknown)
        | null {
        return null;
      },

      warnsIfNotActing: true,
    });

    this.#reconciler = reconciler;

    // Since react-reconciler 0.34, the renderer metadata above
    // (`rendererVersion`, `rendererPackageName`, `extraDevToolsConfig`) is
    // registered with React DevTools automatically.
    reconciler.injectIntoDevTools();
  }

  #getOpaqueRoot(container: Root, onError: (error: Error) => void): OpaqueRoot {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    const opaqueRoot: OpaqueRoot | undefined = this.#opaqueRoots.get(container);
    if (typeof opaqueRoot !== 'undefined') {
      return opaqueRoot;
    }

    const reportError = (error: unknown): void => {
      onError(error instanceof Error ? error : new Error(String(error)));
    };

    const newOpaqueRoot: OpaqueRoot = this.#reconciler.createContainer(
      container,
      TAG,
      HYDRATION_CALLBACKS,
      STRICT_MODE,
      CONCURRENT_UPDATES_BY_DEFAULT_OVERRIDE,
      IDENTIFIER_PREFIX,
      (error: unknown, _info: BaseErrorInfo): void => {
        reportError(error);
      },
      (error: unknown, _info: CaughtErrorInfo): void => {
        reportError(error);
      },
      (error: unknown, _info: BaseErrorInfo): void => {
        reportError(error);
      },
      (): void => {
        // Do nothing.
      },
      TRANSITION_TRACING_CALLBACKS,
    );
    this.#opaqueRoots.set(container, newOpaqueRoot);
    return newOpaqueRoot;
  }

  #removeInstance(instance: Family | Txt): void {
    // Deletion visits descendants after effects and may revisit an instance
    // through its alternate fiber or after a direct host removal.
    if (this.#removedInstances.has(instance)) {
      return;
    }

    this.#removedInstances.add(instance);
    instance.remove?.();
  }

  public update(
    element: ReactNode,
    container: Root,
    onError: (error: Error) => void,
    callback?: (() => void) | undefined,
  ): void {
    this.updateContainerSync(
      element,
      this.#getOpaqueRoot(container, onError),
      DEFAULT_PARENT_COMPONENT,
      callback,
    );
    // Since react-reconciler 0.34, the synchronous work scheduled by
    // `updateContainerSync` must be flushed explicitly.
    this.flushSyncWork();
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

  public readonly attemptContinuousHydration: (fiber: Fiber) => void =
    this.#method('attemptContinuousHydration');

  public readonly attemptHydrationAtCurrentPriority: (fiber: Fiber) => void =
    this.#method('attemptHydrationAtCurrentPriority');

  public readonly attemptSynchronousHydration: (fiber: Fiber) => void =
    this.#method('attemptSynchronousHydration');

  public readonly batchedUpdates: <A, R>(fn: (a: A) => R, a: A) => R =
    this.#method('batchedUpdates');

  public readonly createComponentSelector: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createComponentSelector'] = this.#method('createComponentSelector');

  public readonly createContainer: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createContainer'] = this.#method('createContainer');

  public readonly createHasPseudoClassSelector: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createHasPseudoClassSelector'] = this.#method(
    'createHasPseudoClassSelector',
  );

  public readonly createHydrationContainer: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createHydrationContainer'] = this.#method('createHydrationContainer');

  public readonly createPortal: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createPortal'] = this.#method('createPortal');

  public readonly createRoleSelector: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createRoleSelector'] = this.#method('createRoleSelector');

  public readonly createTestNameSelector: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createTestNameSelector'] = this.#method('createTestNameSelector');

  public readonly createTextSelector: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['createTextSelector'] = this.#method('createTextSelector');

  public readonly defaultOnCaughtError: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['defaultOnCaughtError'] = this.#method('defaultOnCaughtError');

  public readonly defaultOnRecoverableError: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['defaultOnRecoverableError'] = this.#method('defaultOnRecoverableError');

  public readonly defaultOnUncaughtError: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['defaultOnUncaughtError'] = this.#method('defaultOnUncaughtError');

  public readonly deferredUpdates: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['deferredUpdates'] = this.#method('deferredUpdates');

  public readonly discreteUpdates: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['discreteUpdates'] = this.#method('discreteUpdates');

  public readonly findAllNodes: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['findAllNodes'] = this.#method('findAllNodes');

  public readonly findBoundingRects: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['findBoundingRects'] = this.#method('findBoundingRects');

  public readonly findHostInstance: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['findHostInstance'] = this.#method('findHostInstance');

  public readonly findHostInstanceWithNoPortals: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['findHostInstanceWithNoPortals'] = this.#method(
    'findHostInstanceWithNoPortals',
  );

  public readonly findHostInstanceWithWarning: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['findHostInstanceWithWarning'] = this.#method(
    'findHostInstanceWithWarning',
  );

  public readonly flushPassiveEffects: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['flushPassiveEffects'] = this.#method('flushPassiveEffects');

  public readonly flushSyncFromReconciler: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['flushSyncFromReconciler'] = this.#method('flushSyncFromReconciler');

  public readonly flushSyncWork: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['flushSyncWork'] = this.#method('flushSyncWork');

  public readonly focusWithin: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['focusWithin'] = this.#method('focusWithin');

  public readonly getFindAllNodesFailureDescription: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['getFindAllNodesFailureDescription'] = this.#method(
    'getFindAllNodesFailureDescription',
  );

  public readonly getPublicRootInstance: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['getPublicRootInstance'] = this.#method('getPublicRootInstance');

  public readonly injectIntoDevTools: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['injectIntoDevTools'] = this.#method('injectIntoDevTools');

  public readonly isAlreadyRendering: () => boolean =
    this.#method('isAlreadyRendering');

  public readonly observeVisibleRects: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['observeVisibleRects'] = this.#method('observeVisibleRects');

  public readonly shouldError: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['shouldError'] = this.#method('shouldError');

  public readonly shouldSuspend: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['shouldSuspend'] = this.#method('shouldSuspend');

  public readonly startHostTransition: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['startHostTransition'] = this.#method('startHostTransition');

  public readonly updateContainer: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['updateContainer'] = this.#method('updateContainer');

  public readonly updateContainerSync: Reconciler<
    Root,
    Family,
    Txt,
    SuspenseInstance,
    FormInstance,
    Family | Txt
  >['updateContainerSync'] = this.#method('updateContainerSync');
}

export type FormInstance = never;
export type SuspenseInstance = unknown;

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
    (<T extends Type>(type: T, props: Props[T]) => boolean) | undefined;
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
