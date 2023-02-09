import { StrictMode } from 'react';
import ROOT from './constants/root';
import App from './features/app';
import RumMetrics from './utils/rum-metrics';
import './constants/open-telemetry-provider';
import handleCloudflareAnalyticsRequest from './utils/handle-cloudflare-analytics-request';
import handleUptimeChecksRequest from './utils/handle-uptime-checks-request';

const RUM_METRICS_ACCESS_KEY = '0123-4567-89ab-cdef';
const RUM_ERROR: Error = new Error(
  'Real User Monitoring is currently disabled.',
);

const rumMetrics: RumMetrics = new RumMetrics({
  accessKey: RUM_METRICS_ACCESS_KEY,
  fetch(): never {
    throw RUM_ERROR;
  },
});

ROOT.render(
  <StrictMode>
    <App
      onCloudflareAnalyticsRequest={handleCloudflareAnalyticsRequest}
      onRumMetricsRequest={rumMetrics.handleRequest}
      onUptimeChecksRequest={handleUptimeChecksRequest}
    />
  </StrictMode>,
);
