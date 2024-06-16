import { useEffect } from 'react';
import useForceUpdate from 'use-force-update';
import type { LogRocket as ILogRocket } from '../types/log-rocket.js';
import noop from '../utils/noop.js';

interface DefaultExport<T> {
  readonly default: T;
}

/**
 *   When ran server-side, importing `logrocket` results in the error:
 * TypeError: Cannot create property '_interopRequireDefault' on number '0'
 */
const importLogRocket = () => import('logrocket');

let LogRocket: ILogRocket = {
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

export default function useLogRocket(): ILogRocket {
  const forceUpdate: VoidFunction = useForceUpdate();

  useEffect((): void => {
    void importLogRocket()
      .then(
        ({ default: defaultLogRocket }: DefaultExport<ILogRocket>): void => {
          LogRocket = defaultLogRocket;
          forceUpdate();
        },
      )
      .catch(noop);
  }, [forceUpdate]);

  return LogRocket;
}
