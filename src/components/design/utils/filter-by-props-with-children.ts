import type { PropsWithChildren } from 'react';

export default function filterByPropsWithChildren<
  P extends Record<string, unknown>,
>(props: P): props is PropsWithChildren<P> {
  return Object.prototype.hasOwnProperty.call(props, 'children');
}
