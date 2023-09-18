import type {
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { renderHook as testingLibraryRenderHook } from '@testing-library/react-hooks';
import type { MutableRefObject, PropsWithChildren, ReactElement } from 'react';
import type { NavigateFunction, NavigateOptions, To } from 'react-router';
import { MemoryRouter, useLocation, useNavigate } from 'react-router';

interface Options<Props> extends RenderHookOptions<Props> {
  readonly initialHref?: string | undefined;
}

interface Result<Props, State> extends RenderHookResult<Props, State> {
  readonly href: MutableRefObject<string>;
  readonly navigate: NavigateFunction;
}

export default function renderHook<Props, State>(
  useHook: (props: Readonly<Props>) => State,
  { initialHref = '', ...options }: Readonly<Options<Props>> = {},
): Result<Props, State> {
  const href: MutableRefObject<string> = {
    current: '',
  };

  const initialEntries: string[] = [initialHref];

  const navigate: MutableRefObject<NavigateFunction> = {
    current: (): void => {
      throw new Error('`navigate` is not instantiated.');
    },
  };

  function Href(): null {
    const { hash, pathname, search } = useLocation();
    navigate.current = useNavigate();
    href.current = `${pathname}${search}${hash}`;
    return null;
  }

  const renderHookResult: RenderHookResult<Props, State> =
    testingLibraryRenderHook(useHook, {
      ...options,
      wrapper({
        children,
      }: Readonly<PropsWithChildren<unknown>>): ReactElement {
        return (
          <MemoryRouter initialEntries={initialEntries}>
            <Href />
            {children}
          </MemoryRouter>
        );
      },
    });

  return {
    ...renderHookResult,
    href,

    navigate(
      to: To | number,
      navigateOptions?: NavigateOptions | undefined,
    ): void {
      if (typeof to === 'number') {
        navigate.current(to);
        return;
      }
      navigate.current(to, navigateOptions);
    },
  };
}
