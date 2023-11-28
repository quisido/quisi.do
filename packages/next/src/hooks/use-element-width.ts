'use client';

import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface State<T extends HTMLElement> {
  readonly ref: MutableRefObject<T | null>;
  readonly width: number | undefined;
}

const INITIAL_WIDTH = undefined;

export default function useElementWidth<T extends HTMLElement>(): State<T> {
  // States
  const ref: MutableRefObject<T | null> = useRef(null);
  const [width, setWidth] = useState<number | undefined>(INITIAL_WIDTH);

  // Callbacks
  const handleResize = useCallback((): void => {
    const target: T | null = ref.current;

    if (target === null) {
      return;
    }

    setWidth(target.clientWidth);
  }, []);

  // Effects
  useLayoutEffect((): void => {
    handleResize();
  }, [handleResize]);

  useEffect((): VoidFunction | undefined => {
    const target: T | null = ref.current;

    if (target === null) {
      return;
    }

    const observer: ResizeObserver = new ResizeObserver(handleResize);
    observer.observe(target);
    return (): void => {
      observer.unobserve(target);
    };
  }, [handleResize]);

  return {
    ref,
    width,
  };
}
