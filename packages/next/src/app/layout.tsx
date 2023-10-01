import type { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { Fragment, StrictMode } from 'react';
import Contexts from '../app-components/contexts';
import GoogleAnalytics from '../app-components/google-analytics';
import NotificationsProvider from '../app-components/notifications-provider';
import Sentry from '../app-components/sentry';
import Turnstile from '../app-components/turnstile';
import CloudflareInsights from '../components/cloudflare-insights';
import CloudWatchRUM from '../components/cloudwatch-rum';
import Datadog from '../components/datadog';
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
  NotificationsProvider,
  CloudWatchRUM,
  Contexts,
  Sentry,
  Theme,
  Turnstile,
)(Fragment);

function RootLayout({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <html lang="en">
      <head>
        <ReportUri />
        <Preconnect hrefs={PRECONNECT_HREFS} />
        <CloudflareInsights token="f9703ac5039848f8abd3ab107a208a83" />
        <meta charSet="utf-8" />
      </head>
      <body className="awsui-dark-mode">
        <BodyChildren>
          <Datadog />
          <FullStory />
          <GoogleAnalytics />
          {children}
        </BodyChildren>
      </body>
    </html>
  );
}

export default withWrappers(StrictMode)(RootLayout);
