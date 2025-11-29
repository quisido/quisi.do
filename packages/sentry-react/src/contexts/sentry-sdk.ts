import { type Context, createContext } from 'react';
import type { SentrySdk as SentrySdkType } from '../types/sentry-sdk.js';

const SentrySdkContext: Context<SentrySdkType | null> = createContext<SentrySdkType | null>(
  null,
);

export default SentrySdkContext;
