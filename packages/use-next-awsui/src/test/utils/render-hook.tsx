import type {
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react';
import { renderHook as testingLibraryRenderHook } from '@testing-library/react';
import { type MemoryHistory, createMemoryHistory } from 'history';
import MockNextRouter from 'mock-next-router';
import { type PropsWithChildren, type ReactNode } from 'react';

interface Options<Props> extends RenderHookOptions<Props> {
  readonly initialHref?: string | undefined;
}

interface Result<Props, State> extends RenderHookResult<State, Props> {
  readonly expectHrefToBe: (url: string) => void;
  readonly expectToHavePrefetched: (href: string) => void;
  readonly navigate: (to: string) => void;
}

export default function renderHook<Props, State>(
  useHook: (props: Props) => State,
  { initialHref = '/', ...options }: Readonly<Options<Props>> = {},
): Result<Props, State> {
  const memoryHistory: MemoryHistory = createMemoryHistory({
    initialEntries: [initialHref],
  });

  // Set the initial hash.
  const { hash: initialHash } = new URL(`https://localhost${initialHref}`);
  if (initialHash !== '') {
    window.location.href = initialHash;
  }

  const prefetch = jest.fn();
  const renderHookResult: RenderHookResult<State, Props> =
    testingLibraryRenderHook(useHook, {
      ...options,
      wrapper({ children }: PropsWithChildren): ReactNode {
        return (
          <MockNextRouter history={memoryHistory} prefetch={prefetch}>
            {children}
          </MockNextRouter>
        );
      },
    });

  return {
    ...renderHookResult,

    expectHrefToBe(href: string): void {
      const { hash: currentHash, pathname, search } = memoryHistory.location;
      expect(href).toBe(`${pathname}${search}${currentHash}`);
    },

    expectToHavePrefetched(href: string): void {
      expect(prefetch).toHaveBeenCalledWith(href);
    },

    navigate(to: string): void {
      memoryHistory.push(to);
    },
  };
}
