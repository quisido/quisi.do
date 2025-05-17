import { identity } from 'fmrs';
import { useEffect } from 'react';
import useLogRocket from '../hooks/use-log-rocket.js';
import {
  type LogRocketOptions,
  type LogRocketRequest,
  type LogRocketResponse,
} from '../types/log-rocket.js';
import type { Compulsory } from '../types/compulsory.js';

export interface User extends Record<string, number | string> {
  readonly id: string;
}

export interface Props {
  readonly appId: string;
  readonly release?: string | undefined;
  readonly rootHostname?: string | undefined;
  readonly user?: User | undefined;

  readonly sanitizeRequest?:
    | ((request: LogRocketRequest) => LogRocketRequest | null)
    | undefined;

  readonly sanitizeResponse?:
    | ((
        request: LogRocketRequest | undefined,
        response: LogRocketResponse,
      ) => LogRocketResponse | null)
    | undefined;
}

const BROWSER: Required<Compulsory<LogRocketOptions['browser']>> = {
  urlSanitizer(): string | null {
    return null;
  },
};

const CONSOLE_IS_ENABLED: Required<
  Compulsory<Compulsory<LogRocketOptions['console']>>['isEnabled']
> = {
  debug: false,
  error: true,
  info: true,
  log: true,
  warn: true,
};

const CONSOLE: Required<Compulsory<LogRocketOptions['console']>> = {
  isEnabled: CONSOLE_IS_ENABLED,
  shouldAggregateConsoleErrors: true,
};

const DOM: Required<Omit<Compulsory<LogRocketOptions['dom']>, 'baseHref'>> = {
  disablePageTitles: false,
  disableVisibleElement: false,
  disableWebAnimations: false,
  hiddenAttributes: [],
  inputSanitizer: false,
  isEnabled: true,
  privateAttributeBlocklist: [],
  privateClassNameBlocklist: [],
  textSanitizer: false,
};

const NETWORK_REQUESTS = new Map<string, LogRocketRequest>();

const OPTIONS: Required<
  Omit<
    LogRocketOptions,
    | 'network'
    | 'release'
    | 'rootHostname'
    | 'serverURL'
    | 'shouldSendData'
    | 'uploadTimeInterval'
  >
> = {
  browser: BROWSER,
  childDomains: [],
  console: CONSOLE,
  disableBusyFramesTracker: false,
  dom: DOM,
  mergeIframes: true,
  parentDomain: null,
  shouldAugmentNPS: true,
  shouldCaptureIP: true,
  shouldDebugLog: false,
  shouldDetectExceptions: true,
  shouldParseXHRBlob: true,
};

const defaultResponseSanitizer = (
  _request: LogRocketRequest | undefined,
  response: LogRocketResponse,
): LogRocketResponse => response;

export default function useLogRocketInit({
  appId,
  release = 'dev',
  rootHostname,
  sanitizeRequest = identity,
  sanitizeResponse = defaultResponseSanitizer,
  user,
}: Props): void {
  // Contexts
  const LogRocket = useLogRocket();

  // Effects
  useEffect((): void => {
    const partialOptions: Partial<LogRocketOptions> = {};
    if (typeof rootHostname !== 'undefined') {
      partialOptions.rootHostname = rootHostname;
    }

    LogRocket.init(appId, {
      ...OPTIONS,
      ...partialOptions,
      release,

      dom: {
        ...OPTIONS.dom,
        baseHref: `${window.location.origin}/`,
      },

      network: {
        isEnabled: true,

        requestSanitizer(request: LogRocketRequest): LogRocketRequest | null {
          NETWORK_REQUESTS.set(request.reqId, request);
          return sanitizeRequest(request);
        },

        responseSanitizer(
          response: LogRocketResponse,
        ): LogRocketResponse | null {
          const request: LogRocketRequest | undefined = NETWORK_REQUESTS.get(
            response.reqId,
          );
          return sanitizeResponse(request, response);
        },
      },
    });
  }, [
    appId,
    LogRocket,
    release,
    rootHostname,
    sanitizeRequest,
    sanitizeResponse,
  ]);

  useEffect((): void => {
    if (typeof user === 'undefined') {
      return;
    }

    const { id, ...traits } = user;
    LogRocket.identify(id, traits);
  }, [LogRocket, user]);
}
