import type {
  Attributes,
  ComponentType,
  LazyExoticComponent,
  PropsWithRef,
  ReactElement,
  ReactNode,
} from 'react';
import { Suspense } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesign from './design.hook';

interface Props<P extends Record<string, unknown>> {
  readonly components: Readonly<
    Record<DesignSystem, LazyExoticComponent<ComponentType<P>>>
  >;
  readonly fallback?: ReactNode | undefined;
  readonly props: P;
}

export default function Design<P extends Record<string, unknown>>({
  components,
  fallback: fallbackProp,
  props,
}: Readonly<Props<P>>): ReactElement {
  const {
    Component,
    fallback: fallbackState,
    showFallback,
  } = useDesign({
    components,
    props,
  });

  return (
    <Suspense fallback={showFallback && (fallbackProp ?? fallbackState)}>
      <Component {...(props as Attributes & PropsWithRef<P>)} />
    </Suspense>
  );
}
