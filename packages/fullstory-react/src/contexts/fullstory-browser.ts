import type * as fullstoryBrowser from '@fullstory/browser';
import { createContext, type Context } from 'react';

const FullstoryBrowserContext: Context<Omit<typeof fullstoryBrowser, 'default'> | null>
= createContext<Omit<typeof fullstoryBrowser, 'default'> | null>(
  null,
);

export default FullstoryBrowserContext;
