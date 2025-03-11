import { createContext } from 'react';
import type IntercomFunction from '../types/intercom-function.js';

export default createContext<IntercomFunction | null>(null);
