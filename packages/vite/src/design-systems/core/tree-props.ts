import type { ReactNode } from 'react';

export type TreeItemKey = number | string;

export interface TreeGroup {
  readonly checked?: boolean | undefined;
  readonly content: ReactNode;
  readonly expanded?: boolean | undefined;
  readonly items: readonly TreeItem[];
  readonly key: TreeItemKey;
  readonly label?: string | undefined;
  readonly selected?: boolean | undefined;
}

export interface TreeProps {
  readonly items: readonly (TreeGroup | TreeItem)[];
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
  readonly multiselectable?: boolean | undefined;
  readonly onSelect?: ((key: TreeItemKey) => void) | undefined;
  readonly onToggle?: ((key: TreeItemKey) => void) | undefined;
  readonly orientation?: 'vertical' | 'horizontal' | undefined;
  readonly required?: boolean | undefined;
}

export interface TreeItem {
  readonly checked?: boolean | undefined;
  readonly content: ReactNode;
  readonly key: TreeItemKey;
  readonly label?: string | undefined;
  readonly selected?: boolean | undefined;
}
