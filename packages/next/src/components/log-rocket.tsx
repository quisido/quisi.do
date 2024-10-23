'use client';

import { useEffect } from 'react';
import { GITHUB_SHA } from '../constants/github-sha.js';
import { WHOAMI } from '../constants/whoami.js';
import useLogRocket from '../hooks/use-log-rocket.js';
import { type LogRocketOptions, type LogRocketRequest, type LogRocketResponse } from '../types/log-rocket.js';
import getHostname from '../utils/get-hostname.js';

interface Props {
  readonly appId: string;
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
  disablePageTitles: false,
  disableWebAnimations: false,
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
        cookie: undefined,
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

const OPTIONS: Required<Omit<LogRocketOptions, 'rootHostname' | 'serverURL' | 'shouldSendData' | 'uploadTimeInterval'>> = {
  browser: BROWSER,
  childDomains: [],
  console: CONSOLE,
  disableBusyFramesTracker: false,
  dom: DOM,
  mergeIframes: true,
  network: NETWORK,
  parentDomain: null,
  release: GITHUB_SHA ?? 'dev',
  shouldAugmentNPS: true,
  shouldCaptureIP: true,
  shouldDebugLog: false,
  shouldDetectExceptions: true,
  shouldParseXHRBlob: true,
};

export default function LogRocket({ appId }: Props): null {
  const LogRocket = useLogRocket();

  useEffect((): void => {
    LogRocket.init(appId, {
      ...OPTIONS,
      rootHostname: getHostname(),
      dom: {
        ...OPTIONS.dom,
        baseHref: `${window.location.origin}/`,
      },
    });
  }, [appId, LogRocket]);

  return null;
}
