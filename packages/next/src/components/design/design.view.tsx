import {
  type Attributes,
  type ComponentType,
  type LazyExoticComponent,
  type PropsWithRef,
  type ReactElement,
  Suspense,
} from 'react';
import type DesignSystem from '../../constants/design-system.js';
import useDesign from './design.hook.js';

interface Props<P extends object> {
  readonly components: Readonly<
    Record<DesignSystem, LazyExoticComponent<ComponentType<P>>>
  >;
  readonly Fallback?: ComponentType<P>;
  readonly props: P;
}

export default function Design<P extends object>({
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
