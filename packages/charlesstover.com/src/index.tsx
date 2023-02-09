import { StrictMode } from 'react';
import ROOT from './constants/root';
import App from './features/app';
import RumMetrics from './utils/rum-metrics';
import './constants/open-telemetry-provider';
import handleCloudflareAnalyticsRequest from './utils/handle-cloudflare-analytics-request';
import handleUptimeChecksRequest from './utils/handle-uptime-checks-request';
import CLOUDFLARE_ANALYTICS_API_URL from './constants/cloudflare-analytics-api-url';
import CloudflareAnalytics from './types/types';

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

const handleCloudflareAnalyticsRequest =
  async (): Promise<CloudflareAnalytics> => {
    const response: Response = await fetch(CLOUDFLARE_ANALYTICS_API_URL);
    return await response.json();
  };

ROOT.render(
  <StrictMode>
    <App
      onCloudflareAnalyticsRequest={handleCloudflareAnalyticsRequest}
      onRumMetricsRequest={rumMetrics.handleRequest}
      onUptimeChecksRequest={handleUptimeChecksRequest}
    />
  </StrictMode>,
);
