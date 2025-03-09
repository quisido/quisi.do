import type { ReactElement } from 'react';
import Preconnect from '../components/preconnect.js';

/**
 * Additional works that have yet to be integrated:
 * - https://mixpanel.com
 * - https://plausible.io
 * - https://rpm.newrelic.com
 * - https://stats.opencensus.io
 */

export default function PreconnectFeature(): ReactElement {
  return (
    <>
      <Preconnect>https://analytics.google.com</Preconnect>
      <Preconnect>https://api.honeycomb.io</Preconnect>
      <Preconnect>https://cdn.logr-ingest.com</Preconnect>
      <Preconnect>https://challenges.cloudflare.com</Preconnect>
      <Preconnect>https://clarity.ms</Preconnect>
      {process.env.NODE_ENV === 'production' && (
        <Preconnect>https://cloudflareinsights.com</Preconnect>
      )}
      <Preconnect>https://edge.fullstory.com</Preconnect>
      <Preconnect>https://fonts.googleapis.com</Preconnect>
      {/* <Preconnect>https://fonts.gstatic.com</Preconnect> */}
      <Preconnect>https://o592283.ingest.sentry.io</Preconnect>
      <Preconnect>https://r.logr-ingest.com</Preconnect>
      <Preconnect>https://rs.fullstory.com</Preconnect>
      <Preconnect>https://rum.browser-intake-datadoghq.com</Preconnect>
      <Preconnect>
        https://session-replay.browser-intake-datadoghq.com
      </Preconnect>
      <Preconnect>https://static.cloudflareinsights.com</Preconnect>
      <Preconnect>https://t.clarity.ms</Preconnect>
      <Preconnect>https://www.google-analytics.com</Preconnect>
      <Preconnect>https://www.googletagmanager.com</Preconnect>
    </>
  );
}
