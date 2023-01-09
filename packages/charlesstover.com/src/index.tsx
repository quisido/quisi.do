import { StrictMode } from 'react';
import ROOT from './constants/root';
import App from './features/app';
import RumMetrics from './utils/rum-metrics';

// const CLOUDFLARE_GRAPHQL_ANALYTICS_TOKEN =
//   't1MqGb9MXf5Tt8kdT5_WimPe3pE8HY31cWkSbMCx';
const RUM_METRICS_ACCESS_KEY = '0123-4567-89ab-cdef';

const rumMetrics: RumMetrics = new RumMetrics({
  accessKey: RUM_METRICS_ACCESS_KEY,
  fetch: window.fetch.bind(window),
});

ROOT.render(
  <StrictMode>
    <App onRumMetricsRequest={rumMetrics.handleRequest} />
  </StrictMode>,
);
