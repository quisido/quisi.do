import type { Attributes, ComponentType, ReactElement } from 'react';

export default function mapPropsToElement<P>(
  Component: ComponentType<P>,
): (props: Required<Attributes> & P) => ReactElement {
  return function mapPropsToElementImpl({
    key,
    ...props
  }: Attributes & P): ReactElement {
    return <Component key={key} {...(props as P)} />;
  };
}
