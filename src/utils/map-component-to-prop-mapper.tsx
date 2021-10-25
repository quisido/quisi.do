import type { Attributes, ComponentType, ReactElement } from 'react';

export default function mapComponentToPropMapper<P>(
  Component: ComponentType<P>,
): (props: Readonly<Attributes> & P) => ReactElement {
  return function MappedPropsComponent(
    props: Readonly<Attributes> & P,
  ): ReactElement {
    return <Component {...props} />;
  };
}
