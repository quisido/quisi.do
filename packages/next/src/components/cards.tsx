import { type ComponentType, type ReactElement, type ReactNode } from 'react';
import DesignSystem from './design-system/index.js';

export interface Props<Item extends object> {
  readonly CardContent: ComponentType<Item>;
  readonly CardFooter?: ComponentType<Item> | undefined;
  readonly CardHeader?: ComponentType<Item> | undefined;
  readonly cardKey: keyof Item;
  readonly header?: ReactNode;
  readonly items: readonly Item[];
  readonly loading?: string | undefined;
}

export default function Cards<Item extends object>(
  props: Readonly<Props<Item>>,
): ReactElement {
  return <DesignSystem props={props} type="cards" />;
}
