import { StrictMode } from 'react';
import { render } from 'react-dom';
import ROOT from './constants/root';
import App from './features/app';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  ROOT,
);
