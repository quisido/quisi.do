'use client';

import type { TracerProvider } from '@opentelemetry/api';
import { createContext } from 'react';

export default createContext<TracerProvider | null>(null);
