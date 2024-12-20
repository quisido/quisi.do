import {
  AppRouterContext,
  type AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime.js';
import { useContext, type MutableRefObject, type RefObject } from 'react';

interface State {
  readonly Consumer: () => null;
  readonly appRouter: RefObject<AppRouterInstance | null>;
}

export default function createAppRouterConsumer(): State {
  const appRouter: MutableRefObject<AppRouterInstance | null> = {
    current: null,
  };

  return {
    appRouter,

    Consumer: function AppRouterConsumer(): null {
      appRouter.current = useContext(AppRouterContext);
      return null;
    },
  };
}
