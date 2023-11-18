import { createMemoryHistory, type MemoryHistory } from "history";
import { PathnameContext, SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js";
import { useMemo, type PropsWithChildren, type ReactNode } from "react";
import MockAppRouter from "./mock-app-router.js";
import MockRouter from "./mock-router.js";
import useHashChangeEvents from "../hooks/use-hash-change-events.js";
import usePathname from "../hooks/use-pathname.js";
import useUrlSearchParams from "../hooks/use-url-search-params.js";
import type { PrefetchOptions } from "next/dist/shared/lib/app-router-context.shared-runtime.js";

interface Props {
  readonly history?: MemoryHistory | undefined;
  readonly prefetch?: ((href: string, options?: PrefetchOptions | undefined) => void) | undefined;
}

export default function MockNextRouter({
  children,
  history: historyProp,
  prefetch,
}: PropsWithChildren<Props>): ReactNode {
  // States
  const historyState: MemoryHistory = useMemo((): MemoryHistory =>
    historyProp ?? createMemoryHistory(),
    [historyProp],
  );

  const pathname: string = usePathname(historyState);
  const urlSearchParams: URLSearchParams = useUrlSearchParams(historyState);

  // Effects
  useHashChangeEvents(historyState);

  return (
    <MockAppRouter history={historyState} prefetch={prefetch}>
      <MockRouter history={historyState}>
        <PathnameContext.Provider value={pathname}>
          <SearchParamsContext.Provider value={urlSearchParams}>
            {children}
          </SearchParamsContext.Provider>
        </PathnameContext.Provider>
      </MockRouter>
    </MockAppRouter>
  );
}
