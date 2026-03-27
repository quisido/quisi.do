import type { ReactElement, ReactNode } from 'react';

export interface OptionProps {
  readonly children: ReactNode;
}

export default function Option({ children }: OptionProps): ReactElement {
  return <option>{children}</option>;
}
