import { StrictMode } from 'react';
import Locale from './constants/locale.js';
import { ROOT } from './constants/root.js';
import { ContextProviders } from './features/context-providers.js';
import Effects from './features/effects.js';
import LocaleLayout from './features/locale-layout/index.js';
import Notifications from './features/notifications.js';
import Routes from './features/routes.js';

ROOT.render(
  <StrictMode>
    <LocaleLayout locale={Locale.English}>
      <ContextProviders>
        <Effects />
        <Notifications />
        <Routes />
      </ContextProviders>
    </LocaleLayout>
  </StrictMode>,
);
