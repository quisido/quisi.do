import { type Context, createContext } from 'react';
import type { SentrySdk as SentrySdkType } from '../types/sentry-sdk.js';

export default createContext<SentrySdkType | null>(
  null,
) satisfies Context<SentrySdkType | null>;
