import { useEffect, useRef, type MutableRefObject } from 'react';

export default function useMountedRef(): MutableRefObject<boolean> {
  const isMountedRef: MutableRefObject<boolean> = useRef(true);

  useEffect(
    (): VoidFunction => (): void => {
      isMountedRef.current = false;
    },
    [],
  );

  return isMountedRef;
}
