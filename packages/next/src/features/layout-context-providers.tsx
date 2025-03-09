import { Fragment, type ComponentType, type PropsWithChildren } from 'react';
import Authentication from '../features/authentication.js';
import Fullstory from '../features/fullstory.js';
import NotificationsProvider from '../features/notifications-provider.js';
import Sentry from '../features/sentry.jsx';
import SessionIdProvider from '../features/session-id-provider.js';
import ThemeFeature from '../features/theme.js';
import TracerProviderProvider from '../features/tracer-provider-provider.js';
import withWrappers from '../hocs/with-wrappers/index.js';
import Theme from '../modules/quisi/theme.jsx';
import PostHog from './posthog.jsx';
import WindowProvider from './window-provider.jsx';

const LayoutContextProviders: ComponentType<PropsWithChildren> = withWrappers(
  Authentication,
  NotificationsProvider,
  SessionIdProvider,
  ThemeFeature,
  WindowProvider,

  // Requres `Authentication`.
  Fullstory,
  PostHog,
  Sentry,

  // Requires `ThemeFeature`.
  Theme,

  // Requires `WindowProvider`.
  // Honeycomb, // Error: "Critical dependency: the request of a dependency is an expression"
  TracerProviderProvider,
)(Fragment);

export default LayoutContextProviders;
