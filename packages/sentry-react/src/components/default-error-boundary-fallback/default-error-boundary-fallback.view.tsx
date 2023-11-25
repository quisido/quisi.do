import type { ReactElement } from 'react';

interface Props {
  readonly error: Readonly<Error>;
  // readonly resetError: () => void;
}

export default function DefaultErrorBoundaryFallback({
  error,
}: Props): ReactElement {
  return <>{error.message}</>;
}
