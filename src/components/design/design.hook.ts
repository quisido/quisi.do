import type {
  Attributes,
  LazyExoticComponent,
  PropsWithRef,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { useEffect, useState } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesignSystem from '../../hooks/use-design-system';
import filterByPropsWithChildren from './utils/filter-by-props-with-children';

interface Props<P> {
  readonly props: PropsWithRef<P> & Readonly<Attributes>;
  readonly components: Readonly<
    Record<DesignSystem, LazyExoticComponent<(props: P) => ReactElement>>
  >;
}

interface State<P> {
  readonly Component: LazyExoticComponent<(props: P) => ReactElement>;
  readonly fallback: ReactChild | ReactFragment | ReactPortal | null;
  readonly showFallback: boolean;
}

const SHOW_FALLBACK_DELAY = 333;

export default function useDesign<P>({
  components,
  props,
}: Readonly<Props<P>>): State<P> {
  // Contexts
  const [designSystem] = useDesignSystem();

  // States
  const [showFallback, setShowFallback] = useState(false);

  useEffect((): VoidFunction => {
    const timeout: number = window.setTimeout((): void => {
      setShowFallback(true);
    }, SHOW_FALLBACK_DELAY);

    return (): void => {
      window.clearTimeout(timeout);
    };
  }, []);

  return {
    Component: components[designSystem],
    showFallback,

    fallback:
      filterByPropsWithChildren(props) && typeof props.children !== 'undefined'
        ? props.children
        : null,
  };
}
