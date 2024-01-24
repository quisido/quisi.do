import { type PropsWithChildren, type ReactElement } from 'react';
import DesignSystem from '../design-system/index.js';

export default function Theme(
  props: Readonly<PropsWithChildren>,
): ReactElement {
  return <DesignSystem props={props} type="theme" />;
}
