import { StrictMode } from 'react';
import onStorage from './utils/on-storage.js';
import setColorMode from './utils/set-color-mode.js';
import Analytics from './features/analytics.jsx';
import Footer from './features/footer.jsx';
import Header from './features/header.jsx';
import Notifications from './features/notifications.jsx';
import ContextProviders from './features/context-providers.jsx';
import Home from './features/home.jsx';
import { ROOT } from './constants/root.js';
import LocaleLayout from './features/locale-layout/index.js';
import Locale from './constants/locale.js';

onStorage('color-mode', setColorMode);

ROOT.render(
  <StrictMode>
    <LocaleLayout params={{ locale: Locale.English }}>
      <ContextProviders>
        <Analytics />
        <Notifications />
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </ContextProviders>
    </LocaleLayout>
  </StrictMode>,
);
