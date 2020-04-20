import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { unregister } from './register-service-worker';

LogRocket.init('hth2me/charlesstovercom');
setupLogRocketReact(LogRocket);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

unregister();
