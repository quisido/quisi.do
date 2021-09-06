import type {
  Breadcrumb,
  BreadcrumbHint,
  Event,
  EventHint,
} from '@sentry/react';
import { ErrorBoundary } from '@sentry/react';
import type {
  CaptureContext,
  Integration,
  LogLevel,
  SamplingContext,
  SdkMetadata,
  TransactionContext,
  Transport,
  TransportClass,
  TransportOptions,
} from '@sentry/types';
import type { ReactElement, ReactNode } from 'react';
import useSentry from './sentry.view.root.hook';

interface FallbackRenderParams {
  readonly componentStack: string | null;
  readonly error: Readonly<Error>;
  readonly eventId: string | null;
  readonly resetError: () => void;
}

interface Props {
  readonly allowUrls?: (RegExp | string)[] | undefined;
  readonly attachStacktrace?: boolean | undefined;
  readonly autoSessionTracking?: boolean | undefined;
  readonly children: ReactNode;
  readonly debug?: boolean | undefined;
  readonly defaultIntegrations?: false | readonly Integration[];
  readonly denyUrls?: (RegExp | string)[] | undefined;
  readonly dist?: string | undefined;
  readonly dsn?: string | undefined;
  readonly enabled?: boolean | undefined;
  readonly environment?: string | undefined;
  readonly experiments?: Record<string, unknown> | undefined;
  readonly ignoreErrors?: (RegExp | string)[] | undefined;
  readonly initialScope?: CaptureContext | undefined;
  readonly logLevel?: LogLevel;
  readonly maxBreadcrumbs?: number | undefined;
  readonly maxValueLength?: number | undefined;
  readonly metadata?: SdkMetadata | undefined;
  readonly normalizeDepth?: number | undefined;
  readonly org?: string | undefined;
  readonly release?: string | undefined;
  readonly sampleRate?: number | undefined;
  readonly shutdownTimeout?: number | undefined;
  readonly tracesSampleRate?: number | undefined;
  readonly transport?: TransportClass<Transport> | undefined;
  readonly transportOptions?: TransportOptions | undefined;
  readonly tunnel?: string | undefined;
  readonly integrations?:
    | undefined
    | readonly Integration[]
    | ((
        integrations: readonly Readonly<Integration>[],
      ) => readonly Integration[]);
  readonly beforeBreadcrumb?:
    | undefined
    | ((
        breadcrumb: Readonly<Breadcrumb>,
        hint?: BreadcrumbHint,
      ) => Breadcrumb | null);
  readonly beforeSend?:
    | undefined
    | ((
        event: Readonly<Event>,
        hint?: EventHint,
      ) => PromiseLike<Event | null> | Event | null);
  readonly tracesSampler?:
    | undefined
    | ((
        samplingContext: Readonly<
          Omit<SamplingContext, 'transactionContext'>
        > & { readonly transactionContext: Readonly<TransactionContext> },
      ) => number | boolean);
}

const errorBoundaryFallback = ({
  error,
  resetError,
}: FallbackRenderParams): ReactElement => (
  <>
    <strong>An error occurred while rendering the application:</strong>
    <span>{error.message}</span> <button onClick={resetError}>Retry</button>
  </>
);

export default function Sentry({
  children,
  environment,
  allowUrls,
  attachStacktrace,
  autoSessionTracking,
  beforeBreadcrumb,
  beforeSend,
  debug,
  defaultIntegrations,
  denyUrls,
  dist,
  dsn,
  enabled,
  experiments,
  ignoreErrors,
  initialScope,
  integrations,
  logLevel,
  maxBreadcrumbs,
  maxValueLength,
  metadata,
  normalizeDepth,
  org,
  release,
  sampleRate,
  shutdownTimeout,
  tracesSampleRate,
  tracesSampler,
  transport,
  transportOptions,
  tunnel,
}: Props): ReactElement {
  useSentry({
    allowUrls,
    attachStacktrace,
    autoSessionTracking,
    beforeBreadcrumb,
    beforeSend,
    denyUrls,
    debug,
    defaultIntegrations,
    dist,
    dsn,
    enabled,
    environment,
    experiments,
    ignoreErrors,
    initialScope,
    integrations,
    logLevel,
    maxBreadcrumbs,
    maxValueLength,
    metadata,
    normalizeDepth,
    org,
    release,
    sampleRate,
    shutdownTimeout,
    tracesSampleRate,
    tracesSampler,
    transport,
    transportOptions,
    tunnel,
  });

  return (
    <ErrorBoundary fallback={errorBoundaryFallback}>{children}</ErrorBoundary>
  );
}
