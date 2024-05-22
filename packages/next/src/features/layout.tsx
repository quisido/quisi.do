import {
  Fragment,
  StrictMode,
  type ComponentType,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import Authentication from '../features/authentication.js';
import CloudWatchRUM from '../features/cloudwatch-rum.js';
// import ContentSecurityPolicy from '../features/content-security-policy.js';
import DarkModeProvider from '../features/dark-mode-provider.js';
import Datadog from '../features/datadog.js';
import Footer from '../features/footer.js';
import Fullstory from '../features/fullstory.js';
import GoogleAnalytics from '../features/google-analytics.js';
import Header from '../features/header.js';
import HostnameProvider from '../features/hostname-provider.js';
import styles from '../features/layout.module.scss';
import LogRocket from '../features/log-rocket.js';
import Mixpanel from '../features/mixpanel.js';
import NotificationsProvider from '../features/notifications-provider.js';
import Notifications from '../features/notifications.js';
import Sentry from '../features/sentry/index.js';
import SessionIdProvider from '../features/session-id-provider.js';
import ThemeFeature from '../features/theme.js';
import TracerProviderProvider from '../features/tracer-provider-provider.js';
import withWrappers from '../hocs/with-wrappers/index.js';
import Theme from '../modules/quisi/theme.jsx';
import validateString from '../utils/validate-string.js';
import Head from './head.jsx';

const BODY_CLASS_NAME: string = validateString(styles['body']);
const HTML_CLASS_NAME: string = validateString(styles['html']);

/**
 *   We do not put wrappers around `<body>` itself, because we do not want to
 * inadvertently render HTML elements around `<body>`.
 */
const Contexts: ComponentType<PropsWithChildren> = withWrappers(
  Authentication,
  CloudWatchRUM,
  DarkModeProvider,
  Fullstory,
  // Honeycomb,
  HostnameProvider,
  LogRocket,
  NotificationsProvider,
  Sentry,
  SessionIdProvider,
  ThemeFeature,
  Theme,
  TracerProviderProvider,
  // Turnstile,
)(Fragment);

function RootLayout({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <html className={HTML_CLASS_NAME} lang="en">
      <Head />
      <body className={BODY_CLASS_NAME}>
        <noscript>JavaScript is required.</noscript>
        <Contexts>
          <Notifications />
          <Header />
          <main>{children}</main>
          <Footer />
        </Contexts>
        <Datadog />
        <GoogleAnalytics />
        <Mixpanel />
      </body>
    </html>
  );
}

export default withWrappers(StrictMode)(RootLayout);
