import { type BrowserAgent } from '@newrelic/browser-agent/src/loaders/browser-agent.js';
import { useContext } from 'react';
import { BrowserAgentContext } from './browser-agent-context.jsx';

export { default } from './new-relic.js';
export { type BrowserAgent } from '@newrelic/browser-agent/src/loaders/browser-agent.js';

export const useNewRelicBrowserAgent = (): BrowserAgent | null => {
  return useContext(BrowserAgentContext);
};
