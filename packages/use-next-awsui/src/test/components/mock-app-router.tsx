import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime.js";
import { type PropsWithChildren } from "react";

Object.defineProperty(window, 'location', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    ...window.location,
  },
});

export const BACK = jest.fn(window.history.back);
export const FORWARD = jest.fn(window.history.forward);
export const PREFETCH = jest.fn();

export const PUSH = jest.fn((href: string): void => {
  window.history.pushState(null, '', href);
  window.location.href = href;
});

export const REFRESH = jest.fn((): void => {
  window.history.go(0);
});

export const REPLACE = jest.fn((href: string): void => {
  window.history.replaceState(null, '', href);
});

const TEST_APP_ROUTER_INSTANCE: AppRouterInstance = {
  back: BACK,
  forward: FORWARD,
  prefetch: PREFETCH,
  push: PUSH,
  refresh: REFRESH,
  replace: REPLACE,
};

export default function MockAppRouter({ children }: PropsWithChildren) {
  return <AppRouterContext.Provider value={TEST_APP_ROUTER_INSTANCE}>{children}</AppRouterContext.Provider>;
}
