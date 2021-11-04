import type { ReactRouterInstrumentation } from '@sentry/react/dist/types';
import { Integrations } from '@sentry/tracing';
import type {
  Integration,
  Transaction,
  TransactionContext,
} from '@sentry/types';
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import type { Location, NavigationType } from 'react-router-dom';
import { useLocation, useNavigationType } from 'react-router-dom';
import TAGS from '../constants/tags';

export default function useReactRouterV6SentryBrowserTracingIntegration(): Integration {
  // Contexts
  const location: Location = useLocation();
  const navigationType: NavigationType = useNavigationType();

  // States
  const activeTransaction: MutableRefObject<Transaction | undefined> = useRef();
  const customStartTransaction: MutableRefObject<
    | ((context: Readonly<TransactionContext>) => Transaction | undefined)
    | undefined
  > = useRef();
  const pathname: MutableRefObject<string> = useRef(location.pathname);
  const startTransactionOnLocationChange: MutableRefObject<boolean> =
    useRef(true);

  // Effects
  useEffect((): void => {
    pathname.current = location.pathname;
  }, [location.pathname]);

  useEffect((): void => {
    if (
      typeof customStartTransaction.current !== 'function' ||
      !startTransactionOnLocationChange.current ||
      (navigationType !== 'POP' && navigationType !== 'PUSH')
    ) {
      return;
    }

    if (activeTransaction.current) {
      activeTransaction.current.finish();
    }

    activeTransaction.current = customStartTransaction.current({
      name: location.pathname,
      op: 'navigation',
      tags: TAGS,
    });
  }, [location.pathname, navigationType]);

  useEffect((): VoidFunction => {
    // Finish the active transaction on unmount.
    return (): void => {
      if (typeof activeTransaction.current === 'undefined') {
        return;
      }
      activeTransaction.current.finish();
    };
  }, []);

  return useMemo((): Integration => {
    const routingInstrumentation: ReactRouterInstrumentation = (
      newCustomStartTransaction: (
        context: Readonly<TransactionContext>,
      ) => Transaction | undefined,
      startTransactionOnPageLoad = true,
      newStartTransactionOnLocationChange = true,
    ): void => {
      customStartTransaction.current = newCustomStartTransaction;
      startTransactionOnLocationChange.current =
        newStartTransactionOnLocationChange;

      if (startTransactionOnPageLoad && pathname.current !== '') {
        activeTransaction.current = newCustomStartTransaction({
          name: pathname.current,
          op: 'pageload',
          tags: TAGS,
        });
      }
    };

    return new Integrations.BrowserTracing({
      routingInstrumentation,
    });
  }, []);
}
