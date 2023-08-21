import type { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { Fragment } from 'react';
import reduceWrappersToWrapper from './utils/reduce-wrappers-to-wrapper';

export default function withWrappers(
  ...Wrappers: readonly ComponentType<Required<PropsWithChildren>>[]
): <Props>(Component: ComponentType<Props>) => ComponentType<Props> {
  const Wrapper: ComponentType<Required<PropsWithChildren>> = Wrappers.reduce(
    reduceWrappersToWrapper,
    Fragment,
  );

  return function wrapComponent<Props>(
    Component: ComponentType<Props>,
  ): ComponentType<Props> {
    return function WrappedComponent(props: Readonly<Props>): ReactElement {
      return (
        <Wrapper>
          <Component {...props} />
        </Wrapper>
      );
    };
  };
}