import { type FSApi } from '@fullstory/snippet';
import { createContext } from 'react';

export default createContext<FSApi | null>(null);
