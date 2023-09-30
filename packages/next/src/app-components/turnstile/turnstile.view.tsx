'use client';

import {
  type PropsWithChildren,
  type ReactElement,
  createContext,
  useState,
  useEffect,
  useMemo,
  useId,
} from 'react';

// https://developers.cloudflare.com/turnstile/reference/supported-languages/
type Language =
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

interface Props {
  readonly appearance?: 'always' | 'execute' | 'interaction-only' | undefined;
  readonly execution?: 'execute' | 'render' | undefined;
  readonly language?: Language | undefined;
  readonly retry?: 'auto' | 'never' | undefined;
  readonly sitekey: string;
  readonly theme?: 'dark' | 'light' | 'auto' | undefined;
}

interface Turnstile {
  readonly ready: (callback: VoidFunction) => void;
  readonly render: (
    container: string,
    params?: RenderParameters | undefined,
  ) => void;
}

interface RenderParameters {
  readonly appearance?: 'always' | 'execute' | 'interaction-only' | undefined;
  readonly callback: (token: string) => void;
  readonly execution?: 'execute' | 'render' | undefined;
  readonly language?: Language | undefined;
  readonly retry?: 'auto' | 'never' | undefined;
  readonly sitekey: string;
  readonly theme?: 'auto' | 'dark' | 'light' | undefined;
  readonly 'expired-callback'?: VoidFunction | undefined;
  readonly 'timeout-callback'?: VoidFunction | undefined;
  readonly 'after-interactive-callback'?: VoidFunction | undefined;
  readonly 'before-interactive-callback'?: VoidFunction | undefined;
  readonly 'error-callback'?: VoidFunction | undefined;
  readonly 'unsupported-callback'?: VoidFunction | undefined;
}

interface TurnstileWindow extends Window {
  readonly turnstile: Turnstile;
}

interface Value {
  readonly loading: boolean;
  readonly token: string | null;
}

const Context = createContext<Value | null>(null);
const SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const hasScript = (scripts: HTMLCollectionOf<HTMLScriptElement>): boolean => {
  for (const script of scripts) {
    if (script.getAttribute('src') !== SRC) {
      continue;
    }
    return true;
  }
  return false;
};

const hasTurnstile = (w: Window): w is TurnstileWindow => 'turnstile' in w;

function Turnstile({
  appearance,
  children,
  execution,
  language,
  retry,
  sitekey,
  theme,
}: PropsWithChildren<Props>): ReactElement {
  const containerId: string = useId();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect((): void => {
    const scripts: HTMLCollectionOf<HTMLScriptElement> =
      window.document.getElementsByTagName('script');

    const readyRender = (attempt: number = 0): void => {
      if (!hasTurnstile(window)) {
        // ~30 seconds
        if (attempt < 150) {
          setTimeout((): void => {
            readyRender(attempt + 1);
          }, 200);
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
          setLoading(false);
          setToken(newToken);
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

  return (
    <Context.Provider
      value={useMemo(
        (): Value => ({
          loading,
          token,
        }),
        [loading, token],
      )}
    >
      {children}
    </Context.Provider>
  );
}

export default function AppTurnstile({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <Turnstile sitekey="0x4AAAAAAAK2L9AbDrFo9T77" theme="dark">
      {children}
    </Turnstile>
  );
}
