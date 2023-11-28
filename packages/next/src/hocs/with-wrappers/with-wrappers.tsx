import {
  type ComponentType,
  Fragment,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
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
    return function WrappedComponent(props: Props): ReactElement {
      return (
        <Wrapper>
          <Component {...props} />
        </Wrapper>
      );
    };
  };
}
