import { type ReactElement } from "react";

const isDevelopment: boolean = process.env.NODE_ENV === 'development'

const CONNECT_SRC: string = [
  "'self'",
  'a.quisi.do',

  // Clarity
  'p.clarity.ms',
  't.clarity.ms',
  'w.clarity.ms',

  // Cloudflare Insights
  'cloudflareinsights.com',
  'static.cloudflareinsights.com',

  // CloudWatch RUM
  'cognito-identity.us-west-2.amazonaws.com',
  'dataplane.rum.us-west-2.amazonaws.com',
  'sts.us-west-2.amazonaws.com',

  // Fullstory
  'edge.fullstory.com',
  'rs.fullstory.com',

  // Google Analytics
  'analytics.google.com',
  'stats.g.doubleclick.net',

  // LogRocket
  'r.logr-ingest.com',

  // Sentry
  'o592283.ingest.sentry.io',

  // Who am I?
  ...(isDevelopment ? ['localhost:5882'] : []),
].join(' ');

const FRAME_SRC: string = [
  // Google Analytics
  'td.doubleclick.net',
].join(' ');

const IMG_SRC: string = [
  "'self'",

  // Clarity
  'c.bing.com',
  'c.clarity.ms',

  // Mixpanel
  'api-js.mixpanel.com',
].join(' ');

/**
 *   During development, `eval-source-map` uses `eval` to create source files
 * with source maps for browser devtools.
 */
const SCRIPT_SRC: string = isDevelopment ? "'unsafe-eval'" : "'none'";

const SCRIPT_SRC_ELEM: string = [
  "'self'",

  /**
   *   'unsafe-inline' is only used for NextJS's appending several <script> to
   * the bottom of <body>.
   */
  "'unsafe-inline'",

  // Clarity
  'www.clarity.ms',

  // Cloudflare Insights
  'static.cloudflareinsights.com',

  // Fullstory
  'edge.fullstory.com',

  // Google Analytics
  'www.googletagmanager.com',

  // LogRocket
  'cdn.logr-ingest.com',
].join(' ');

const STYLE_SRC: string = [
  "'self'",
  "'unsafe-inline'",

  // Google Fonts
  'fonts.googleapis.com',
].join(' ');

const CONTENT: string = [
  "child-src 'none'",
  `connect-src ${CONNECT_SRC}`,
  "default-src 'none'",
  "font-src fonts.gstatic.com",
  `frame-src ${FRAME_SRC}`,
  `img-src ${IMG_SRC}`,
  "manifest-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  `script-src ${SCRIPT_SRC}`,
  "script-src-attr 'none'",
  `script-src-elem ${SCRIPT_SRC_ELEM}`,
  "style-src 'none'",
  "style-src-attr 'unsafe-inline'",
  `style-src-elem ${STYLE_SRC}`,
  `worker-src blob:`,
  'report-to quisido',
].join('; ');

export default function ContentSecurityPolicy(): ReactElement {
  return (
    <>
      <meta
        content=''
        httpEquiv="Reporting-Endpoints"
      />
      <meta
        content={CONTENT}
        httpEquiv="Content-Security-Policy"
      />
    </>
  );
}
