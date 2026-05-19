import { type TracerProvider as TracerProviderType } from '@opentelemetry/api';
import { type Context, createContext } from 'react';

// `TracerProvider` loads asynchronously. `null` represents a loading state.
const TracerProvider: Context<TracerProviderType | null> =
  createContext<TracerProviderType | null>(null);

export default TracerProvider;
