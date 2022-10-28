import type {
  Attributes,
  ComponentType,
  LazyExoticComponent,
  PropsWithRef,
  ReactElement,
} from 'react';
import { Suspense } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesign from './design.hook';

interface Props<P extends Record<string, unknown>> {
  readonly components: Readonly<
    Record<DesignSystem, LazyExoticComponent<ComponentType<P>>>
  >;
  readonly Fallback?: ComponentType<P>;
  readonly props: P;
}

export default function Design<P extends Record<string, unknown>>({
  components,
  Fallback,
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
    <Suspense
      fallback={
        showFallback && (Fallback ? <Fallback {...props} /> : fallbackState)
      }
    >
      <Component {...(props as Attributes & PropsWithRef<P>)} />
    </Suspense>
  );
}
