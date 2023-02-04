import { StrictMode } from 'react';
import ROOT from './constants/root';
import App from './features/app';
import RumMetrics from './utils/rum-metrics';
import './constants/open-telemetry-provider';

// const CLOUDFLARE_GRAPHQL_ANALYTICS_TOKEN =
//   't1MqGb9MXf5Tt8kdT5_WimPe3pE8HY31cWkSbMCx';
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
    <App onRumMetricsRequest={rumMetrics.handleRequest} />
  </StrictMode>,
);

/*
fetch('https://api.cloudflare.com/client/v4/graphql', {
  body: JSON.stringify({
    query: `{
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      firewallEventsAdaptive(
        limit: 10
        orderBy: [datetime_DESC]
      ) {
        action
        clientAsn
        clientCountryName
        clientIP
        clientRequestPath
        clientRequestQuery
        datetime
        source
        userAgent
      }
    }
  }
}`,
    variables: {
      zoneTag: 'f6bf27c1cb4d60471e5684a9e4bed29f',
      // filter: {
      //   datetime_geq: new Date(
      //     Date.now() - 1000 * 60 * 60 * 24 * 30,
      //   ).toISOString(),
      //   datetime_leq: new Date().toISOString(),
      // },
    },
  }),
  headers: {
    Authorization: `Bearer ${CLOUDFLARE_GRAPHQL_ANALYTICS_TOKEN}`,
    'Content-Type': 'application/json',
    'X-Auth-Email': 'cloudflare@charlesstover.com',
  },
  method: 'POST',
  mode: 'no-cors',
})
  .then(console.log)
  .catch(console.error);
*/
