import { type Context, createContext } from 'react';
import type IntercomFunction from '../types/intercom-function.js';

const IntercomContext: Context<IntercomFunction | null> =
  createContext<IntercomFunction | null>(null);

export default IntercomContext;
