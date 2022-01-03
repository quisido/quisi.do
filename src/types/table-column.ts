import type { ComponentType } from 'react';

export default interface TableColumn<Item> {
  readonly CellContent: ComponentType<Item>;
  readonly header: string;
  readonly maxWidth?: number | undefined;
  readonly minWidth?: number | undefined;
  readonly sort?: ((a: Item, b: Item) => number) | undefined;
  readonly width?: number | undefined;
}
