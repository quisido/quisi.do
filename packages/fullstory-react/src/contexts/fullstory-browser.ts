'use client';

import type * as fullstoryBrowser from '@fullstory/browser';
import { createContext } from 'react';

export default createContext<Omit<typeof fullstoryBrowser, 'default'> | null>(
  null,
);
