import type { ReactNode } from 'react';

export interface TreeGroup {
  readonly items: readonly TreeItem[];
  readonly key: number | string;
}

export interface TreeProps {
  readonly items: readonly (TreeGroup | TreeItem)[];
  readonly orientation?: 'vertical' | 'horizontal' | undefined;
  readonly required?: boolean | undefined;
}

export interface TreeItem {
  readonly content: ReactNode;
  readonly key: number | string;
}
