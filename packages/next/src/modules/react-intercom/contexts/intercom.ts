'use client';

import { createContext } from 'react';
import type IntercomFunction from '../types/intercom-function';

export default createContext<IntercomFunction | null>(null);
