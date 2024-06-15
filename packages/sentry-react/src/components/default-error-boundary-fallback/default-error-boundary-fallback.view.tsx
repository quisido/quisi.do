import type { ReactElement } from 'react';
import mapUnknownToString from 'unknown2string';

interface Props {
  readonly error: unknown;
  // readonly resetError: () => void;
}

export default function DefaultErrorBoundaryFallback({
  error,
}: Props): ReactElement {
  return <>{mapUnknownToString(error)}</>;
}
