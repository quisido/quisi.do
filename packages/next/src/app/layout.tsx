import {
  Fragment,
  StrictMode,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import CloudflareInsights from '../components/cloudflare-insights.js';
import DesignSystemTheme from '../components/theme.js';
import Authentication from '../features/authentication.js';
import CloudWatchRUM from '../features/cloudwatch-rum.js';
import DarkModeProvider from '../features/dark-mode-provider.js';
import Datadog from '../features/datadog.js';
import DesignSystemProvider from '../features/design-system-provider.js';
import Footer from '../features/footer.js';
import FullStory from '../features/fullstory.js';
import GoogleAnalytics from '../features/google-analytics/index.js';
import GoogleFonts from '../features/google-fonts.js';
import Header from '../features/header.js';
import HostnameProvider from '../features/hostname-provider.js';
import LayoutStyle from '../features/layout-style.js';
import NotificationsProvider from '../features/notifications-provider.js';
import Notifications from '../features/notifications.js';
import Preconnect from '../features/preconnect.js';
import ReportUri from '../features/report-uri.js';
import Sentry from '../features/sentry/index.js';
import SessionIdProvider from '../features/session-id-provider.js';
import ThemeFeature from '../features/theme.js';
import TracerProviderProvider from '../features/tracer-provider-provider.js';
import withWrappers from '../hocs/with-wrappers/index.js';
import Clarity from '../modules/react-clarity/index.js';
export { default as metadata } from '../constants/root-metadata.js';
export { default as viewport } from '../constants/root-viewport.js';

/**
 *   We do not put wrappers around `<body>` itself, because we do not want to
 * inadvertently render HTML elements around `<body>`.
 */
const Contexts: ComponentType<PropsWithChildren> = withWrappers(
  Authentication,
  CloudWatchRUM,
  DarkModeProvider,
  DesignSystemProvider,
  HostnameProvider,
  NotificationsProvider,
  Sentry,
  SessionIdProvider,
  ThemeFeature,
  DesignSystemTheme,
  TracerProviderProvider,
  // Turnstile,
)(Fragment);

function RootLayout({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <html lang="en">
      <head>
        <LayoutStyle />
        <Clarity tag="jn26o3oqm1" />
        <CloudflareInsights token="f9703ac5039848f8abd3ab107a208a83" />
        <GoogleFonts />
        <meta charSet="utf-8" />
        <Preconnect />
        <ReportUri />
        {/* <Traceparent /> */}
        {/*
        <script
          referrerPolicy="origin"
          src="https://quisi.do/cdn-cgi/zaraz/i.js"
          type="text/javascript"
        />
        */}
      </head>
      <body>
        <noscript>JavaScript is required.</noscript>
        <Contexts>
          <Notifications />
          <Header />
          <main>{children}</main>
          <Footer />
        </Contexts>
        <Datadog />
        <FullStory />
        <GoogleAnalytics />
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
