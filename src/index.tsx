import { render } from 'react-dom';
import ROOT from './constants/root';
import App from './features/app';
import initSentry from './utils/sentry';

initSentry();

render(<App />, ROOT);
