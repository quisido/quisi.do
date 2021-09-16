import type { RumInitConfiguration } from '@datadog/browser-rum';
import { datadogRum } from '@datadog/browser-rum';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';

interface ReadonlyRumInitConfiguration {
  readonly allowedTracingOrigins?: readonly (RegExp | string)[] | undefined;
  readonly enableExperimentalFeatures?: readonly string[] | undefined;
  readonly replica?: ReplicaUserConfiguration;
}

interface ReplicaUserConfiguration {
  readonly applicationId?: string;
  readonly clientToken: string;
}

interface Props
  extends Omit<
      RumInitConfiguration,
      | 'allowedTracingOrigins'
      | 'enableExperimentalFeatures'
      | 'proxyHost'
      | 'replica'
    >,
    ReadonlyRumInitConfiguration {
  readonly children: ReactNode;
  readonly sessionReplayRecording?: boolean | undefined;
}

const DEFAULT_SAMPLE_RATE = 100;

export default function DataDog({
  actionNameAttribute,
  allowedTracingOrigins,
  applicationId,
  beforeSend,
  children,
  clientToken,
  enableExperimentalFeatures,
  env,
  initialPrivacyLevel,
  intakeApiVersion,
  internalMonitoringApiKey,
  proxyUrl,
  replaySampleRate,
  replica,
  sampleRate = DEFAULT_SAMPLE_RATE,
  service,
  sessionReplayRecording = true,
  silentMultipleInit,
  site = 'datadoghq.com',
  trackInteractions = true,
  trackSessionAcrossSubdomains,
  trackViewsManually,
  useAlternateIntakeDomains,
  useCrossSiteSessionCookie,
  useSecureSessionCookie,
  version,
}: Readonly<Props>): ReactElement {
  useEffect((): void => {
    const config: RumInitConfiguration = {
      applicationId,
      clientToken,
      site,
      sampleRate,
      trackInteractions,
    };
    if (typeof actionNameAttribute !== 'undefined') {
      config.actionNameAttribute = actionNameAttribute;
    }
    if (typeof allowedTracingOrigins !== 'undefined') {
      config.allowedTracingOrigins = [...allowedTracingOrigins];
    }
    if (typeof beforeSend !== 'undefined') {
      config.beforeSend = beforeSend;
    }
    if (typeof enableExperimentalFeatures !== 'undefined') {
      config.enableExperimentalFeatures = [...enableExperimentalFeatures];
    }
    if (typeof env !== 'undefined') {
      config.env = env;
    }
    if (typeof internalMonitoringApiKey !== 'undefined') {
      config.internalMonitoringApiKey = internalMonitoringApiKey;
    }
    if (typeof initialPrivacyLevel !== 'undefined') {
      config.initialPrivacyLevel = initialPrivacyLevel;
    }
    if (typeof intakeApiVersion !== 'undefined') {
      config.intakeApiVersion = intakeApiVersion;
    }
    if (typeof proxyUrl !== 'undefined') {
      config.proxyUrl = proxyUrl;
    }
    if (typeof replaySampleRate !== 'undefined') {
      config.replaySampleRate = replaySampleRate;
    }
    if (typeof replica !== 'undefined') {
      config.replica = { ...replica };
    }
    if (typeof service !== 'undefined') {
      config.service = service;
    }
    if (typeof silentMultipleInit !== 'undefined') {
      config.silentMultipleInit = silentMultipleInit;
    }
    if (typeof trackSessionAcrossSubdomains !== 'undefined') {
      config.trackSessionAcrossSubdomains = trackSessionAcrossSubdomains;
    }
    if (typeof trackViewsManually !== 'undefined') {
      config.trackViewsManually = trackViewsManually;
    }
    if (typeof useAlternateIntakeDomains !== 'undefined') {
      config.useAlternateIntakeDomains = useAlternateIntakeDomains;
    }
    if (typeof useCrossSiteSessionCookie !== 'undefined') {
      config.useCrossSiteSessionCookie = useCrossSiteSessionCookie;
    }
    if (typeof useSecureSessionCookie !== 'undefined') {
      config.useSecureSessionCookie = useSecureSessionCookie;
    }
    if (typeof version !== 'undefined') {
      config.version = version;
    }
    datadogRum.init(config);
  }, [
    actionNameAttribute,
    allowedTracingOrigins,
    applicationId,
    beforeSend,
    clientToken,
    enableExperimentalFeatures,
    env,
    initialPrivacyLevel,
    intakeApiVersion,
    internalMonitoringApiKey,
    proxyUrl,
    replaySampleRate,
    replica,
    sampleRate,
    service,
    silentMultipleInit,
    site,
    trackInteractions,
    trackSessionAcrossSubdomains,
    trackViewsManually,
    useAlternateIntakeDomains,
    useCrossSiteSessionCookie,
    useSecureSessionCookie,
    version,
  ]);

  useEffect((): undefined | VoidFunction => {
    if (!sessionReplayRecording) {
      return;
    }

    datadogRum.startSessionReplayRecording();
    return (): void => {
      datadogRum.stopSessionReplayRecording();
    };
  }, [sessionReplayRecording]);

  return <>{children}</>;
}
