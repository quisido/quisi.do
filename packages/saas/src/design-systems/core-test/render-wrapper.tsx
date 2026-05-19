import ErrorBoundary from './error-boundary.js';
import { FocusScope } from 'react-aria';
import { type PropsWithChildren, type ReactElement } from 'react';

export default function RenderWrapper({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <ErrorBoundary>
      <FocusScope autoFocus contain>
        {children}
      </FocusScope>
    </ErrorBoundary>
  );
}
