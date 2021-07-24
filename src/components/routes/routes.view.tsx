import type { ReactElement } from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';
import Home from '../../components/home';
import Packages from '../../components/packages';
import Publications from '../../components/publications';
import Quotes from '../../components/quotes';
import SpriteSheet2Gif from '../../components/spritesheet2gif';

export default function AppRoutes(): ReactElement {
  return (
    <Switch>
      <Route
        path="/become-the-junior-developer-that-companies-want-to-hire/"
        component={(): null => {
          window.location.href =
            'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8';
          return null;
        }}
      />
      <Route
        path="/breathe"
        component={(): null => {
          window.location.href =
            'https://charlesstover.github.io/meditative-breathing/';
          return null;
        }}
      />
      <Route
        path="/electron-transitions"
        component={(): null => {
          window.location.href =
            'https://charlesstover.github.io/electron-transition-calculator/';
          return null;
        }}
      />
      <Route component={Packages} path="/packages" />
      <Route
        path="/portfolio/articles"
        component={(): ReactElement => {
          return <Redirect to="/publications" />;
        }}
      />
      <Route
        path="/portfolio/npm"
        component={(): ReactElement => {
          return <Redirect to="/packages" />;
        }}
      />
      <Route component={Publications} path="/publications" />
      <Route component={Quotes} path="/quotes" />
      <Route component={SpriteSheet2Gif} path="/spritesheet2gif" />
      <Route component={Home} />
    </Switch>
  );
}
