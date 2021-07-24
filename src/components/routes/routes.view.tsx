import type { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import Publications from '../../components/publications';
import SpriteSheet2Gif from '../../components/spritesheet2gif';
import Home from '../../features/home';
import Packages from '../../features/packages';
import Quotes from '../../features/quotes';
import externalRedirect from './routes.util.external-redirect';

export default function AppRoutes(): ReactElement {
  return (
    <Switch>
      <Route
        path="/become-the-junior-developer-that-companies-want-to-hire/"
        render={externalRedirect(
          'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8',
        )}
      />
      <Route
        path="/breathe"
        render={externalRedirect(
          'https://charlesstover.github.io/meditative-breathing/',
        )}
      />
      <Route
        path="/electron-transitions"
        render={externalRedirect(
          'https://charlesstover.github.io/electron-transition-calculator/',
        )}
      />
      <Route component={Packages} path="/packages" />
      <Route
        path="/portfolio/articles"
        component={(): ReactElement => <Redirect to="/publications" />}
      />
      <Route
        path="/portfolio/npm"
        component={(): ReactElement => <Redirect to="/packages" />}
      />
      <Route component={Publications} path="/publications" />
      <Route component={Quotes} path="/quotes" />
      <Route component={SpriteSheet2Gif} path="/spritesheet2gif" />
      <Route component={Home} />
    </Switch>
  );
}
