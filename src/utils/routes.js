import React from 'react';
import Fallback from '../components/route-suspense-fallback';
import AboutMe from '../components/routes/about-me';
import Donate from '../components/routes/donate';
import Portfolio from '../components/routes/portfolio';
import SpriteSheetToGif from '../components/routes/spritesheet2gif';
import metadata from './route-metadata';

function lazy(i) {
  const Component = React.lazy(i);
  return function LazyComponent(props) {
    return (
      <React.Suspense fallback={<Fallback />}>
        <Component {...props} />
      </React.Suspense>
    );
  }
}

export default [
  {
    ...metadata['/'],
    component: AboutMe,
    path: '/',
  },
  {
    ...metadata['/become-the-junior-developer-that-companies-want-to-hire'],
    component: lazy(() => import('../components/articles/become-the-junior-developer-that-companies-want-to-hire')),
    path: '/become-the-junior-developer-that-companies-want-to-hire/',
  },
  {
    ...metadata['/donate'],
    component: Donate,
    path: '/donate/',
  },
  {
    ...metadata['/portfolio'],
    component: Portfolio,
    path: '/portfolio/',
  },
  {
    ...metadata['/portfolio/articles'],
    component: Portfolio,
    path: '/portfolio/articles/',
  },
  {
    ...metadata['/portfolio/github'],
    component: Portfolio,
    path: '/portfolio/github/',
  },
  {
    ...metadata['/portfolio/npm'],
    component: Portfolio,
    path: '/portfolio/npm/',
  },
  {
    ...metadata['/spritesheet2gif'],
    component: SpriteSheetToGif,
    path: '/spritesheet2gif/',
  }
];
