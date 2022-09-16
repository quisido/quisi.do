import type { ComponentType } from 'react';

export default interface MuiCardProps<Item extends Record<string, unknown>> {
  readonly Content: ComponentType<Item>;
  readonly Footer: ComponentType<Item> | undefined;
  readonly Header: ComponentType<Item> | undefined;
  readonly item: Item;
}
