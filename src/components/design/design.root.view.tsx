import type { ComponentType, ReactElement } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesign from './design.root.hook';

interface Props<P> {
  readonly components: Readonly<Record<DesignSystem, ComponentType<P>>>;
  readonly props: P;
}

export default function Design<P>({
  components,
  props,
}: Readonly<Props<P>>): ReactElement {
  const Component = useDesign(components);
  return <Component {...props} />;
}
