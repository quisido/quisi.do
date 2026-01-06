import { StrictMode } from 'react';
import Locale from './constants/locale.js';
import { ROOT } from './constants/root.js';
import { ContextProviders } from './features/context-providers.jsx';
import Effects from './features/effects.jsx';
import Footer from './features/footer.jsx';
import Header from './features/header.jsx';
import LocaleLayout from './features/locale-layout/index.js';
import Notifications from './features/notifications.jsx';
import Routes from './features/routes.jsx';

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
