import { type ComponentType, Fragment, type PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';
import Authentication from '../features/authentication.js';
import Fullstory from '../features/fullstory.js';
import NotificationsProvider from '../features/notifications-provider.js';
import Sentry from '../features/sentry.jsx';
import SessionIdProvider from '../features/session-id-provider.js';
import TracerProviderProvider from '../features/tracer-provider-provider.js';
import withWrappers from '../hocs/with-wrappers/index.js';
import Theme from '../modules/quisi/theme.jsx';
import CustomThemeProvider from './custom-theme-provider.jsx';
import PostHog from './posthog.jsx';
import WindowProvider from './window-provider.jsx';

export const ContextProviders: ComponentType<PropsWithChildren> = withWrappers(
  Authentication,
  BrowserRouter,
  NotificationsProvider,
  SessionIdProvider,
  CustomThemeProvider,
  // NewRelic,
  WindowProvider,

  // Consumes `Authentication`.
  Fullstory,
  PostHog,
  Sentry,

  // Consumes `ThemeProvider`.
  Theme,

  // Consumes `WindowProvider`.
  // Honeycomb, // "Critical dependency: the request of a dependency is an expression"
  TracerProviderProvider,
)(Fragment);
