import { type Context, createContext } from 'react';

const WindowContext: Context<Window | null> = createContext<Window | null>(
  null,
);

export default WindowContext;
