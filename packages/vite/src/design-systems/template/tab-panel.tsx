import type { ReactElement, ReactNode } from 'react';

export interface TabPanelProps {
  readonly children: ReactNode;
  readonly label: string;
}

export default function TabPanel({
  children,
  label,
}: TabPanelProps): ReactElement {
  return (
    <div aria-label={label} role="tabpanel">
      {children}
    </div>
  );
}
