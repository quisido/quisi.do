'use client';

import useDatadog, { type Props } from 'react-datadog';
import { GITHUB_SHA } from '../constants/github-sha.js';
import validateString from '../utils/validate-string.js';

const APPLICATION_ID: string = validateString(process.env['DD_APPLICATION_ID']);
const CLIENT_TOKEN: string = validateString(process.env['DD_CLIENT_TOKEN']);
const EXPERIMENTAL_FEATURES: string[] = ['feature_flags'];

export default function Datadog(): null {
  useDatadog({
    allowFallbackToLocalStorage: true,
    allowUntrustedEvents: true,
    applicationId: APPLICATION_ID,
    clientToken: CLIENT_TOKEN,
    compressIntakeRequests: true,
    defaultPrivacyLevel: 'mask-user-input',
    enabled: true,
    enableExperimentalFeatures: EXPERIMENTAL_FEATURES,
    env: process.env.NODE_ENV,
    service: 'quisi.do',
    sessionReplayRecording: true,
    sessionReplaySampleRate: 100,
    sessionSampleRate: 100,
    silentMultipleInit: true,
    site: 'datadoghq.com',
    storeContextsAcrossPages: true,
    startSessionReplayRecordingManually: false,
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
  } satisfies Required<
    Omit<
      Props,
      | 'actionNameAttribute'
      | 'allowedTracingUrls'
      | 'beforeSend'
      | 'datacenter'
      | 'excludedActivityUrls'
      | 'internalAnalyticsSubdomain'
      | 'proxy'
      | 'replica'
      | 'subdomain'
      | 'useCrossSiteSessionCookie'
      | 'user'
      | 'workerUrl'
    >
  >);

  return null;
}
