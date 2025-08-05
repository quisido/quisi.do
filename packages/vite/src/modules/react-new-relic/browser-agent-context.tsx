import type { BrowserAgent } from '@newrelic/browser-agent/src/loaders/browser-agent.js';
import { createContext, type Context } from 'react';

export const BrowserAgentContext: Context<BrowserAgent | null> =
  createContext<BrowserAgent | null>(null);
