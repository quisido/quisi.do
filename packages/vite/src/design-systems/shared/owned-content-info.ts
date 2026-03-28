import { type Context, createContext } from 'react';

export interface OwnedContentInfo {
  readonly id: string | null;
  readonly remove: VoidFunction;
  readonly set: (id: string) => void;
}

export const OwnedContentInfoContext: Context<OwnedContentInfo | null> =
  createContext<OwnedContentInfo | null>(null);
