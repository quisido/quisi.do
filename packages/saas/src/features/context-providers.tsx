import { type ComponentType, Fragment, type PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';

import withWrappers from '../hocs/with-wrappers/index.js';
import Authentication from './authentication.js';
import CustomThemeProvider from './custom-theme-provider.js';
import I18nProvider from './i18n-provider.js';
import NotificationsProvider from './notifications-provider.js';
import PostHog from './posthog.js';
import SessionIdProvider from './session-id-provider.js';
import TracerProviderProvider from './tracer-provider-provider.js';
import WindowProvider from './window-provider.js';

export const ContextProviders: ComponentType<PropsWithChildren> = withWrappers(
  Authentication,
  BrowserRouter,
  I18nProvider,
  NotificationsProvider,
  SessionIdProvider,
  CustomThemeProvider,
  // NewRelic,
  WindowProvider,

  // Consumes `Authentication`.
  PostHog,

  // Consumes `WindowProvider`.
  // Honeycomb, // "Critical dependency: the request of a dependency is an expression"
  TracerProviderProvider,
)(Fragment);
