import * as sentryBrowser from '@sentry/browser';
import { useContext } from 'react';
import SentrySdk from '../contexts/sentry-sdk.js';
import type { SentrySdk as SentrySdkType } from '../types/sentry-sdk.js';

export default function useSentrySdk(): SentrySdkType {
  return useContext(SentrySdk) ?? sentryBrowser;
}
