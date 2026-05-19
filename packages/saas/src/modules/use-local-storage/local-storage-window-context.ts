import { type Context, createContext } from 'react';

export const LocalStorageWindowContext: Context<Window | null> =
  createContext<Window | null>(null);
