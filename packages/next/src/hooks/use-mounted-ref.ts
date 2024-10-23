import {
  useEffect,
  useRef,
  type MutableRefObject,
  type RefObject,
} from 'react';

export default function useMountedRef(): RefObject<boolean> {
  const isMountedRef: MutableRefObject<boolean> = useRef(true);

  useEffect(
    (): VoidFunction => (): void => {
      isMountedRef.current = false;
    },
    [],
  );

  return isMountedRef;
}
