import type { PropsWithChildren, ReactElement } from 'react';
import DesignSystem from '../design-system';

export default function Theme(
  props: Readonly<PropsWithChildren>,
): ReactElement {
  return <DesignSystem props={props} type="theme" />;
}
