'use client';

import type {
  TracerProvider as ITracerProvider,
  Tracer,
  TracerOptions,
} from '@opentelemetry/api';
import { useContext, useMemo } from 'react';
import useShallowMemo from 'use-shallow-memo';
import TracerProvider from '../contexts/tracer-provider.js';

const DEFAULT_OPTIONS: TracerOptions = {};

export default function useTracer(
  name: string,
  version: number | string,
  options: TracerOptions = DEFAULT_OPTIONS,
): Tracer {
  const tracerProvider: ITracerProvider | null = useContext(TracerProvider);

  if (tracerProvider === null) {
    throw new Error('Expected a tracer provider to be provided.');
  }

  const memoizedOptions: TracerOptions = useShallowMemo(options);
  return useMemo(
    (): Tracer =>
      tracerProvider.getTracer(name, version.toString(), memoizedOptions),
    [tracerProvider, memoizedOptions, name, version],
  );
}
