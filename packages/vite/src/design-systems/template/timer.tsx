import type { ReactElement, ReactNode } from 'react';

export interface TimerProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Timer({ children, label }: TimerProps): ReactElement {
  return (
    <div aria-label={label} role="timer">
      {children}
    </div>
  );
}
