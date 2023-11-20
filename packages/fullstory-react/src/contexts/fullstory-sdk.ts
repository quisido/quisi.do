'use client';

import { createContext } from 'react';
import type { FullStorySdk } from '../types/fullstory-sdk.js';

export default createContext<FullStorySdk | null>(null);
