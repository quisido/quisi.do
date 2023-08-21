import type { Attributes, ComponentType, ReactElement } from 'react';
import type { Props as WrapperProps } from '../components/wrapper';
import Wrapper from '../components/wrapper';
import useEmptyWrapperProps from '../hooks/use-empty-wrapper-props';

export default function withWrapper<Props>(
  Component: ComponentType<Props>,
  useWrapperProps:
    | ((props: Props) => Partial<WrapperProps>)
    | undefined = useEmptyWrapperProps,
): ComponentType<Props> {
  return function WrappedComponent(props: Props): ReactElement {
    const wrapperProps: Partial<WrapperProps> = useWrapperProps(props);

    return (
      <Wrapper {...wrapperProps}>
        <Component {...(props as Attributes & Props)} />
      </Wrapper>
    );
  };
}
