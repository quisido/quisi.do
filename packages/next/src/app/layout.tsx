import {
  type ComponentType,
  Fragment,
  type PropsWithChildren,
  type ReactElement,
  StrictMode,
} from 'react';
import CloudflareInsights from '../components/cloudflare-insights';
import CloudWatchRUM from '../components/cloudwatch-rum';
import Datadog from '../components/datadog';
import FullStory from '../components/fullstory';
import Preconnect from '../components/preconnect';
import ReportUri from '../components/report-uri';
import Theme from '../components/theme';
import PRECONNECT_HREFS from '../constants/preconnect-hrefs';
import Contexts from '../features/contexts';
import GoogleAnalytics from '../features/google-analytics';
// import Mixpanel from '../features/mixpanel';
import NotificationsProvider from '../features/notifications-provider';
import Sentry from '../features/sentry';
// import Turnstile from '../features/turnstile';
import withWrappers from '../hocs/with-wrappers';
import Clarity from '../modules/react-clarity';

export { default as metadata } from '../constants/root-metadata';
export { default as viewport } from '../constants/root-viewport';

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
  // Turnstile,
)(Fragment);

function RootLayout({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <html lang="en">
      <head>
        <ReportUri />
        <Preconnect hrefs={PRECONNECT_HREFS} />
        <Clarity tag="jn26o3oqm1" />
        <CloudflareInsights token="f9703ac5039848f8abd3ab107a208a83" />
        <meta charSet="utf-8" />
        <script
          referrerPolicy="origin"
          src="https://quisi.do/cdn-cgi/zaraz/i.js"
          type="text/javascript"
        />
      </head>
      <body>
        <BodyChildren>
          <Datadog />
          <FullStory />
          <GoogleAnalytics />
          {/* <Mixpanel /> */}
          {children}
        </BodyChildren>
        {/*
        <script
          defer
          id="hs-script-loader"
          src="https://js-na1.hs-scripts.com/39916358.js"
          type="text/javascript"
        />
        */}
      </body>
    </html>
  );
}

export default withWrappers(StrictMode)(RootLayout);
