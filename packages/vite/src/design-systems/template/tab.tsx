import type { ReactElement, ReactNode } from 'react';

export interface TabProps {
  readonly children: ReactNode;
  readonly selected?: boolean | undefined;
}

export default function Tab({
  children,
  selected = false,
}: TabProps): ReactElement {
  return (
    <button aria-selected={selected} role="tab" type="button">
      {children}
    </button>
  );
}
