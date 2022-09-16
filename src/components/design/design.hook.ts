import type {
  ComponentType,
  LazyExoticComponent,
  ReactElement,
  ReactFragment,
} from 'react';
import { useEffect, useState } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesignSystem from '../../hooks/use-design-system';
import filterByDefined from '../../utils/filter-by-defined';
import filterByPropsWithChildren from './utils/filter-by-props-with-children';

interface Props<P extends Record<string, unknown>> {
  readonly components: Readonly<
    Record<DesignSystem, LazyExoticComponent<ComponentType<P>>>
  >;
  readonly props: P;
}

interface State<P extends Record<string, unknown>> {
  readonly Component: LazyExoticComponent<ComponentType<P>>;
  readonly fallback:
    | ReactElement
    | ReactFragment
    | boolean
    | number
    | string
    | null;
  readonly showFallback: boolean;
}

const SHOW_FALLBACK_DELAY = 333;

export default function useDesign<P extends Record<string, unknown>>({
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
      filterByPropsWithChildren(props) && filterByDefined(props.children)
        ? props.children
        : null,
  };
}
