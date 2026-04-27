import { StrictMode } from 'react';
import { ROOT } from './constants/root.js';
import { ContextProviders } from './features/context-providers.js';
import Effects from './features/effects.js';
import Footer from './features/footer.js';
import Header from './features/header.js';
import Notifications from './features/notifications.js';
import Routes from './features/routes.js';

ROOT.render(
  <StrictMode>
    <ContextProviders>
      <Effects />
      <Notifications />
      <Header />
      <main>
        <Routes />
      </main>
      <Footer />
    </ContextProviders>
  </StrictMode>,
);
