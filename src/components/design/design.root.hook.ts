import type {
  Attributes,
  LazyExoticComponent,
  PropsWithChildren,
  PropsWithRef,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { useEffect, useState } from 'react';
import type DesignSystem from '../../constants/design-system';
import useDesignSystem from '../../hooks/use-design-system';

interface Props<P> {
  readonly props: Readonly<Attributes> & PropsWithRef<P>;
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

const filterByPropsWithChildren = <P>(
  props: P,
): props is PropsWithChildren<P> =>
  Object.prototype.hasOwnProperty.call(props, 'children');

export default function useDesign<P>({
  components,
  props,
}: Readonly<Props<P>>): State<P> {
  // Contexts
  const designSystem: DesignSystem = useDesignSystem();

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
