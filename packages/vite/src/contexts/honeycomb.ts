import { type HoneycombWebSDK } from '@honeycombio/opentelemetry-web';
import createContextUtils from '../modules/create-context-utils/index.js';

export const {
  ContextProvider: HoneycombProvider,
  useContextValue: useHoneycomb,
} = createContextUtils<HoneycombWebSDK | undefined>();
