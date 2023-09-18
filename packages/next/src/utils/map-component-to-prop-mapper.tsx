import type { Attributes, ComponentType, ReactElement } from 'react';

export default function mapComponentToPropMapper<P>(
  Component: ComponentType<P>,
): (props: P & Readonly<Required<Attributes>>) => ReactElement {
  return function MappedPropsComponent({
    key,
    ...props
  }: P & Readonly<Required<Attributes>>): ReactElement {
    return <Component {...(props as P)} key={key} />;
  };
}
