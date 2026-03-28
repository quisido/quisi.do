import type { ReactElement, ReactNode } from 'react';

export interface OptionProps {
  readonly children: ReactNode;
}

/**
 *   An `Option` component represents an item in a `ListBox`. It should be an
 * accessibility child of a `ListBox` or of a `Group` inside a `ListBox`.
 */
export default function Option({ children }: OptionProps): ReactElement {
  return <option>{children}</option>;
}
