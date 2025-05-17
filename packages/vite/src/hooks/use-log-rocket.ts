import { useEffect } from 'react';
import useForceUpdate from 'use-force-update';
import type { LogRocket as ILogRocket } from '../types/log-rocket.js';
import getDefault from '../utils/get-default.js';
import noop from '../utils/noop.js';

/**
 *   When ran server-side, importing `logrocket` results in the error:
 * TypeError: Cannot create property '_interopRequireDefault' on number '0'
 */
const importLogRocket = () => import('logrocket').then(getDefault);

const DEFAULT_LOG_ROCKET: ILogRocket = {
  captureException: noop,
  captureMessage: noop,
  debug: noop,
  error: noop,
  getSessionURL: noop,
  identify: noop,
  info: noop,
  init: noop,
  log: noop,
  reduxMiddleware: noop,
  sessionURL: null,
  startNewSession: noop,
  track: noop,
  version: '0.0.0',
  warn: noop,
};

let LogRocket: ILogRocket = DEFAULT_LOG_ROCKET;

export default function useLogRocket(): ILogRocket {
  const forceUpdate: VoidFunction = useForceUpdate();

  useEffect((): void => {
    if (LogRocket !== DEFAULT_LOG_ROCKET) {
      return;
    }

    importLogRocket()
      .then((logRocket: ILogRocket): void => {
        LogRocket = logRocket;
        forceUpdate();
      })
      .catch(noop);
  }, [forceUpdate]);

  return LogRocket;
}
