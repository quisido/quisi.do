'use client';

import { type ReactElement } from 'react';

interface Props {
  readonly error: Error;
  readonly reset: VoidFunction;
}

export default function ErrorBoundary({ error, reset }: Props): ReactElement {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
