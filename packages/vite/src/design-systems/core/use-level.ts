import { type RefObject, useLayoutEffect, useRef, useState } from 'react';
import mapElementToLevel from './map-element-to-level.js';

interface State<T> {
  readonly level: number | undefined;
  readonly ref: RefObject<T | null>;
}

/**
 * The `useLevel` hook calculates the logical level for an element, based on
 * the levels of its sibling and parent elements.
 */

export default function useLevel<T extends HTMLElement>(): State<T> {
  const ref: RefObject<T | null> = useRef(null);
  const [level, setLevel] = useState<number | undefined>();

  useLayoutEffect((): void => {
    const { current: element } = ref;
    if (element === null) {
      return;
    }

    const newLevel: number = mapElementToLevel(element);
    setLevel(newLevel);
  }, []);

  return {
    level,
    ref,
  };
}
