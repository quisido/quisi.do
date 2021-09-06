import type {
  Breadcrumb,
  BreadcrumbHint,
  BrowserOptions,
  Event,
  EventHint,
} from '@sentry/react';
import { init } from '@sentry/react';
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
import { useEffect } from 'react';

interface Props {
  readonly allowUrls: readonly (RegExp | string)[] | undefined;
  readonly attachStacktrace: boolean | undefined;
  readonly autoSessionTracking: boolean | undefined;
  readonly debug: boolean | undefined;
  readonly defaultIntegrations: false | undefined | readonly Integration[];
  readonly denyUrls: readonly (RegExp | string)[] | undefined;
  readonly dist: string | undefined;
  readonly dsn: string | undefined;
  readonly enabled: boolean | undefined;
  readonly environment: string | undefined;
  readonly experiments: Record<string, unknown> | undefined;
  readonly ignoreErrors: readonly (RegExp | string)[] | undefined;
  readonly initialScope: CaptureContext | undefined;
  readonly logLevel: LogLevel | undefined;
  readonly maxBreadcrumbs: number | undefined;
  readonly maxValueLength: number | undefined;
  readonly metadata: SdkMetadata | undefined;
  readonly normalizeDepth: number | undefined;
  readonly org: string | undefined;
  readonly release: string | undefined;
  readonly sampleRate: number | undefined;
  readonly shutdownTimeout: number | undefined;
  readonly tracesSampleRate: number | undefined;
  readonly transport: TransportClass<Transport> | undefined;
  readonly transportOptions: TransportOptions | undefined;
  readonly tunnel: string | undefined;
  readonly integrations:
    | undefined
    | readonly Integration[]
    | ((
        integrations: readonly Readonly<Integration>[],
      ) => readonly Integration[]);
  readonly beforeBreadcrumb:
    | undefined
    | ((
        breadcrumb: Readonly<Breadcrumb>,
        hint?: BreadcrumbHint,
      ) => Breadcrumb | null);
  readonly beforeSend:
    | undefined
    | ((
        event: Readonly<Event>,
        hint?: EventHint,
      ) => PromiseLike<Event | null> | Event | null);
  readonly tracesSampler:
    | undefined
    | ((
        samplingContext: Readonly<
          Omit<SamplingContext, 'transactionContext'>
        > & { readonly transactionContext: Readonly<TransactionContext> },
      ) => number | boolean);
}

export default function useSentry({
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
}: Props): void {
  useEffect((): void => {
    const options: BrowserOptions = {};

    // This can be simplified when `SnippetOptions` is refactored to support
    //   TypeScript 4.4's `exactOptionalPropertyTypes`.
    // https://github.com/getsentry/sentry-javascript/pull/3958
    // https://github.com/getsentry/sentry-javascript/pull/3959
    if (typeof allowUrls !== 'undefined') {
      options.allowUrls = [...allowUrls];
    }
    if (typeof attachStacktrace !== 'undefined') {
      options.attachStacktrace = attachStacktrace;
    }
    if (typeof autoSessionTracking !== 'undefined') {
      options.autoSessionTracking = autoSessionTracking;
    }
    if (typeof beforeBreadcrumb !== 'undefined') {
      options.beforeBreadcrumb = beforeBreadcrumb;
    }
    if (typeof beforeSend !== 'undefined') {
      options.beforeSend = beforeSend;
    }
    if (typeof debug !== 'undefined') {
      options.debug = debug;
    }
    if (typeof defaultIntegrations !== 'undefined') {
      if (typeof defaultIntegrations === 'boolean') {
        options.defaultIntegrations = defaultIntegrations;
      } else {
        options.defaultIntegrations = [...defaultIntegrations];
      }
    }
    if (typeof denyUrls !== 'undefined') {
      options.denyUrls = [...denyUrls];
    }
    if (typeof dist !== 'undefined') {
      options.dist = dist;
    }
    if (typeof dsn !== 'undefined') {
      options.dsn = dsn;
    }
    if (typeof enabled !== 'undefined') {
      options.enabled = enabled;
    }
    if (typeof environment !== 'undefined') {
      options.environment = environment;
    }
    if (typeof experiments !== 'undefined') {
      options._experiments = experiments;
    }
    if (typeof ignoreErrors !== 'undefined') {
      options.ignoreErrors = [...ignoreErrors];
    }
    if (typeof initialScope !== 'undefined') {
      options.initialScope = initialScope;
    }
    if (typeof integrations !== 'undefined') {
      if (typeof integrations === 'function') {
        options.integrations = (
          oldIntegrations: readonly Readonly<Integration>[],
        ): Integration[] => [...integrations(oldIntegrations)];
      } else {
        options.integrations = [...integrations];
      }
    }
    if (typeof logLevel !== 'undefined') {
      options.logLevel = logLevel;
    }
    if (typeof maxBreadcrumbs !== 'undefined') {
      options.maxBreadcrumbs = maxBreadcrumbs;
    }
    if (typeof maxValueLength !== 'undefined') {
      options.maxValueLength = maxValueLength;
    }
    if (typeof metadata !== 'undefined') {
      options._metadata = metadata;
    }
    if (typeof normalizeDepth !== 'undefined') {
      options.normalizeDepth = normalizeDepth;
    }
    if (typeof release !== 'undefined') {
      options.release = release;
    }
    if (typeof sampleRate !== 'undefined') {
      options.sampleRate = sampleRate;
    }
    if (typeof shutdownTimeout !== 'undefined') {
      options.shutdownTimeout = shutdownTimeout;
    }
    if (typeof tracesSampleRate !== 'undefined') {
      options.tracesSampleRate = tracesSampleRate;
    }
    if (typeof tracesSampler !== 'undefined') {
      options.tracesSampler = tracesSampler;
    }
    if (typeof transport !== 'undefined') {
      options.transport = transport;
    }
    if (typeof transportOptions !== 'undefined') {
      options.transportOptions = transportOptions;
    }
    if (typeof tunnel !== 'undefined') {
      options.tunnel = tunnel;
    }

    init(options);
  }, [
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
  ]);
}
