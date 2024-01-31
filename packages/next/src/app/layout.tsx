import {
  type ComponentType,
  Fragment,
  type PropsWithChildren,
  type ReactElement,
  StrictMode,
} from 'react';
import CloudflareInsights from '../components/cloudflare-insights/index.js';
import CloudWatchRUM from '../components/cloudwatch-rum/index.js';
import Datadog from '../components/datadog/index.js';
import FullStory from '../components/fullstory/index.js';
import ReportUri from '../components/report-uri/index.js';
import DesignSystemTheme from '../components/theme/index.js';
import Authentication from '../features/authentication.js';
import DarkModeProvider from '../features/dark-mode-provider.js';
import DesignSystemProvider from '../features/design-system-provider.js';
import Footer from '../features/footer.js';
import GoogleAnalytics from '../features/google-analytics/index.js';
import GoogleFonts from '../features/google-fonts.js';
import Header from '../features/header.js';
import HostnameProvider from '../features/hostname-provider.js';
import NotificationsProvider from '../features/notifications-provider.js';
import Notifications from '../features/notifications.js';
import Preconnect from '../features/preconnect.js';
import Sentry from '../features/sentry/index.js';
import SessionIdProvider from '../features/session-id-provider.js';
import ThemeFeature from '../features/theme.js';
import withWrappers from '../hocs/with-wrappers/index.js';
import Clarity from '../modules/react-clarity/index.js';
export { default as metadata } from '../constants/root-metadata.js';
export { default as viewport } from '../constants/root-viewport.js';

const BODY_FONT_FAMILIES: readonly string[] = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  '"Open Sans"',
  '"Helvetica Neue"',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const LAYOUT_CSS = `
body {
  -moz-osx-font-smoothing: grayscale;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  -ms-text-size-adjust: none;
  -webkit-font-feature-settings: "pnum";
  -webkit-font-smoothing: antialiased;
  -webkit-overflow-scrolling: touch;
  -webkit-text-size-adjust: none;
  box-sizing: border-box;
  color: #000000;
  font-family: ${BODY_FONT_FAMILIES.join(', ')};
  font-feature-settings: "pnum";
  font-size: 16px;
  font-smooth: always;
  font-variant-numeric: proportional-nums;
  letter-spacing: 0;
  line-height: 1.5;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  min-height: 100%;
  overflow-y: scroll;
  padding-bottom: 0;
  padding-top: 0;
  text-rendering: optimizeLegibility;
  text-size-adjust: none;

  @media (max-width: 6in) {
    padding-left: 0.5in;
    padding-right: 0.5in;
  }

  @media (min-width: 6in) {
    padding-left: 1in;
    padding-right: 1in;
  }

  /*
  @media (prefers-color-scheme: dark) {
    background-color: #202020;
    color: #ffffff;
  }
  */
}
`;

/**
 * We do not put wrappers around `<body>` itself, because we do not want to
 *   inadvertently render HTML elements around `<body>`.
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
  // Turnstile,
)(Fragment);

function RootLayout({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <html lang="en">
      <head>
        <ReportUri />
        <Preconnect />
        <Clarity tag="jn26o3oqm1" />
        <CloudflareInsights token="f9703ac5039848f8abd3ab107a208a83" />
        <meta charSet="utf-8" />
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: LAYOUT_CSS,
          }}
        />
        {/*
        <script
          referrerPolicy="origin"
          src="https://quisi.do/cdn-cgi/zaraz/i.js"
          type="text/javascript"
        />
        */}
        <GoogleFonts />
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
