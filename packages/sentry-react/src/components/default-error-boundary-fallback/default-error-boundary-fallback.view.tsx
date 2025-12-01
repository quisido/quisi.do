import { mapToString } from 'fmrs';
import type { ReactElement } from 'react';

interface Props {
  readonly error: unknown;
  // readonly resetError: () => void;
}

export default function DefaultErrorBoundaryFallback({
  error,
}: Props): ReactElement {
  return <>{mapToString(error)}</>;
}
