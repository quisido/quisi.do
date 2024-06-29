'use client';

import {
  createContext,
  useEffect,
  useId,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactElement,
  type RefObject,
} from 'react';

// https://developers.cloudflare.com/turnstile/reference/supported-languages/
export type Language =
  | 'ar-eg'
  | 'ar'
  | 'de'
  | 'en'
  | 'es'
  | 'fa'
  | 'fr'
  | 'id'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'pt-br'
  | 'ru'
  | 'tlh'
  | 'tr'
  | 'uk'
  | 'uk-ua'
  | 'zh'
  | 'zh-cn'
  | 'zh-tw';

export interface Props {
  readonly appearance?: 'always' | 'execute' | 'interaction-only' | undefined;
  readonly execution?: 'execute' | 'render' | undefined;
  readonly language?: Language | undefined;
  readonly onError?: ((code: number) => void) | undefined;
  readonly onExpired?: ((token: string) => void) | undefined;
  readonly onSuccess?: ((token: string) => void) | undefined;
  readonly onTimeout?: ((...args: readonly unknown[]) => void) | undefined;
  readonly onUnsupported?: ((...args: readonly unknown[]) => void) | undefined;
  readonly retry?: 'auto' | 'never' | undefined;
  readonly sitekey: string;
  readonly theme?: 'dark' | 'light' | 'auto' | undefined;
}

interface TurnstileApi {
  readonly ready: (callback: VoidFunction) => void;
  readonly render: (
    container: string,
    params?: TurnstileApiRenderParameters | undefined,
  ) => void;
}

interface TurnstileApiRenderParameters {
  readonly 'after-interactive-callback'?: VoidFunction | undefined;
  readonly appearance?: 'always' | 'execute' | 'interaction-only' | undefined;
  readonly 'before-interactive-callback'?: VoidFunction | undefined;
  readonly callback: (token: string) => void;
  readonly 'error-callback'?: ((code: number) => void) | undefined;
  readonly execution?: 'execute' | 'render' | undefined;
  readonly 'expired-callback'?: ((token: string) => void) | undefined;
  readonly language?: Language | undefined;
  readonly retry?: 'auto' | 'never' | undefined;
  readonly sitekey: string;
  readonly theme?: 'auto' | 'dark' | 'light' | undefined;
  readonly 'timeout-callback'?: VoidFunction | undefined;
  readonly 'unsupported-callback'?: VoidFunction | undefined;
}

interface TurnstileWindow extends Window {
  readonly turnstile: TurnstileApi;
}

export interface State {
  readonly error: number | string | null;
  readonly expired: boolean;
  readonly loading: boolean;
  readonly supported: boolean;
  readonly timeout: boolean;
  readonly token: string | null;
}

const ATTEMPT_DELAY = 200;
const Context = createContext<State | null>(null);
const INCREMENT = 1;
const MAX_ATTEMPTS = 150; // ~30 seconds
const NONE = 0;
const SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const hasTurnstile = (w: Window): w is TurnstileWindow => 'turnstile' in w;
const hasScript = (scripts: HTMLCollectionOf<HTMLScriptElement>): boolean => {
  for (const script of scripts) {
    if (script.getAttribute('src') !== SRC) {
      continue;
    }
    return true;
  }
  return false;
};

const DEFAULT_STATE: State = {
  error: null,
  expired: true,
  loading: true,
  supported: true,
  timeout: false,
  token: null,
};

export default function Turnstile({
  appearance,
  children,
  execution,
  language,
  onError,
  onExpired,
  onSuccess,
  onTimeout,
  onUnsupported,
  retry,
  sitekey,
  theme,
}: PropsWithChildren<Props>): ReactElement {
  // States
  const containerId: string = useId();
  const [state, setState] = useState<State>(DEFAULT_STATE);

  const onErrorRef: RefObject<((code: number) => void) | undefined> =
    useRef(onError);

  const onExpiredRef: RefObject<((token: string) => void) | undefined> =
    useRef(onExpired);

  const onSuccessRef: RefObject<((token: string) => void) | undefined> =
    useRef(onSuccess);

  const onTimeoutRef: RefObject<
    ((...args: readonly unknown[]) => void) | undefined
  > = useRef(onTimeout);

  const onUnsupportedRef: RefObject<
    ((...args: readonly unknown[]) => void) | undefined
  > = useRef(onUnsupported);

  onErrorRef.current = onError;
  onExpiredRef.current = onExpired;
  onSuccessRef.current = onSuccess;
  onTimeoutRef.current = onTimeout;
  onUnsupportedRef.current = onUnsupported;
  useEffect((): void => {
    const scripts: HTMLCollectionOf<HTMLScriptElement> =
      window.document.getElementsByTagName('script');

    const readyRender = (attempt = NONE): void => {
      if (!hasTurnstile(window)) {
        if (attempt < MAX_ATTEMPTS) {
          setTimeout((): void => {
            readyRender(attempt + INCREMENT);
          }, ATTEMPT_DELAY);
        }
        return;
      }

      const container: HTMLDivElement = window.document.createElement('div');
      const id = `turnstile-container-${containerId.replace(/:/g, '')}`;
      container.setAttribute('id', id);
      container.style.setProperty('display', 'none');
      window.document.body.appendChild(container);

      window.turnstile.render(`#${id}`, {
        appearance,
        execution,
        language,
        retry,
        sitekey,
        theme,
        callback(newToken: string): void {
          setState({
            error: null,
            expired: false,
            loading: false,
            supported: true,
            token: newToken,
            timeout: false,
          });
          if (typeof onSuccessRef.current !== 'undefined') {
            onSuccessRef.current(newToken);
          }
        },
        'error-callback'(code: number): void {
          setState({
            error: code,
            expired: false,
            loading: false,
            supported: true,
            token: null,
            timeout: false,
          });
          if (typeof onErrorRef.current !== 'undefined') {
            onErrorRef.current(code);
          }
        },
        'expired-callback'(oldToken: string): void {
          setState({
            error: null,
            expired: true,
            loading: false,
            supported: true,
            token: null,
            timeout: false,
          });
          if (typeof onExpiredRef.current !== 'undefined') {
            onExpiredRef.current(oldToken);
          }
        },
        'timeout-callback'(...args: readonly unknown[]): void {
          setState({
            error: null,
            expired: false,
            loading: false,
            supported: true,
            token: null,
            timeout: true,
          });
          if (typeof onTimeoutRef.current !== 'undefined') {
            onTimeoutRef.current(...args);
          }
        },
        'unsupported-callback'(...args: readonly unknown[]): void {
          setState({
            error: null,
            expired: false,
            loading: false,
            supported: false,
            token: null,
            timeout: false,
          });
          if (typeof onUnsupportedRef.current !== 'undefined') {
            onUnsupportedRef.current(...args);
          }
        },
      });
    };

    if (hasScript(scripts)) {
      readyRender();
      return;
    }

    const script: HTMLScriptElement = window.document.createElement('script');
    script.setAttribute('defer', '');
    script.setAttribute('src', SRC);
    window.document.body.appendChild(script);
    readyRender();
  }, [appearance, containerId, execution, language, retry, sitekey, theme]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
