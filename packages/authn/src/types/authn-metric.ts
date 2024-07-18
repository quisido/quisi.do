import { type Metric } from '@quisido/workers-shared';
import type { MetricName } from '../constants/metric-name.js';

export type AuthnMetric =
  | Metric<
      MetricName.AuthenticationCreated,
      'changes' | 'duration' | 'sizeAfter' | 'userId'
    >
  | Metric<MetricName.AuthenticationRead>
  | Metric<MetricName.AuthenticationRead, 'userId'>
  | Metric<MetricName.AuthnIdCreated, 'endTime' | 'startTime'>
  | Metric<MetricName.AuthnIdError, 'endTime' | 'startTime'>
  | Metric<MetricName.CachedAuthnId, 'expiration'>
  | Metric<MetricName.CachedAuthnId, 'expiration' | 'id'>
  | Metric<MetricName.EmailInsertError, 'duration' | 'endTime' | 'startTime'>
  | Metric<
      MetricName.EmailInsertError,
      'duration' | 'endTime' | 'startTime' | 'userId'
    >
  | Metric<
      MetricName.EmailInserted,
      | 'changes'
      | 'duration'
      | 'endTime'
      | 'lastRowId'
      | 'sizeAfter'
      | 'startTime'
      | 'userId'
    >
  | Metric<
      MetricName.EmailInserted,
      'changes' | 'duration' | 'endTime' | 'sizeAfter' | 'startTime'
    >
  | Metric<MetricName.ErrorCode, 'code'>
  | Metric<MetricName.ExpiredAuthnId, 'expiration'>
  | Metric<MetricName.ExpiredAuthnId, 'expiration' | 'id'>
  | Metric<MetricName.FaviconIco>
  | Metric<MetricName.InvalidAuthnId>
  | Metric<MetricName.InvalidAuthnId, never, 'authnId'>
  | Metric<MetricName.InvalidCookieDomain, never, 'type'>
  | Metric<MetricName.InvalidDataBucket, never, 'type'>
  | Metric<MetricName.InvalidEnvironmentName, never, 'type'>
  | Metric<MetricName.InvalidHost, never, 'type'>
  | Metric<MetricName.InvalidPatreonIdentityAttributes, never, 'type'>
  | Metric<MetricName.InvalidPrivateDataset, never, 'type'>
  | Metric<MetricName.InvalidPublicDataset, never, 'type'>
  | Metric<MetricName.InvalidTraceParent>
  | Metric<MetricName.InvalidUsageDataset, never, 'type'>
  | Metric<MetricName.MissingAuthnId>
  | Metric<MetricName.MissingCookieDomain>
  | Metric<MetricName.MissingDataBucket>
  | Metric<MetricName.MissingEnvironmentName>
  | Metric<MetricName.MissingHost>
  | Metric<MetricName.MissingIP>
  | Metric<MetricName.MissingPatreonIdentityAttributes>
  | Metric<MetricName.MissingPatreonOAuthHost>
  | Metric<MetricName.MissingPrivateDataset>
  | Metric<MetricName.MissingPublicDataset>
  | Metric<MetricName.MissingTraceParent>
  | Metric<MetricName.MissingUsageDataset>
  | Metric<MetricName.OAuthInsertError, 'duration' | 'endTime' | 'startTime'>
  | Metric<
      MetricName.OAuthInsertError,
      'duration' | 'endTime' | 'startTime' | 'userId'
    >
  | Metric<
      MetricName.OAuthInserted,
      | 'changes'
      | 'duration'
      | 'endTime'
      | 'lastRowId'
      | 'sizeAfter'
      | 'startTime'
      | 'userId'
    >
  | Metric<
      MetricName.OAuthInserted,
      'changes' | 'duration' | 'endTime' | 'sizeAfter' | 'startTime'
    >
  | Metric<
      MetricName.OAuthUserIdSelected,
      'duration' | 'rowsRead' | 'sizeAfter'
    >
  | Metric<MetricName.PatreonRequest>
  | Metric<MetricName.RobotsTxt>
  | Metric<MetricName.TooManyRequests, 'lastCallTime'>
  | Metric<MetricName.TooManyRequests, 'lastCallTime', 'ip'>
  | Metric<MetricName.UncachedAuthnId>
  | Metric<MetricName.UncachedAuthnId, never, 'authnId' | 'id'>
  | Metric<MetricName.WhoAmIRequest>
  | Metric<MetricName.WhoAmIThrottled>;
