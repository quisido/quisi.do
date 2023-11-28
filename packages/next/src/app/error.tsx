'use client'; // Error components must be Client Components

import { withRecordError } from 'aws-rum-react';
import { type ReactElement, useEffect } from 'react';

interface Props {
  readonly error: Error;
  readonly recordError: (error: unknown) => void;
  readonly reset: VoidFunction;
}

function ErrorBoundary({ error, recordError, reset }: Props): ReactElement {
  useEffect((): void => {
    recordError(error);
  }, [recordError]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

export default withRecordError(ErrorBoundary);
