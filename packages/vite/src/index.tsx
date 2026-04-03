import { StrictMode } from 'react';
import Locale from './constants/locale.js';
import { ROOT } from './constants/root.js';
import { ContextProviders } from './features/context-providers.js';
import Effects from './features/effects.js';
import Footer from './features/footer.js';
import Header from './features/header.js';
import LocaleLayout from './features/locale-layout/index.js';
import Notifications from './features/notifications.js';
import Routes from './features/routes.js';

ROOT.render(
  <StrictMode>
    <LocaleLayout locale={Locale.English}>
      <ContextProviders>
        <Effects />
        <Notifications />
        <Header />
        <main>
          <Routes />
        </main>
        <Footer />
      </ContextProviders>
    </LocaleLayout>
  </StrictMode>,
);
