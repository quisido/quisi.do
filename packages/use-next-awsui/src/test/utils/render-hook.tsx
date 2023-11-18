import type {
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react';
import { renderHook as testingLibraryRenderHook } from '@testing-library/react';
import type { ComponentType, MutableRefObject, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { type NextRouter, withRouter } from 'next/router.js';
import AppRouterProvider from '../components/app-router-provider.js';

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
  const RouterListener: ComponentType<PropsWithChildren> = withRouter(
    ({
      children,
      router: routerProp,
    }: Readonly<PropsWithChildren<WrapperProps>>): ReactElement => {
      router = routerProp;
      return <>{children}</>;
    });

  const renderHookResult: RenderHookResult<State, Props> =
    testingLibraryRenderHook(useHook, {
      ...options,
      wrapper({ children }: PropsWithChildren): ReactNode {
        return <AppRouterProvider><RouterListener>{children}</RouterListener></AppRouterProvider>;
      },
    });

  return {
    ...renderHookResult,
    href,

    navigate(to: string): void {
      router?.push(to);
    },
  };
}
