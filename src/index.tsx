import { render } from 'react-dom';
import ROOT from './constants/root';
import App from './features/app';
import initSentry from './utils/init-sentry';

initSentry();

render(<App />, ROOT);
