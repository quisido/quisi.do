import { type ReactElement } from "react";

const isDevelopment: boolean = process.env.NODE_ENV === 'development'

const CONNECT_SRC: string = [
  "'self'",
  'https://a.quisi.do',

  // Clarity
  'https://a.clarity.ms',
  'https://p.clarity.ms',
  'https://q.clarity.ms',
  'https://s.clarity.ms',
  'https://t.clarity.ms',
  'https://u.clarity.ms',
  'https://v.clarity.ms',
  'https://w.clarity.ms',
  'https://x.clarity.ms',
  'https://y.clarity.ms',
  'https://z.clarity.ms',

  // Cloudflare Insights
  'https://cloudflareinsights.com',
  'https://static.cloudflareinsights.com',

  // CloudWatch RUM
  'https://cognito-identity.us-west-2.amazonaws.com',
  'https://dataplane.rum.us-west-2.amazonaws.com',
  'https://sts.us-west-2.amazonaws.com',

  // Fullstory
  'https://edge.fullstory.com',
  'https://rs.fullstory.com',

  // Google Analytics
  'https://analytics.google.com',
  'https://region1.analytics.google.com',
  'https://stats.g.doubleclick.net',

  // LogRocket
  'https://r.logr-ingest.com',

  // Sentry
  'https://o592283.ingest.sentry.io',

  // Who am I?
  ...(isDevelopment ? ['https://localhost:5882'] : []),
].join(' ');

const FRAME_SRC: string = [
  // Google Analytics
  'https://td.doubleclick.net',
].join(' ');

const IMG_SRC: string = [
  "'self'",

  // Clarity
  'https://c.bing.com',
  'https://c.clarity.ms',

  // Google Analytics
  'https://www.google.co.in',
  'https://www.google.co.kr',
  'https://www.google.com.ar',
  'https://www.google.com.pk',
  'https://www.google.com.sg',
  'https://www.google.de',

  // Mixpanel
  'https://api-js.mixpanel.com',
].join(' ');

const SCRIPT_SRC_ELEM: string = [
  "'self'",

  /**
   *   'unsafe-inline' is only used for NextJS's appending several <script> to
   * the bottom of <body>.
   */
  "'unsafe-inline'",

  // Clarity
  'https://www.clarity.ms',

  // Cloudflare Insights
  'https://static.cloudflareinsights.com',

  // Fullstory
  'https://edge.fullstory.com',

  // Google Analytics
  'https://www.googletagmanager.com',

  // LogRocket
  'https://cdn.logr-ingest.com',
].join(' ');

const STYLE_SRC: string = [
  "'self'",
  "'unsafe-inline'",

  // Google Fonts
  'https://fonts.googleapis.com',
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
  "script-src-attr 'none'",
  `script-src-elem ${SCRIPT_SRC_ELEM}`,
  "style-src-attr 'unsafe-inline'",
  `style-src-elem ${STYLE_SRC}`,
  `worker-src blob:`,
  'report-to quisido',
].join('; ');

export default function ContentSecurityPolicyMeta(): ReactElement {
  return (
    <>
      <meta
        content='quisido="https://csp.quisi.do/1/"'
        httpEquiv="Reporting-Endpoints"
      />
      <meta
        content={CONTENT}
        httpEquiv="Content-Security-Policy"
      />
    </>
  );
}
