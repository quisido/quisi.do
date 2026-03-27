import type { ReactElement, ReactNode } from 'react';

export interface FormProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function Form({ children, label }: FormProps): ReactElement {
  return <form aria-label={label}>{children}</form>;
}
