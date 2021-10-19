import type {
  Attributes,
  LazyExoticComponent,
  PropsWithRef,
  ReactElement,
  ReactNode,
} from 'react';
import { Suspense } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesign from './design.root.hook';

interface Props<P> {
  readonly props: Readonly<Attributes> & PropsWithRef<P>;
  readonly fallback?: ReactNode | undefined;
  readonly components: Readonly<
    Record<DesignSystem, LazyExoticComponent<(props: P) => ReactElement>>
  >;
}

export default function Design<P>({
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
      <Component {...props} />
    </Suspense>
  );
}
