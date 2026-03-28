import type { ReactElement, ReactNode } from 'react';

export interface DialogProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   A `Dialog` component is a descendant window of a web application's primary
 * window. It is commonly used to prompt the user for information or present
 * content related to the main application, either modally or modelessly.
 */
export default function Dialog({ children, label }: DialogProps): ReactElement {
  return (
    <dialog aria-label={label} open>
      {children}
    </dialog>
  );
}
