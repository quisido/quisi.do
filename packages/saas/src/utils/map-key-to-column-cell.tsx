import { type FunctionComponent, type ReactElement } from 'react';

export default function mapKeyToColumnCell<T>(
  key: keyof T,
): FunctionComponent<T> {
  return function CellContent({ [key]: value }: Readonly<T>): ReactElement {
    return <>{value}</>;
  };
}
