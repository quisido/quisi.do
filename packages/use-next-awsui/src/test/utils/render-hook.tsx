import type {
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react';
import { renderHook as testingLibraryRenderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactNode } from 'react';
import MockNextRouter, { PUSH } from '../components/mock-next-router.js';

interface Options<Props> extends RenderHookOptions<Props> {
  readonly host?: string | undefined;
  readonly initialHref?: string | undefined;
}

interface Result<Props, State> extends RenderHookResult<State, Props> {
  readonly expectHrefToBe: (url: string) => void;
  readonly navigate: (to: string) => void;
}

export default function renderHook<Props, State>(
  useHook: (props: Props) => State,
  { host = 'https://localhost', initialHref = '/', ...options }: Readonly<Options<Props>> = {},
): Result<Props, State> {
  const url: URL = new URL(`${host}${initialHref}`);
  const renderHookResult: RenderHookResult<State, Props> =
    testingLibraryRenderHook(useHook, {
      ...options,
      wrapper({ children }: PropsWithChildren): ReactNode {
        return <MockNextRouter url={url}>{children}</MockNextRouter>;
      },
    });

  return {
    ...renderHookResult,

    expectHrefToBe(href: string): void {
      expect(window.location.href.substring(host.length - 1)).toBe(href);
    },

    navigate(to: string): void {
      PUSH(to);
    },
  };
}
