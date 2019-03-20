'use client';

import {
  type ComponentType,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type DesignSystemProps from '../../types/design-system-props.js';
import useDesignSystemComponent from './hooks/use-design-system-component.js';
import type Props from './types/props.js';
import isPropsWithChildren from './utils/is-props-with-children.js';

interface State<Card extends object, Row extends object> {
  readonly Component: ComponentType<DesignSystemProps<Card, Row>>;
  readonly fallback: ReactNode;
}

const SHOW_FALLBACK_DELAY = 333;

export default function useDesignSystem<
  Card extends object,
  Row extends object,
>({ Fallback, props }: Readonly<Props<Card, Row>>): State<Card, Row> {
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
    Component: useDesignSystemComponent(),

    fallback: useMemo((): ReactNode => {
      if (!showFallback) {
        return;
      }

      if (typeof Fallback === 'function') {
        // @ts-expect-error TypeScript incorrectly decouples `Fallback` and `props`.
        return <Fallback {...props} />;
      }

      if (!isPropsWithChildren(props)) {
        return;
      }

      return props.children;
    }, [Fallback, props, showFallback]),
  };
}
