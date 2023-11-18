import { useMemo, type PropsWithChildren, type ReactNode } from "react";
import MockAppRouter from "./mock-app-router.js";
import MockRouter from "./mock-router.js";
import { PathnameContext, SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js";

export { PUSH } from './mock-app-router.js';

interface Props {
  readonly url: URL;
}

export default function MockNextRouter({
  children,
  url,
}: PropsWithChildren<Props>): ReactNode {
  const { pathname, search } = url;
  const urlSearchParams: URLSearchParams = useMemo((): URLSearchParams =>
    new URLSearchParams(search),
    [search],
  );

  return (
    <MockAppRouter>
      <MockRouter pathname={pathname} urlSearchParams={urlSearchParams}>
        <PathnameContext.Provider value={pathname}>
          <SearchParamsContext.Provider value={urlSearchParams}>
            {children}
          </SearchParamsContext.Provider>
        </PathnameContext.Provider>
      </MockRouter>
    </MockAppRouter>
  );
}
