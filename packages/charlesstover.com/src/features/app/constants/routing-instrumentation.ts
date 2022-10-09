import type { Location } from '@sentry/react/types/types';
import { reactRouterV6Instrumentation } from '@sentry/react';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

// The following types are incorrectly defined and required by `@sentry/react`.
// eslint-disable-next-line @typescript-eslint/no-type-alias
type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

interface RouteMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  pathnameBase: string;
  route: RouteObject;
}

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: ReactNode;
  index?: boolean;
  path?: string;
}

const ROUTING_INSTRUMENTATION = reactRouterV6Instrumentation(
  useEffect,
  useLocation,
  useNavigationType,
  createRoutesFromChildren as (children: ReactElement[]) => RouteObject[],
  matchRoutes as (
    routes: RouteObject[],
    location: Location,
  ) => RouteMatch[] | null,
);

export default ROUTING_INSTRUMENTATION;
