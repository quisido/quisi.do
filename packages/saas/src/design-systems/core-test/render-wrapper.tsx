import { type PropsWithChildren, type ReactElement } from 'react';
import { FocusScope } from 'react-aria';

import ErrorBoundary from './error-boundary.js';

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
