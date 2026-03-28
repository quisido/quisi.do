import { type Context, createContext } from 'react';

export interface OwnedBanner {
  readonly id: string | null;
  readonly remove: VoidFunction;
  readonly set: (id: string) => void;
}

export const OwnedBannerContext: Context<OwnedBanner | null> =
  createContext<OwnedBanner | null>(null);
