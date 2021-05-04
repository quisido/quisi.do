import { ReactElement } from 'react';
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
        component={BecomeTheJuniorDeveloperThatCompaniesWantToHire}
        path="/become-the-junior-developer-that-companies-want-to-hire/"
      />
      <Route component={Breathe} path="/breathe" />
      <Route component={ElectronTransitions} path="/electron-transitions" />
      <Route component={Packages} path="/packages" />
      <Route component={PortfolioArticles} path="/portfolio/articles" />
      <Route component={PortfolioNpm} path="/portfolio/npm" />
      <Route component={Publications} path="/publications" />
      <Route component={Quotes} path="/quotes" />
      <Route component={SpriteSheet2Gif} path="/spritesheet2gif" />
      <Route component={Home} />
    </Switch>
  );
}

function BecomeTheJuniorDeveloperThatCompaniesWantToHire(): null {
  window.location.href =
    'https://charles-stover.medium.com/become-the-junior-developer-that-companies-want-to-hire-c539f4c236d8';
  return null;
}

function Breathe(): null {
  window.location.href =
    'https://charlesstover.github.io/meditative-breathing/';
  return null;
}

function ElectronTransitions(): null {
  window.location.href =
    'https://charlesstover.github.io/electron-transition-calculator/';
  return null;
}

function PortfolioArticles(): ReactElement {
  return <Redirect to="/publications" />;
}

function PortfolioNpm(): ReactElement {
  return <Redirect to="/packages" />;
}
