'use client';

import { type Context, createContext } from 'react';

const Hostname: Context<string | null> = createContext<string | null>(null);

export default Hostname;
