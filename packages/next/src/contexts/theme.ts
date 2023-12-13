'use client';

import { createContext } from 'react';
import type Theme from '../types/theme';

export default createContext<Theme | null>(null);
