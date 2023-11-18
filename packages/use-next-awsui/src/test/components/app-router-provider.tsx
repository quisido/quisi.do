import { type PropsWithChildren } from "react";
import noop from "../utils/noop.js";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime.js";

window.__NEXT_DATA__ = {
  buildId: 'jest',
  page: '/',
  props: {},
  query: {},
};

const APP_ROUTER_INSTANCE: AppRouterInstance = {
  back: noop, forward: noop, refresh: noop, push: noop,
  replace: noop, prefetch: noop,
};

export default function RouterProvider({ children }: PropsWithChildren) {
  return <AppRouterContext.Provider value={APP_ROUTER_INSTANCE}>{children}</AppRouterContext.Provider>;
}
