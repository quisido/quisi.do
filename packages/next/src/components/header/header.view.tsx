import { type ReactElement } from 'react';
import DesignSystem from '../design-system/index.js';
import Fallback from './components/fallback/index.js';
import type Props from './types/props.js';

export default function Header(props: Props): ReactElement {
  return <DesignSystem Fallback={Fallback} props={props} type="header" />;
}
