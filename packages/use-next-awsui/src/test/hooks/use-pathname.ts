import type { MemoryHistory, Update } from "history";
import { useEffect, type MutableRefObject, useRef } from "react";
import useForceUpdate from "use-force-update";

export default function usePathname(memoryHistory: MemoryHistory): string {
  // States
  const forceUpdate: VoidFunction = useForceUpdate();
  const pathnameRef: MutableRefObject<string> = useRef(memoryHistory.location.pathname);

  // Effects
  useEffect((): VoidFunction => {
    const handleUpdate = ({ location }: Update): void => {
      const { pathname: newPathname } = location;
      if (pathnameRef.current === newPathname) {
        return;
      }

      pathnameRef.current = newPathname;
      forceUpdate();
    };

    const unlisten: VoidFunction = memoryHistory.listen(handleUpdate);
    return (): void => {
      unlisten();
    };
  }, [forceUpdate, memoryHistory]);

  return memoryHistory.location.pathname;
}
