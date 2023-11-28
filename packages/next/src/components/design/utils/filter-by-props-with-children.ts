import { type PropsWithChildren } from 'react';

export default function filterByPropsWithChildren<P extends object>(
  props: P,
): props is PropsWithChildren<P> {
  return Object.prototype.hasOwnProperty.call(props, 'children');
}
