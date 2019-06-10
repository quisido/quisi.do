import AboutMe from '../components/routes/about-me';
import Donate from '../components/routes/donate';
import Portfolio from '../components/routes/portfolio';
import SpriteSheetToGif from '../components/routes/spritesheet2gif';
import metadata from './route-metadata';

export default [
  {
    ...metadata['/'],
    component: AboutMe,
    path: '/',
  },
  {
    ...metadata['/donate'],
    component: Donate,
    path: '/donate',
  },
  {
    ...metadata['/portfolio'],
    component: Portfolio,
    path: '/portfolio',
  },
  {
    ...metadata['/portfolio/github'],
    component: Portfolio,
    path: '/portfolio/github',
  },
  {
    ...metadata['/portfolio/medium'],
    component: Portfolio,
    path: '/portfolio/medium',
  },
  {
    ...metadata['/portfolio/npm'],
    component: Portfolio,
    path: '/portfolio/npm',
  },
  {
    ...metadata['/spritesheet2gif'],
    component: SpriteSheetToGif,
    path: '/spritesheet2gif',
  }
];
