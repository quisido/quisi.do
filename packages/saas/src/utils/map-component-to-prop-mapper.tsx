import { type ComponentType, type ReactElement } from 'react';
import { type WithKey } from '../types/with-key.js';

export default function mapComponentToPropMapper<P>(
  Component: ComponentType<P>,
): (props: WithKey<P>) => ReactElement {
  return function MappedPropsComponent({
    key,
    ...props
  }: WithKey<P>): ReactElement {
    return <Component {...(props as P)} key={key} />;
  };
}
