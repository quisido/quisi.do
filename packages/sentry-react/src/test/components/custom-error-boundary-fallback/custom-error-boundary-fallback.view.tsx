import type { ReactElement } from 'react';
import type FallbackRenderParams from '../../../types/fallback-render-params';

export default function CustomErrorBoundaryFallback({
  error,
}: FallbackRenderParams): ReactElement {
  return <>{error.message}</>;
}
