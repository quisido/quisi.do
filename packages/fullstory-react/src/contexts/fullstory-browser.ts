'use client';

import type * as fullStoryBrowser from '@fullstory/browser';
import { createContext } from 'react';

export default createContext<typeof fullStoryBrowser | null>(null);
