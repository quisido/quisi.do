import type { ReactNode } from 'react';

export default interface Props {
  readonly checked: boolean;
  readonly children: ReactNode;
  readonly onChange: (checked: boolean) => void;
}
