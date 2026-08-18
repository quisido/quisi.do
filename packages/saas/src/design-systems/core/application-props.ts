import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';

export type ApplicationProps = OneOf<OneOfProps> & Props;

interface OneOfProps {
  readonly label: string;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
  readonly roleDescription?: string | undefined;
}
