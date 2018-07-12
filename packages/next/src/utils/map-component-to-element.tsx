import { type ComponentType, type ReactElement } from 'react';

export default function mapComponentToElement(
  Component: ComponentType<unknown>,
): ReactElement {
  return <Component />;
}
