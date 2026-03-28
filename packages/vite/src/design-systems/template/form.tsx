import type { ReactElement, ReactNode } from 'react';

export interface FormProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Form` component is a landmark region containing items and objects that,
 * as a whole, combine to create a form. When the purpose is specifically to
 * submit search criteria, prefer `Search` instead.
 */
export default function Form({ children, label }: FormProps): ReactElement {
  return <form aria-label={label}>{children}</form>;
}
