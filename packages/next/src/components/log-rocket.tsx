'use client';

import { useEffect, type ReactElement, type ReactNode } from 'react';
import GITHUB_SHA from '../constants/github-sha.js';
import { WHOAMI } from '../constants/whoami.js';
import useLogRocket from '../hooks/use-log-rocket.js';
import { type LogRocketOptions, type LogRocketRequest, type LogRocketResponse } from '../types/log-rocket.js';
import getHostname from '../utils/get-hostname.js';

interface Props {
  readonly appId: string;
  readonly children: ReactNode;
}

const BROWSER: Required<Required<LogRocketOptions>['browser']> = {
  urlSanitizer(): string | null {
    return null;
  },
};

const CONSOLE_IS_ENABLED: Required<Required<Required<LogRocketOptions>['console']>['isEnabled']> = {
  debug: false,
  error: true,
  info: true,
  log: true,
  warn: true,
};

const CONSOLE: Required<Required<LogRocketOptions>['console']> = {
  isEnabled: CONSOLE_IS_ENABLED,
  shouldAggregateConsoleErrors: true,
};

const DOM: Required<Omit<Required<LogRocketOptions>['dom'], 'baseHref'>> = {
  hiddenAttributes: [],
  inputSanitizer: false,
  isEnabled: true,
  privateAttributeBlocklist: [],
  privateClassNameBlocklist: [],
  textSanitizer: false,
};

const NETWORK_REQUEST_IDS: Map<string, string> = new Map<string, string>();

const NETWORK: Required<Required<LogRocketOptions>['network']> = {
  isEnabled: true,

  requestSanitizer(request: LogRocketRequest): LogRocketRequest | null {
    NETWORK_REQUEST_IDS.set(request.reqId, request.url);

    return {
      ...request,
      headers: {
        ...request.headers,
        Cookie: undefined,
      },
    };
  },

  responseSanitizer(response: LogRocketResponse): LogRocketResponse | null {
    const requestUrl: string | undefined = NETWORK_REQUEST_IDS.get(response.reqId);

    if (requestUrl === WHOAMI) {
      return null;
    }

    return {
      ...response,
      headers: {
        ...response.headers,
      },
    };
  },
};

export default function LogRocket({ appId, children }: Props): ReactElement {
  const LogRocket = useLogRocket();

  useEffect((): void => {
    LogRocket.init(appId, {
      browser: BROWSER,
      childDomains: [],
      console: CONSOLE,
      disableBusyFramesTracker: false,
      mergeIframes: true,
      network: NETWORK,
      parentDomain: null,
      release: GITHUB_SHA ?? 'dev',
      rootHostname: getHostname(),
      shouldAugmentNPS: true,
      shouldCaptureIP: true,
      shouldDebugLog: false,
      shouldDetectExceptions: true,
      shouldParseXHRBlob: true,
      dom: {
        ...DOM,
        baseHref: `${window.location.origin}/`,
      },
    } satisfies Required<Omit<LogRocketOptions, 'serverURL' | 'shouldSendData' | 'uploadTimeInterval'>>);
  }, [appId, LogRocket]);

  return <>{children}</>;
}
