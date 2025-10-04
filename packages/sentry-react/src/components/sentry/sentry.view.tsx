'use client';

import type { Scope, User } from '@sentry/core';
import {
  type BrowserOptions,
  ErrorBoundary,
  type ReportDialogOptions,
} from '@sentry/react';
import type { ReactElement, ReactNode } from 'react';
import DefaultErrorBoundaryFallback from '../../components/default-error-boundary-fallback/index.js';
import type FallbackRenderParams from '../../types/fallback-render-params.js';
import useSentry from './sentry.hook.js';

interface Props extends Readonly<BrowserOptions> {
  readonly beforeErrorBoundaryCapture?:
    | ((
        scope: Readonly<Scope>,
        error: unknown,
        componentStack: string | undefined,
      ) => void)
    | undefined;
  readonly children: ReactNode;
  readonly errorBoundaryDialogOptions?: ReportDialogOptions | undefined;
  /**
   *   `ErrorBoundaryFallback` is a React `FunctionComponent` without the `null`
   * return type.
   */
  readonly ErrorBoundaryFallback?:
    | ((props: FallbackRenderParams) => ReactElement)
    | undefined;
  readonly onErrorBoundaryError?:
    | ((
        error: unknown,
        componentStack: string | undefined,
        eventId: string,
      ) => void)
    | undefined;
  readonly onErrorBoundaryMount?: (() => void) | undefined;
  readonly onErrorBoundaryReset?:
    | ((
        error: unknown,
        componentStack: string | null | undefined,
        eventId: string | null,
      ) => void)
    | undefined;
  readonly onErrorBoundaryUnmount?:
    | ((
        error: unknown,
        componentStack: string | null | undefined,
        eventId: string | null,
      ) => void)
    | undefined;
  readonly showErrorBoundaryDialog?: boolean | undefined;
  readonly user?: User | undefined;
}

export default function Sentry({
  beforeErrorBoundaryCapture,
  children,
  errorBoundaryDialogOptions,
  ErrorBoundaryFallback = DefaultErrorBoundaryFallback,
  onErrorBoundaryError,
  onErrorBoundaryMount,
  onErrorBoundaryReset,
  onErrorBoundaryUnmount,
  showErrorBoundaryDialog,
  user,
  ...browserOptions
}: Props): ReactElement {
  useSentry({
    user,
    ...browserOptions,
  });

  return (
    <ErrorBoundary
      beforeCapture={beforeErrorBoundaryCapture}
      dialogOptions={errorBoundaryDialogOptions}
      fallback={ErrorBoundaryFallback}
      onError={onErrorBoundaryError}
      onMount={onErrorBoundaryMount}
      onReset={onErrorBoundaryReset}
      onUnmount={onErrorBoundaryUnmount}
      showDialog={showErrorBoundaryDialog}
    >
      {children}
    </ErrorBoundary>
  );
}
