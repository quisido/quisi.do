import LogRocket from 'logrocket';
import type { LogRocket as ILogRocket } from '../types/log-rocket.js';

export default function useLogRocket(): ILogRocket {
  return LogRocket;
}
