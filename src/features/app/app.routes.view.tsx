import type { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../../features/home';
import Packages from '../../features/packages';
import Publications from '../../features/publications';
import Quotes from '../../features/quotes';
import SpriteSheet2Gif from '../../features/spritesheet2gif';
import externalRedirect from './app.util.external-redirect';
import mapPathToRedirect from './app.util.map-path-to-redirect';

const PackagesRedirect = mapPathToRedirect('/packages');
const PublicationsRedirect = mapPathToRedirect('/publications');

const renderBreathe = externalRedirect(
  'https://charlesstover.github.io/meditative-breathing/',
);

const renderBecomeTheJuniorDeveloperThatCompaniesWantToHire = externalRedirect(
  'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
);

const renderElectronTransitions = externalRedirect(
  'https://charlesstover.github.io/electron-transition-calculator/',
);

export default function AppRoutes(): ReactElement {
  return (
    <Switch>
      <Route path="/breathe" render={renderBreathe} />
      <Route path="/electron-transitions" render={renderElectronTransitions} />
      <Route component={Packages} path="/packages" />
      <Route component={PackagesRedirect} path="/portfolio/npm" />
      <Route component={Publications} path="/publications" />
      <Route component={Quotes} path="/quotes" />
      <Route component={SpriteSheet2Gif} path="/spritesheet2gif" />
      <Route component={PublicationsRedirect} path="/portfolio/articles" />
      <Route
        path="/become-the-junior-developer-that-companies-want-to-hire/"
        render={renderBecomeTheJuniorDeveloperThatCompaniesWantToHire}
      />
      <Route component={Home} />
    </Switch>
  );
}
