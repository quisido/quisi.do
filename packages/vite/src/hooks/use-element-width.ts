import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

interface State<T extends HTMLElement> {
  readonly ref: RefObject<T | null>;
  readonly width: number | undefined;
}

export default function useElementWidth<T extends HTMLElement>(): State<T> {
  // States
  const ref: RefObject<T | null> = useRef(null);
  const [width, setWidth] = useState<number | undefined>();

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
