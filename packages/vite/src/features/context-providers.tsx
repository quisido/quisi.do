import { type ComponentType, Fragment, type PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';
import Authentication from '../features/authentication.js';
import Fullstory from '../features/fullstory.js';
import NotificationsProvider from '../features/notifications-provider.js';
import Sentry from '../features/sentry.js';
import SessionIdProvider from '../features/session-id-provider.js';
import TracerProviderProvider from '../features/tracer-provider-provider.js';
import withWrappers from '../hocs/with-wrappers/index.js';
import CustomThemeProvider from './custom-theme-provider.js';
import PostHog from './posthog.js';
import WindowProvider from './window-provider.js';

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

  // Consumes `WindowProvider`.
  // Honeycomb, // "Critical dependency: the request of a dependency is an expression"
  TracerProviderProvider,
)(Fragment);
