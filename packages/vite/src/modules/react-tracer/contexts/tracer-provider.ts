import type { TracerProvider } from '@opentelemetry/api';
import { createContext } from 'react';

// `TraceProvider` loads asynchronously. `null` represents a loading state.
export default createContext<TracerProvider | null>(null);
