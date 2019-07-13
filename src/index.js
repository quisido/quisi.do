import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { unregister } from './register-service-worker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

unregister();
