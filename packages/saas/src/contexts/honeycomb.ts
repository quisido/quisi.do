import { type HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import { type Provider } from 'react';
import createContextUtils from '../modules/create-context-utils/index.js';

const { ContextProvider, useContextValue } = createContextUtils<
  HoneycombWebSDK | undefined
>();

export const HoneycombProvider: Provider<HoneycombWebSDK | undefined> =
  ContextProvider;

export const useHoneycombProvider: () => HoneycombWebSDK | undefined =
  useContextValue;
