'use client';

import useDatadog, { type Props } from 'react-datadog';
import { GITHUB_SHA } from '../constants/github-sha.js';
import validateString from '../utils/validate-string.js';

const APPLICATION_ID: string = validateString(process.env['DD_APPLICATION_ID']);
const CLIENT_TOKEN: string = validateString(process.env['DD_CLIENT_TOKEN']);
const EXPERIMENTAL_FEATURES: string[] = ['feature_flags'];

const PROPS: Required<
  Omit<
    Props,
    | 'actionNameAttribute'
    | 'allowedTracingUrls'
    | 'beforeSend'
    | 'betaPlugins'
    | 'datacenter'
    | 'excludedActivityUrls'
    | 'internalAnalyticsSubdomain'
    | 'proxy'
    | 'remoteConfigurationId'
    | 'replica'
    | 'subdomain'
    | 'useCrossSiteSessionCookie'
    | 'user'
    | 'workerUrl'
  >
> = {
  allowFallbackToLocalStorage: true,
  allowUntrustedEvents: true,
  applicationId: APPLICATION_ID,
  clientToken: CLIENT_TOKEN,
  compressIntakeRequests: true,
  defaultPrivacyLevel: 'mask-user-input',
  enableExperimentalFeatures: EXPERIMENTAL_FEATURES,
  enablePrivacyForActionName: true,
  enabled: true,
  env: process.env.NODE_ENV,
  service: 'quisi.do',
  sessionReplayRecording: true,
  sessionReplaySampleRate: 100,
  sessionSampleRate: 100,
  silentMultipleInit: true,
  site: 'datadoghq.com',
  startSessionReplayRecordingManually: false,
  storeContextsAcrossPages: true,
  telemetryConfigurationSampleRate: 100,
  telemetrySampleRate: 100,
  telemetryUsageSampleRate: 100,
  traceContextInjection: 'all',
  traceSampleRate: 100,
  trackLongTasks: true,
  trackResources: true,
  trackSessionAcrossSubdomains: true,
  trackUserInteractions: true,
  trackViewsManually: false,
  trackingConsent: 'not-granted',
  usePartitionedCrossSiteSessionCookie: true,
  useSecureSessionCookie: true,
  version: GITHUB_SHA ?? 'unknown',
};

export default function Datadog(): null {
  useDatadog(PROPS);
  return null;
}
