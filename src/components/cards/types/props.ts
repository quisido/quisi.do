import type { ComponentType, ReactNode } from 'react';

export default interface Props<Item> {
  readonly CardContent: ComponentType<Item>;
  readonly CardFooter?: ComponentType<Item> | undefined;
  readonly CardHeader?: ComponentType<Item> | undefined;
  readonly header?: ReactNode;
  readonly items: readonly Item[];
  readonly loading?: string | undefined;
}
