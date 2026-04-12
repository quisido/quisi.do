import type { ReactNode } from 'react';

export interface NoteProps {
  readonly children: ReactNode;
  readonly id?: string | undefined;
}
