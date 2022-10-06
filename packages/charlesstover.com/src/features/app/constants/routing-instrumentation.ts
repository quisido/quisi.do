import { reactRouterV6Instrumentation } from '@sentry/react';
import { useEffect } from 'react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

const ROUTING_INSTRUMENTATION = reactRouterV6Instrumentation(
  useEffect,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
);

export default ROUTING_INSTRUMENTATION;
