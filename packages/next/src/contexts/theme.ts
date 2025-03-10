import { createContext } from 'react';
import type Theme from '../types/theme.js';

export default createContext<Theme | null>(null);
