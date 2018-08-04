import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import registerServiceWorker from './register-service-worker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
