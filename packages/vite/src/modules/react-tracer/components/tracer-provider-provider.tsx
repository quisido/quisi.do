import type { TracerProvider as ITracerProvider } from '@opentelemetry/api';
import type { ReactElement, ReactNode } from 'react';
import TracerProvider from '../contexts/tracer-provider.js';

interface Props {
  readonly children: ReactNode;
  readonly value: ITracerProvider | null;
}

export default function TracerProviderProvider({
  children,
  value,
}: Props): ReactElement {
  return (
    <TracerProvider.Provider value={value}>{children}</TracerProvider.Provider>
  );
}
