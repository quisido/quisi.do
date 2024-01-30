'use client';

import {
  type ComponentType,
  type LazyExoticComponent,
  type PromiseLikeOfReactNode,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import type DesignSystem from '../../constants/design-system.js';
import { useDesignSystem } from '../../contexts/design-system.js';
import filterByPropsWithChildren from './utils/filter-by-props-with-children.js';

interface Props<P extends object> {
  readonly components: Readonly<
    Record<DesignSystem, LazyExoticComponent<ComponentType<P>>>
  >;
  readonly props: P;
}

interface State<P extends object> {
  readonly Component: LazyExoticComponent<ComponentType<P>>;
  readonly fallback:
    | ReactElement
    | Iterable<ReactNode>
    | PromiseLikeOfReactNode
    | boolean
    | number
    | string
    | null;
  readonly showFallback: boolean;
}

const SHOW_FALLBACK_DELAY = 333;

export default function useDesign<P extends object>({
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
