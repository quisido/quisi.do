import { toString } from 'fmrs';
import { type ReactElement } from 'react';
import type FallbackRenderParams from '../src/types/fallback-render-params.js';

export default function CustomErrorBoundaryFallback({
  error,
}: FallbackRenderParams): ReactElement {
  return (
    <div aria-live="assertive" role="alert">
      {toString(error)}
    </div>
  );
}
