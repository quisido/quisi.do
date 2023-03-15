import type { FunctionComponent, ReactElement } from 'react';

export default function mapKeyToColumnCell<T>(
  key: keyof T,
): FunctionComponent<T> {
  return function CellContent(props: Readonly<T>): ReactElement {
    return <>{props[key]}</>;
  };
}
