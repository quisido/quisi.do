import { StrictMode } from 'react';
import { ROOT } from './constants/root.js';
import { ContextProviders } from './features/context-providers.js';
import Effects from './features/effects.js';
import Notifications from './features/notifications.js';
import Routes from './features/routes.js';

ROOT.render(
  <StrictMode>
    <ContextProviders>
      <Effects />
      <Notifications />
      <main>
        <Routes />
      </main>
    </ContextProviders>
  </StrictMode>,
);
