import type { ReactElement } from 'react';
import type { Props as SpanProps } from '../../components/span';

export default function QuisiSpan({
  children,
  className,
}: SpanProps): ReactElement {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        lineHeight: '1em',
        paddingBottom: '1px',
        paddingTop: 'calc(1rem - 1em - 1px)',
      }}
    >
      {children}
    </span>
  );
}
