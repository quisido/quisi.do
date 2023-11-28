import { type ReactNode } from 'react';

export default interface Props {
  readonly children?: ReactNode;
  readonly className?: string | undefined;
  readonly feature: string; // used for tracking events
  readonly href: string;
  readonly label?: string | undefined;
  readonly title: string;
}
