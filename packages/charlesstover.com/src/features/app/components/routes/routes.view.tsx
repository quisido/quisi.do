import { withSentryReactRouterV6Routing } from '@sentry/react';
import type { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../../../features/dashboard';
import Home from '../../../../features/home';
import Packages from '../../../../features/packages';
import Publications from '../../../../features/publications';
import Quotes from '../../../../features/quotes';
import SpriteSheet2Gif from '../../../../features/spritesheet2gif';
import type RumMetrics from '../../../../types/rum-metrics';
import type UptimeChecks from '../../../../types/uptime-checks';
import mapHrefToRedirectComponent from '../../utils/map-href-to-redirect-component';
import mapPathToRedirectComponent from '../../utils/map-path-to-redirect-component';

interface Props {
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onUptimeChecksRequest: () => Promise<UptimeChecks>;
}

const BtjdtcwthPath = 'become-the-junior-developer-that-companies-want-to-hire';
const HomeRedirect = mapPathToRedirectComponent('/');
const PackagesRedirect = mapPathToRedirectComponent('/packages');
const PublicationsRedirect = mapPathToRedirectComponent('/publications');

const Breathe = mapHrefToRedirectComponent(
  'https://charlesstover.github.io/meditative-breathing/',
);

const BtjdtcwthComponent = mapHrefToRedirectComponent(
  'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
);

const ElectronTransitions = mapHrefToRedirectComponent(
  'https://charlesstover.github.io/electron-transition-calculator/',
);

const SentryRoutes = withSentryReactRouterV6Routing(Routes);

export default function AppRoutes({
  onRumMetricsRequest,
  onUptimeChecksRequest,
}: Readonly<Props>): ReactElement {
  return (
    <SentryRoutes>
      <Route element={<Home />} index />

      {/* Applications */}
      <Route element={<SpriteSheet2Gif />} path="spritesheet2gif" />

      {/* Portfolio */}
      <Route
        element={
          <Dashboard
            onRumMetricsRequest={onRumMetricsRequest}
            onUptimeChecksRequest={onUptimeChecksRequest}
          />
        }
        path="dashboard"
      />
      <Route element={<Packages />} path="packages" />
      <Route element={<Publications />} path="publications" />
      <Route element={<Quotes />} path="quotes" />

      {/* Redirects */}
      <Route element={<Breathe />} path="breathe" />
      <Route element={<ElectronTransitions />} path="electron-transitions" />
      <Route element={<BtjdtcwthComponent />} path={BtjdtcwthPath} />
      <Route path="portfolio">
        <Route element={<HomeRedirect />} index />
        <Route element={<PublicationsRedirect />} path="articles" />
        <Route element={<PackagesRedirect />} path="npm" />
      </Route>

      {/* 404 */}
      <Route element={<HomeRedirect />} path="*" />
    </SentryRoutes>
  );
}
