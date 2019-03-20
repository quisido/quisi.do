import {
  AppRouterContext,
  type AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime.js';
import { type MutableRefObject, useContext } from 'react';

interface State {
  readonly appRouter: MutableRefObject<AppRouterInstance | null>;
  readonly Consumer: () => null;
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
