import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime.js";
import { Router } from "next/router.js";
import { Fragment, type PropsWithChildren } from "react";
import createPromise from "../utils/create-promise.js";
import noop from "../utils/noop.js";
import Null from "./null.js";

window.__NEXT_DATA__ = {
  buildId: 'jest',
  page: '/',
  props: {},
  query: {},
};

const TEST_ROUTER: Router = new Router('/', {}, 'as', {
  App: Null,
  Component: Fragment,
  initialProps: {},
  isFallback: false,
  subscription: createPromise,
  wrapApp: noop,
  pageLoader: {
    getMiddleware: noop,
  },
});

export default function RouterProvider({ children }: PropsWithChildren) {
  return <RouterContext.Provider value={TEST_ROUTER}>{children}</RouterContext.Provider>;
}
