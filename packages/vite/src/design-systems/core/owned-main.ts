import { type Context, createContext } from 'react';

export interface OwnedMain {
  readonly id: string | null;
  readonly remove: VoidFunction;
  readonly set: (id: string) => void;
}

export const OwnedMainContext: Context<OwnedMain | null> =
  createContext<OwnedMain | null>(null);
