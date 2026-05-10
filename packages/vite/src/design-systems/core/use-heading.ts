import { type RefCallback, useLayoutEffect, useState } from 'react';
import mapElementToLevel from './map-element-to-level.js';

export interface HeadingState<T> {
  readonly level: number | undefined;
  readonly ref: RefCallback<T>;
}

interface Props {
  readonly level: number | undefined;
}

const FIFO_REF_LAYOUT_EFFECTS: VoidFunction[] = [];

export default function useHeading<T extends HTMLElement>({
  level: explicitLevel,
}: Props): HeadingState<T> {
  const [implicitLevel, setImplicitLevel] = useState<number>();

  useLayoutEffect((): void => {
    // eslint-disable-next-line init-declarations
    let calculate: VoidFunction | undefined;
    while ((calculate = FIFO_REF_LAYOUT_EFFECTS.shift())) {
      calculate();
    }
  });

  return {
    level: explicitLevel ?? implicitLevel,
    ref: (element: T | null): void => {
      if (element === null) {
        return;
      }

      FIFO_REF_LAYOUT_EFFECTS.push((): void => {
        const level: number = mapElementToLevel(element);
        /**
         * We must immediately mutate the element directly so that other
         * layout effects will be able to calculate their levels (before
         * re-render).
         */
        element.setAttribute('aria-level', level.toString());
        setImplicitLevel(level);
      });
    },
  };
}
