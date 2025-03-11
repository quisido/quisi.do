import { StrictMode, type PropsWithChildren, type ReactElement } from 'react';
import Footer from '../features/footer.js';
import Header from '../features/header.js';
import Notifications from '../features/notifications.js';
import Analytics from './analytics.jsx';
import Body from './body.jsx';
import Head from './head.jsx';
import Html from './html.jsx';
import LayoutContextProviders from './layout-context-providers.jsx';

function RootLayout({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <StrictMode>
      <Html>
        <Head />
        <Body>
          <noscript>
            <p>JavaScript is required. Sorry for the inconvenience.</p>
          </noscript>
          {/**
           *   We do not put wrappers around `<body>` itself, because we do not
           * want to inadvertently render HTML elements around `<body>`.
           */}
          <LayoutContextProviders>
            <Analytics />
            <Notifications />
            <Header />
            <main>{children}</main>
            <Footer />
          </LayoutContextProviders>
        </Body>
      </Html>
    </StrictMode>
  );
}
export default RootLayout;
