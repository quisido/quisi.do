import type { MemoryHistory } from 'history';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime.js';
import { Router } from 'next/router.js';
import type { ParsedUrlQuery } from 'querystring';
import { Fragment, type PropsWithChildren, type ReactElement, useMemo } from 'react';
import createPromise from '../utils/create-promise.js';
import mapIterableToRecord from '../utils/map-iterable-to-record.js';
import Null from './null.js';
import noop from '../utils/noop.js';

interface Props {
  readonly history: MemoryHistory;
}

window.__NEXT_DATA__ = {
  buildId: 'jest',
  page: '/',
  props: {},
  query: {},
};

export default function MockRouter({
  children,
  history,
}: PropsWithChildren<Props>): ReactElement {
  const value: Router = useMemo((): Router => {
    const { pathname, search } = history.location;
    const urlSearchParams: URLSearchParams = new URLSearchParams(search);
    const query: ParsedUrlQuery = mapIterableToRecord(urlSearchParams);
    return new Router(pathname, query, '', {
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
  }, [history]);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
}
