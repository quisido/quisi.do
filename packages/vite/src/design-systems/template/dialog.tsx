import type { ReactElement, ReactNode } from 'react';

export interface DialogProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Dialog({ children, label }: DialogProps): ReactElement {
  return (
    <dialog aria-label={label} open>
      {children}
    </dialog>
  );
}
