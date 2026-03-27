import type { ReactElement, ReactNode } from 'react';

export interface CommentProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Comment({
  children,
  label,
}: CommentProps): ReactElement {
  return (
    <div aria-label={label} role="comment">
      {children}
    </div>
  );
}
