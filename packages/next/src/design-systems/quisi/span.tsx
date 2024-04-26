import type { ReactElement } from 'react';
import type { Props as SpanProps } from '../../components/span';

export default function QuisiSpan({
  children,
  className,
}: SpanProps): ReactElement {
  return (
    <span className={className}>
      {children}
    </span>
  );
}
