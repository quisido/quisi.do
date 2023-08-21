import type { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { StrictMode } from 'react';
import Contexts from '../app-components/contexts';
import GoogleAnalytics from '../app-components/google-analytics';
import Sentry from '../app-components/sentry';
import Children from '../components/children';
import CloudflareInsights from '../components/cloudflare-insights';
import CloudWatchRUM from '../components/cloudwatch-rum';
import Datadog from '../components/datadog';
import ErrorBoundary from '../components/error-boundary';
import FullStory from '../components/fullstory';
import Preconnect from '../components/preconnect';
import ReportUri from '../components/report-uri';
import Theme from '../components/theme';
import PRECONNECT_HREFS from '../constants/preconnect-hrefs';
import withWrappers from '../hocs/with-wrappers';

export { default as metadata } from '../constants/root-metadata';

/**
 * We do not put wrappers around `<body>` itself, because we do not want to
 *   inadvertently render HTML elements around `<body>`.
 */
const BodyChildren: ComponentType<PropsWithChildren> = withWrappers(
  ErrorBoundary,
  CloudWatchRUM,
  Contexts,
  Datadog,
  Sentry,
  Theme,
)(Children);

function RootLayout({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <html lang="en">
      <head>
        <ReportUri />
        <Preconnect hrefs={PRECONNECT_HREFS} />
        <meta charSet="utf-8" />
        <CloudflareInsights token="f9703ac5039848f8abd3ab107a208a83" />
      </head>
      <body>
        <BodyChildren>
          <FullStory />
          <GoogleAnalytics />
          {children}
        </BodyChildren>
      </body>
    </html>
  );
}

export default withWrappers(StrictMode)(RootLayout);
