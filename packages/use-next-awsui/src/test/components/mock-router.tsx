import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime.js";
import { Router } from "next/router.js";
import { Fragment, useMemo, type PropsWithChildren } from "react";
import createPromise from "../utils/create-promise.js";
import Null from "./null.js";
import type { ParsedUrlQuery } from "querystring";
import mapIterableToRecord from "../utils/map-iterable-to-record.js";

interface Props {
  readonly pathname: string;
  readonly urlSearchParams: URLSearchParams;
}

window.__NEXT_DATA__ = {
  buildId: 'jest',
  page: '/',
  props: {},
  query: {},
};

export const GET_MIDDLEWARE = jest.fn();
export const SUBSCRIPTION = jest.fn(createPromise);
export const WRAP_APP = jest.fn();

export default function MockRouter({ children, pathname, urlSearchParams }: PropsWithChildren<Props>) {
  const value: Router = useMemo((): Router => {
    const query: ParsedUrlQuery = mapIterableToRecord(urlSearchParams);
    return new Router(pathname, query, '', {
      App: Null,
      Component: Fragment,
      initialProps: {},
      isFallback: false,
      subscription: SUBSCRIPTION,
      wrapApp: WRAP_APP,
      pageLoader: {
        getMiddleware: GET_MIDDLEWARE,
      },
    });
  }, [pathname, urlSearchParams]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
