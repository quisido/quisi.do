import { MetricName } from '../constants/metric-name.js';

const TIMESTAMP_METRIC_NAMES: ReadonlySet<MetricName> = new Set([
  MetricName.AuthenticationRead,
  MetricName.CachedAuthnId,
  MetricName.FaviconIco,
  MetricName.MissingAuthnId,
  MetricName.PatreonRequest,
  MetricName.RobotsTxt,
  MetricName.RootPathname,
  MetricName.UncachedAuthnId,
]);

export default TIMESTAMP_METRIC_NAMES;
