import type {
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react';
import { renderHook as testingLibraryRenderHook } from '@testing-library/react';
import type { MutableRefObject, PropsWithChildren, ReactElement } from 'react';
import { withRouter, type NextRouter } from 'next/router.js';

interface Options<Props> extends RenderHookOptions<Props> {
  readonly initialHref?: string | undefined;
}

interface Result<Props, State> extends RenderHookResult<State, Props> {
  readonly href: MutableRefObject<string>;
  readonly navigate: (to: string) => void;
}

interface WrapperProps {
  readonly router: NextRouter;
}

export default function renderHook<Props, State>(
  useHook: (props: Props) => State,
  { initialHref = '', ...options }: Readonly<Options<Props>> = {},
): Result<Props, State> {
  const href: MutableRefObject<string> = {
    current: '',
  };

  let router: NextRouter | undefined;
  const renderHookResult: RenderHookResult<State, Props> =
    testingLibraryRenderHook(useHook, {
      ...options,
      wrapper: withRouter(
        ({
          children,
          router: routerProp,
        }: Readonly<PropsWithChildren<WrapperProps>>): ReactElement => {
          router = routerProp;
          return <>{children}</>;
        },
      ),
    });

  return {
    ...renderHookResult,
    href,

    navigate(to: string): void {
      router?.push(to);
    },
  };
}
