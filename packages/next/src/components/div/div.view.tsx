import type { ReactElement } from 'react';
import DesignSystem from '../design-system';
import type Props from './types/props';

export default function Div(props: Readonly<Props>): ReactElement {
  return <DesignSystem props={props} type="div" />;
}
