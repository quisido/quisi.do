import { type ReactElement } from 'react';
import DesignSystem from '../design-system/index.js';
import type Props from './types/props.js';

export default function Div(props: Props): ReactElement {
  return <DesignSystem props={props} type="div" />;
}
