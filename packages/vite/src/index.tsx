import { StrictMode } from 'react';
import Footer from './features/footer.jsx';
import Header from './features/header.jsx';
import Notifications from './features/notifications.jsx';
import { ContextProviders } from './features/context-providers.jsx';
import Home from './features/home.jsx';
import { ROOT } from './constants/root.js';
import LocaleLayout from './features/locale-layout/index.js';
import Locale from './constants/locale.js';
import Effects from './features/effects.jsx';

ROOT.render(
  <StrictMode>
    <LocaleLayout locale={Locale.English}>
      <ContextProviders>
        <Effects />
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
