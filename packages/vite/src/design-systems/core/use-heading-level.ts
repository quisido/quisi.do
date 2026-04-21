import { type RefObject, useLayoutEffect, useRef, useState } from 'react';
import getRefValue from './get-ref-value.js';
import mapElementToLevel from './map-element-to-level.js';

interface State<T> {
  readonly level: number | undefined;
  readonly ref: RefObject<T | null>;
}

export default function useHeadingLevel<T extends HTMLElement>(): State<T> {
  const ref: RefObject<T | null> = useRef(null);
  const [level, setLevel] = useState<number>();

  useLayoutEffect((): void => {
    const element: T = getRefValue(ref);
    const newLevel: number = mapElementToLevel(element);
    setLevel(newLevel + 1);
  }, []);

  return {
    level,
    ref,
  };
}
