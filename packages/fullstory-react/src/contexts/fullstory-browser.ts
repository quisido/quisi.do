import type * as fullstoryBrowser from '@fullstory/browser';
import { type Context, createContext } from 'react';

const FullstoryBrowserContext: Context<Omit<
  typeof fullstoryBrowser,
  'default'
> | null> = createContext<Omit<typeof fullstoryBrowser, 'default'> | null>(
  null,
);

export default FullstoryBrowserContext;
