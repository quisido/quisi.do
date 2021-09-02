import type { History } from 'history';
import type {
  Breadcrumb,
  BreadcrumbHint,
  Event,
  EventHint,
} from '@sentry/react';
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
import useFullStory from './monitoring.root.fullstory.hook';
import useSentry from './monitoring.root.sentry.hook';

interface Props {
  readonly baseSentryUrl: string | undefined;
  readonly environment: string | undefined;
  readonly fullStoryDebug: boolean | undefined;
  readonly fullStoryDevMode: boolean | undefined;
  readonly fullStoryHost: string | undefined;
  readonly fullStoryNamespace: string | undefined;
  readonly fullStoryOrgId: string | undefined;
  readonly fullStoryRecordCrossDomainIFrames: boolean | undefined;
  readonly fullStoryRecordOnlyThisIFrame: boolean | undefined;
  readonly fullStoryScript: string | undefined;
  readonly history: History<unknown> | undefined;
  readonly sentryAllowUrls: (RegExp | string)[] | undefined;
  readonly sentryAttachStacktrace: boolean | undefined;
  readonly sentryAutoSessionTracking: boolean | undefined;
  readonly sentryDebug: boolean | undefined;
  readonly sentryDenyUrls: (RegExp | string)[] | undefined;
  readonly sentryDist: string | undefined;
  readonly sentryDsn: string | undefined;
  readonly sentryEnabled: boolean | undefined;
  readonly sentryExperiments: Record<string, unknown> | undefined;
  readonly sentryIgnoreErrors: (RegExp | string)[] | undefined;
  readonly sentryInitialScope: CaptureContext | undefined;
  readonly sentryLogLevel: LogLevel | undefined;
  readonly sentryMaxBreadcrumbs: number | undefined;
  readonly sentryMaxValueLength: number | undefined;
  readonly sentryMetadata: SdkMetadata | undefined;
  readonly sentryNormalizeDepth: number | undefined;
  readonly sentryOrg: string | undefined;
  readonly sentrySampleRate: number | undefined;
  readonly sentryShutdownTimeout: number | undefined;
  readonly sentryTracesSampleRate: number | undefined;
  readonly sentryTransport: TransportClass<Transport> | undefined;
  readonly sentryTransportOptions: TransportOptions | undefined;
  readonly sentryTunnel: string | undefined;
  readonly version: string | undefined;
  readonly sentryDefaultIntegrations:
    | false
    | undefined
    | readonly Integration[];
  readonly sentryIntegrations:
    | undefined
    | readonly Integration[]
    | ((
        integrations: readonly Readonly<Integration>[],
      ) => readonly Integration[]);
  readonly sentryBeforeBreadcrumb:
    | undefined
    | ((
        breadcrumb: Readonly<Breadcrumb>,
        hint?: BreadcrumbHint,
      ) => Breadcrumb | null);
  readonly sentryBeforeSend:
    | undefined
    | ((
        event: Readonly<Event>,
        hint?: EventHint,
      ) => PromiseLike<Event | null> | Event | null);
  readonly sentryTracesSampler:
    | undefined
    | ((
        samplingContext: Readonly<
          Omit<SamplingContext, 'transactionContext'>
        > & { readonly transactionContext: Readonly<TransactionContext> },
      ) => number | boolean);
}

export default function useMonitoring({
  baseSentryUrl,
  environment,
  fullStoryDebug,
  fullStoryDevMode,
  fullStoryHost,
  fullStoryNamespace,
  fullStoryOrgId,
  fullStoryRecordCrossDomainIFrames,
  fullStoryRecordOnlyThisIFrame,
  fullStoryScript,
  history,
  sentryAllowUrls,
  sentryAttachStacktrace,
  sentryAutoSessionTracking,
  sentryBeforeBreadcrumb,
  sentryBeforeSend,
  sentryDebug,
  sentryDefaultIntegrations,
  sentryDenyUrls,
  sentryDist,
  sentryDsn,
  sentryEnabled,
  sentryExperiments,
  sentryIgnoreErrors,
  sentryInitialScope,
  sentryIntegrations,
  sentryLogLevel,
  sentryMaxBreadcrumbs,
  sentryMaxValueLength,
  sentryMetadata,
  sentryNormalizeDepth,
  sentryOrg,
  sentrySampleRate,
  sentryShutdownTimeout,
  sentryTracesSampleRate,
  sentryTracesSampler,
  sentryTransport,
  sentryTransportOptions,
  sentryTunnel,
  version,
}: Props): void {
  useFullStory({
    debug: fullStoryDebug,
    devMode: fullStoryDevMode,
    host: fullStoryHost,
    namespace: fullStoryNamespace,
    orgId: fullStoryOrgId,
    recordCrossDomainIFrames: fullStoryRecordCrossDomainIFrames,
    recordOnlyThisIFrame: fullStoryRecordOnlyThisIFrame,
    script: fullStoryScript,
  });

  useSentry({
    allowUrls: sentryAllowUrls,
    attachStacktrace: sentryAttachStacktrace,
    autoSessionTracking: sentryAutoSessionTracking,
    baseSentryUrl,
    beforeBreadcrumb: sentryBeforeBreadcrumb,
    beforeSend: sentryBeforeSend,
    debug: sentryDebug,
    defaultIntegrations: sentryDefaultIntegrations,
    denyUrls: sentryDenyUrls,
    dist: sentryDist,
    dsn: sentryDsn,
    enabled: sentryEnabled,
    environment,
    experiments: sentryExperiments,
    history,
    ignoreErrors: sentryIgnoreErrors,
    initialScope: sentryInitialScope,
    integrations: sentryIntegrations,
    logLevel: sentryLogLevel,
    maxBreadcrumbs: sentryMaxBreadcrumbs,
    maxValueLength: sentryMaxValueLength,
    metadata: sentryMetadata,
    normalizeDepth: sentryNormalizeDepth,
    org: sentryOrg,
    release: version,
    sampleRate: sentrySampleRate,
    shutdownTimeout: sentryShutdownTimeout,
    tracesSampleRate: sentryTracesSampleRate,
    tracesSampler: sentryTracesSampler,
    transport: sentryTransport,
    transportOptions: sentryTransportOptions,
    tunnel: sentryTunnel,
  });
}
