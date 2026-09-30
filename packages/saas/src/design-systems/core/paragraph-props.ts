import { type ReactNode } from 'react';

export interface ParagraphProps {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly id?: string | undefined;
}
