import { createContext, type Context } from 'react';

export const LocalStorageWindowContext: Context<Window | null> =
  createContext<Window | null>(null);
