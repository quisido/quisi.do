import { FetchHandler } from '@quisido/worker';
import getCookieDomain from './get-cookie-domain.js';
import getHost from './get-host.js';
import handleFetchRequest from './handle-fetch-request.js';

export default class AuthnFetchHandler extends FetchHandler {
  public constructor() {
    // Consider: `onMetric(metric: Metric): void` here at the top level
    // That can be where metrics are pushed to AnalyticsEngine or
    // Logged, etc. Instead of doing the metric implementation every
    // `emit()`, trickle it up to the one defined event listener at the
    // `Handler` constructor.
    super(handleFetchRequest);
    // InvalidPrivateDatasetMetric: new Metric(MetricName.InvalidPrivateDataset, {}),
    // InvalidPublicDatasetMetricName: new Metric(MetricName.InvalidPublicDataset, {}),
    // InvalidTraceParentMetricName: new Metric(MetricName.InvalidTraceParent, {}),
    // // InvalidUsageDatasetMetricName: new Metric(MetricName.InvalidUsageDataset, {}),
    // MissingPrivateDatasetMetricName: new Metric(MetricName.MissingPrivateDataset, {}),
    // MissingPublicDatasetMetricName: new Metric(MetricName.MissingPublicDataset, {}),
    // MissingTraceParentMetricName: new Metric(MetricName.MissingTraceParent, {}),
    // // MissingUsageDatasetMetricName: new Metric(MetricName.MissingUsageDataset, {}),
    // OnFetchError: handleFetchError,
  }

  public get cookieDomain(): string {
    return getCookieDomain.call(this);
  }

  public get host(): string {
    return getHost.call(this);
  }
}
